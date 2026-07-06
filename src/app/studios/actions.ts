"use server";

import {
  configTotal,
  describeConfig,
  formatAud,
  optionGroups,
  resolveConfig,
  type StudioConfig,
} from "@/components/studios/studio-data";
import { sites } from "@/lib/site-config";

export type OrderResult = { ok: boolean };

/**
 * Order request for a configured studio. Until ANZ Worldline is set up,
 * "Order now" collects contact details and emails the full build + a
 * server-recomputed price to Sales@; no card is taken here. Swapped for
 * Worldline hosted payment once credentials arrive.
 */
export async function sendStudioOrder(formData: FormData): Promise<OrderResult> {
  if (formData.get("website")) return { ok: true };

  const field = (name: string) => String(formData.get(name) ?? "").trim();
  const name = field("name");
  const email = field("email");
  const phone = field("phone");
  const postcode = field("postcode");
  const message = field("message");

  if (!name || !email) return { ok: false };

  // Rebuild the config from option ids the client sent; reprice server-side.
  const config = Object.fromEntries(
    optionGroups.map((group) => [group.id, field(`opt-${group.id}`)]),
  ) as StudioConfig;

  const resolved = resolveConfig(config);
  if (!resolved) return { ok: false };

  const total = configTotal(config);

  const text = [
    `New studio order request`,
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "Not provided"}`,
    `Postcode: ${postcode || "Not provided"}`,
    "",
    `Build: ${describeConfig(config)}`,
    "",
    `Total (options + base, delivery separate): ${formatAud(total)}`,
    "",
    message ? `Message: ${message}` : "",
    "",
    `Sent from ${sites.studios.domain}`,
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "caleb@c4studios.com.au";

  if (!apiKey) {
    console.warn(`[studio-order] RESEND_API_KEY not set, logged only.\n${text}`);
    return { ok: true };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Spare Space Studios <${fromEmail}>`,
        to: [sites.studios.email],
        reply_to: email,
        subject: `Studio order request, ${formatAud(total)} (${name})`,
        text,
      }),
    });
    if (!response.ok) {
      console.error(
        `[studio-order] Resend responded ${response.status}: ${await response.text()}`,
      );
    }
  } catch (error) {
    console.error("[studio-order] Failed to reach Resend:", error);
  }

  return { ok: true };
}
