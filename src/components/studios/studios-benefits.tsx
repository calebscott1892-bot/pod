import { Reveal } from "@/components/shared/reveal";

const benefits: { title: string; body: string; icon: keyof typeof icons }[] = [
  {
    title: "An investment that holds value",
    body: "A studio that retains its value and can be resold if your needs change.",
    icon: "value",
  },
  {
    title: "Moves with you",
    body: "Studio spaces that move with you and adapt to your changing life.",
    icon: "move",
  },
  {
    title: "Prebuilt, no flatpacks",
    body: "Delivered already constructed, no stressful flatpacks or expensive contractor fees.",
    icon: "prebuilt",
  },
  {
    title: "9 wheels & braking",
    body: "Nine commercial castor wheels with a braking system make every studio easy to manoeuvre and secure into place.",
    icon: "wheels",
  },
  {
    title: "Adds value to your property",
    body: "Portable lifestyle spaces that add flexibility, function and value to your property.",
    icon: "property",
  },
];

export function StudiosBenefits() {
  return (
    <section id="why" className="bg-cream" aria-labelledby="why-heading">
      <div className="mx-auto w-full max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Reveal className="max-w-[720px]">
          <p className="font-heading text-[13px] tracking-[0.22em] text-accent-strong uppercase">
            Mobility with control
          </p>
          <h2
            id="why-heading"
            className="mt-3 font-heading text-[34px] leading-[1.08] tracking-tight sm:text-[44px]"
          >
            Not a fixed structure, a lifestyle asset.
          </h2>
          <p className="mt-4 text-[16px] leading-7 text-mid">
            Each studio features castor wheels enabling 360-degree swivel, easy
            relocation and braking. Prebuilt, portable and yours to move.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-x-7 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <article key={benefit.title} className="flex gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-accent-soft text-accent-strong">
                  <BenefitIcon icon={benefit.icon} />
                </span>
                <div>
                  <h3 className="font-heading text-[19px] tracking-tight">
                    {benefit.title}
                  </h3>
                  <p className="mt-1 text-[14px] leading-6 text-mid">
                    {benefit.body}
                  </p>
                </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitIcon({ icon }: { icon: keyof typeof icons }) {
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

const icons = {
  value: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5v9M9.5 9.5c0-1.1 1.1-1.8 2.5-1.8s2.5.7 2.5 1.8-1.1 1.6-2.5 1.9-2.5.8-2.5 1.9 1.1 1.8 2.5 1.8 2.5-.7 2.5-1.8" />
    </>
  ),
  move: (
    <>
      <path d="M12 3v18M3 12h18" />
      <path d="M8 7l-4 5 4 5M16 7l4 5-4 5M7 8l5-4 5 4M7 16l5 4 5-4" />
    </>
  ),
  prebuilt: (
    <>
      <path d="M4 20V9l8-5 8 5v11" />
      <path d="M4 20h16" />
      <path d="m8.5 13 2.5 2.5 4.5-4.5" />
    </>
  ),
  wheels: (
    <>
      <rect x="4" y="6" width="16" height="8" rx="2" />
      <circle cx="8" cy="18" r="2.4" />
      <circle cx="16" cy="18" r="2.4" />
      <path d="M8 15.6V14M16 15.6V14" />
    </>
  ),
  property: (
    <>
      <path d="M3 11 12 4l9 7" />
      <path d="M5 10v10h14V10" />
      <path d="M10 20v-6h4v6" />
    </>
  ),
};
