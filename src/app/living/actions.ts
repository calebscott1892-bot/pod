"use server";

import { sites } from "@/lib/site-config";

export type EnquiryResult = { ok: boolean };

/**
 * Sends a Spare Space Living fit-out enquiry via Resend. Without
 * RESEND_API_KEY the enquiry is logged server-side so the demo works
 * end to end.
 */
export async function sendLivingEnquiry(
  formData: FormData,
): Promise<EnquiryResult> {
  if (formData.get("website")) return { ok: true };

  const field = (name: string) => String(formData.get(name) ?? "").trim();
  const name = field("name");
  const email = field("email");
  const phone = field("phone");
  const postcode = field("postcode");
  const supply = field("supply-type");
  const interest = field("interest");
  const message = field("message");

  if (!name || !email) return { ok: false };

  const subject = `Living fit-out enquiry, ${interest || "General"} (${name})`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "Not provided"}`,
    `Postcode: ${postcode || "Not provided"}`,
    `Service: ${supply || "Not specified"}`,
    `Interested in: ${interest || "Not specified"}`,
    "",
    "Message:",
    message || "(No message)",
    "",
    `Sent from ${sites.living.domain}`,
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "caleb@c4studios.com.au";

  if (!apiKey) {
    console.warn(
      `[living-enquiry] RESEND_API_KEY not set, logged only.\n${text}`,
    );
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
        from: `Spare Space Living <${fromEmail}>`,
        to: [sites.living.email],
        reply_to: email,
        subject,
        text,
      }),
    });
    if (!response.ok) {
      console.error(
        `[living-enquiry] Resend responded ${response.status}: ${await response.text()}`,
      );
    }
  } catch (error) {
    console.error("[living-enquiry] Failed to reach Resend:", error);
  }

  return { ok: true };
}
