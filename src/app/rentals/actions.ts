"use server";

import { sites } from "@/lib/site-config";

export type EnquiryResult = { ok: boolean };

/**
 * Sends a rentals enquiry to the Spare Space inbox via Resend.
 * Without RESEND_API_KEY the enquiry is logged server-side so local
 * development and the client demo keep working end to end.
 */
export async function sendEnquiry(formData: FormData): Promise<EnquiryResult> {
  // Honeypot — bots fill every field; humans never see this one.
  if (formData.get("website")) {
    return { ok: true };
  }

  const field = (name: string) => String(formData.get(name) ?? "").trim();

  const name = field("name");
  const email = field("email");
  const phone = field("phone");
  const postcode = field("postcode");
  const intendedUse = field("intended-use");
  const heardAbout = field("heard-about");
  const message = field("message");

  if (!name || !email || !postcode || !intendedUse) {
    return { ok: false };
  }

  const subject = `New enquiry — ${intendedUse} · ${postcode} (${name})`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "Not provided"}`,
    `Postcode: ${postcode}`,
    `Intended use: ${intendedUse}`,
    `How they heard about us: ${heardAbout || "Not provided"}`,
    "",
    "Message:",
    message || "(No message)",
    "",
    `Sent from ${sites.rentals.domain}`,
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "caleb@c4studios.com.au";

  if (!apiKey) {
    console.warn(
      `[enquiry] RESEND_API_KEY not set — enquiry logged only.\n${text}`,
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
        from: `Spare Space Rentals <${fromEmail}>`,
        to: [sites.rentals.email],
        reply_to: email,
        subject,
        text,
      }),
    });

    if (!response.ok) {
      console.error(
        `[enquiry] Resend responded ${response.status}: ${await response.text()}`,
      );
    }
  } catch (error) {
    console.error("[enquiry] Failed to reach Resend:", error);
  }

  // The form shows success optimistically; delivery issues surface in logs.
  return { ok: true };
}
