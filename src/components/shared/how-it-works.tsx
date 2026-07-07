import { Reveal } from "./reveal";

export type ProcessStep = {
  title: string;
  body: string;
  icon: "choose" | "customise" | "delivery" | "install" | "movein";
};

type Props = {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  steps: ProcessStep[];
};

export function HowItWorks({
  id = "how-it-works",
  eyebrow = "How it works",
  title,
  intro,
  steps,
}: Props) {
  return (
    <section id={id} className="bg-cream" aria-labelledby={`${id}-heading`}>
      <div className="mx-auto w-full max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Reveal className="max-w-[680px]">
          <p className="font-heading text-[13px] tracking-[0.22em] text-accent-strong uppercase">
            {eyebrow}
          </p>
          <h2
            id={`${id}-heading`}
            className="mt-3 font-heading text-[34px] leading-[1.08] tracking-tight sm:text-[44px]"
          >
            {title}
          </h2>
          {intro ? (
            <p className="mt-4 text-[16px] leading-7 text-mid">{intro}</p>
          ) : null}
        </Reveal>

        <div className="relative mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div
            aria-hidden="true"
            className="absolute top-8 right-[12%] left-[12%] hidden border-t-2 border-dashed border-line lg:block"
          />
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              <div className="icon-chip relative inline-grid size-16 place-items-center rounded-full text-accent-strong">
                <StepIcon icon={step.icon} />
                <span className="absolute -top-1 -right-1 grid size-6 place-items-center rounded-full bg-dark font-heading text-[12px] text-cream">
                  {index + 1}
                </span>
              </div>
              <h3 className="mt-5 font-heading text-[21px] leading-snug tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2 max-w-[300px] text-[15px] leading-7 text-mid">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepIcon({ icon }: { icon: ProcessStep["icon"] }) {
  switch (icon) {
    case "choose":
      return (
        <Svg>
          <rect x="4" y="6" width="10" height="8" rx="2" />
          <rect x="16" y="6" width="8" height="8" rx="2" />
          <rect x="4" y="16" width="8" height="6" rx="2" />
          <path d="M16 19h8" strokeLinecap="round" />
        </Svg>
      );
    case "customise":
      return (
        <Svg>
          <path d="M5 9h18M5 14h18M5 19h18" strokeLinecap="round" />
          <circle cx="11" cy="9" r="2.4" fill="var(--accent-soft)" />
          <circle cx="19" cy="14" r="2.4" fill="var(--accent-soft)" />
          <circle cx="9" cy="19" r="2.4" fill="var(--accent-soft)" />
        </Svg>
      );
    case "delivery":
      return (
        <Svg>
          <path d="M4 18V9h12v9" strokeLinejoin="round" />
          <path d="M16 12h5l3 3v3h-3" strokeLinejoin="round" />
          <circle cx="9" cy="20" r="2" />
          <circle cx="20" cy="20" r="2" />
        </Svg>
      );
    case "install":
      return (
        <Svg>
          <path d="M14 4 5 11v11h18V11l-9-7Z" strokeLinejoin="round" />
          <path d="m10 15 3 3 5.5-5.5" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      );
    case "movein":
      return (
        <Svg>
          <path d="M14 5 6 11.5V22h16V11.5L14 5Z" strokeLinejoin="round" />
          <path d="M12 22v-6h4v6" strokeLinejoin="round" />
          <path d="M20 8.5V5h2v5" strokeLinejoin="round" />
        </Svg>
      );
  }
}

function Svg({ children }: { children: React.ReactNode }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}
