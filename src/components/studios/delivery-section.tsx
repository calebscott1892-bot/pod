import Image from "next/image";

import { Reveal } from "@/components/shared/reveal";

const deliveryPoints: { title: string; body: string; icon: keyof typeof icons }[] = [
  {
    title: "Delivered within weeks",
    body: "Your custom studio is built and delivered to your door within weeks of your order — and we keep you posted along the way.",
    icon: "calendar",
  },
  {
    title: "In-house delivery team",
    body: "Our own crew serves Southeast QLD — Sunshine Coast, Brisbane, Ipswich, Logan, Gold Coast, Tweed, the Northern Rivers and Northern NSW.",
    icon: "truck",
  },
  {
    title: "Nation-wide delivery",
    body: "Further afield, we deliver nation-wide with the most reliable trucking company, so your studio arrives safe and sound.",
    icon: "truck",
  },
  {
    title: "Google Earth site assessment",
    body: "Before delivery we assess your property remotely, so there are no surprises on the day.",
    icon: "satellite",
  },
  {
    title: "Crane where access requires",
    body: "Tight space or limited access? We liaise with you on the best options, which may include cranage.",
    icon: "crane",
  },
  {
    title: "Coming soon — Sydney & Melbourne",
    body: "We're expanding. Sydney and Melbourne delivery is on its way.",
    icon: "pin",
  },
];

export function DeliverySection() {
  return (
    <section
      id="delivery"
      className="bg-cream-soft"
      aria-labelledby="delivery-heading"
    >
      <div className="mx-auto grid w-full max-w-[1280px] gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-16 lg:px-8 lg:py-24">
        <Reveal>
          <p className="font-heading text-[13px] tracking-[0.22em] text-accent-strong uppercase">
            Delivery &amp; logistics
          </p>
          <h2
            id="delivery-heading"
            className="mt-3 max-w-[520px] font-heading text-[34px] leading-[1.08] tracking-tight sm:text-[44px]"
          >
            Big purchase. Clear plan.
          </h2>
          <p className="mt-4 max-w-[540px] text-[16px] leading-8 text-mid">
            A studio is a serious investment, so we keep the logistics simple
            and honest — here&apos;s exactly how your studio gets from our
            workshop to your backyard.
          </p>

          <ul className="mt-8 space-y-5">
            {deliveryPoints.map((point) => (
              <li key={point.title} className="flex gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-accent-soft text-accent-strong">
                  <DeliveryIcon icon={point.icon} />
                </span>
                <div>
                  <h3 className="font-heading text-[18px] tracking-tight">
                    {point.title}
                  </h3>
                  <p className="mt-1 max-w-[460px] text-[14px] leading-6 text-mid">
                    {point.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative">
            <div className="shape-arch relative aspect-[4/4.6] overflow-hidden border border-line shadow-[0_40px_90px_-60px_rgba(44,40,37,0.6)]">
              <Image
                src="/assets/images/studios-real.jpg"
                alt="Two finished Spare Space studios installed side by side in a landscaped backyard"
                fill
                sizes="(min-width: 1024px) 520px, 100vw"
                className="object-cover"
              />
            </div>
            <p className="shape-soft absolute -bottom-5 left-1/2 w-max max-w-[90%] -translate-x-1/2 border border-line bg-white px-6 py-3 text-center font-heading text-[13px] tracking-[0.1em] text-dark uppercase shadow-[0_20px_50px_-30px_rgba(44,40,37,0.5)]">
              Delivered &amp; installed by our team
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const icons = {
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
      <path d="m9 14.5 2 2 4-4.5" />
    </>
  ),
  truck: (
    <>
      <path d="M3 16V7h11v9" />
      <path d="M14 10h4l3 3v3h-2.5" />
      <circle cx="7.5" cy="17.5" r="1.8" />
      <circle cx="17" cy="17.5" r="1.8" />
      <path d="M9.5 17.5h5" />
    </>
  ),
  satellite: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      <path d="M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2" />
    </>
  ),
  crane: (
    <>
      <path d="M5 21V8l13-4v4" />
      <path d="M5 8h13" />
      <path d="M15 8v5" />
      <path d="M13.5 15.5a1.5 1.5 0 1 0 3 0V13" />
      <path d="M3 21h7" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
};

function DeliveryIcon({ icon }: { icon: keyof typeof icons }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[icon]}
    </svg>
  );
}
