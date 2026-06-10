import {
  configTotal,
  resolveConfig,
  type StudioConfig,
} from "@/components/studios/studio-data";

/**
 * Creates a Stripe Checkout Session for a configured studio.
 *
 * The total is always recomputed server-side from the catalogue — the client
 * only ever sends option ids. While STRIPE_SECRET_KEY is absent (Phase 1)
 * the route responds with { configured: false } and the UI shows a
 * call-to-order notice instead; once Paul's keys land in .env.local the
 * full hosted-checkout flow is live with no code changes.
 */
export async function POST(request: Request) {
  let config: StudioConfig;
  try {
    config = (await request.json()) as StudioConfig;
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const resolved = resolveConfig(config);
  if (!resolved) {
    return Response.json({ error: "Unknown studio option" }, { status: 400 });
  }

  const totalAud = configTotal(config);
  const name = resolved.style.name;
  const description = `Windows: ${resolved.windows.name} | Doors: ${resolved.doors.name} | Cladding: ${resolved.cladding.name}`;

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return Response.json({ configured: false, name, description, totalAud });
  }

  const origin =
    process.env.NEXT_PUBLIC_APP_URL ?? new URL(request.url).origin;

  const params = new URLSearchParams({
    mode: "payment",
    "line_items[0][quantity]": "1",
    "line_items[0][price_data][currency]": "aud",
    "line_items[0][price_data][unit_amount]": String(totalAud * 100),
    "line_items[0][price_data][product_data][name]": name,
    "line_items[0][price_data][product_data][description]": description,
    success_url: `${origin}/studios/order/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/studios#configurator`,
    "metadata[style]": resolved.style.name,
    "metadata[windows]": resolved.windows.name,
    "metadata[doors]": resolved.doors.name,
    "metadata[cladding]": resolved.cladding.name,
  });

  const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  if (!response.ok) {
    console.error(
      `[checkout] Stripe responded ${response.status}: ${await response.text()}`,
    );
    return Response.json(
      { configured: true, error: "Unable to start checkout" },
      { status: 502 },
    );
  }

  const session = (await response.json()) as { url: string };
  return Response.json({ configured: true, url: session.url });
}
