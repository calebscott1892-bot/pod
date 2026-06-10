import { Reveal } from "@/components/shared/reveal";

export function ServiceArea() {
  return (
    <section
      id="service-area"
      className="bg-cream"
      aria-labelledby="service-area-heading"
    >
      <div className="mx-auto grid w-full max-w-[1280px] items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:gap-16 lg:px-8 lg:py-24">
        <Reveal>
          <p className="font-heading text-[13px] tracking-[0.22em] text-accent-strong uppercase">
            Service area
          </p>
          <h2
            id="service-area-heading"
            className="mt-3 max-w-[560px] font-heading text-[34px] leading-[1.08] tracking-tight sm:text-[44px]"
          >
            Northern Rivers to the Sunshine Coast.
          </h2>
          <p className="mt-4 max-w-[540px] text-[16px] leading-8 text-mid">
            We deliver and install along the east coast corridor. Before we
            arrive, we assess your property with Google Earth — so we know
            whether it&apos;s a straightforward placement or a crane lift.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="shape-soft border border-line bg-cream-soft p-6">
              <p className="font-heading text-[13px] tracking-[0.18em] text-accent-strong uppercase">
                Southeast QLD
              </p>
              <p className="mt-2 font-heading text-[20px] tracking-tight">
                Sunshine Coast to Gold Coast
              </p>
              <p className="mt-2 text-[14px] leading-6 text-mid">
                Including Brisbane and surrounds.
              </p>
            </div>
            <div className="shape-soft border border-line bg-cream-soft p-6">
              <p className="font-heading text-[13px] tracking-[0.18em] text-accent-strong uppercase">
                Northern NSW
              </p>
              <p className="mt-2 font-heading text-[20px] tracking-tight">
                Northern Rivers region
              </p>
              <p className="mt-2 text-[14px] leading-6 text-mid">
                Byron Bay, Ballina, Lismore and surrounds.
              </p>
            </div>
          </div>

          <p className="mt-6 text-[15px] leading-7 text-mid">
            Just outside these areas?{" "}
            <a
              href="#enquire"
              className="text-dark underline decoration-line underline-offset-4 transition hover:text-accent-strong"
            >
              Ask us anyway
            </a>
            {" "}— we review every site individually.
          </p>
        </Reveal>

        <Reveal delay={120} className="mx-auto w-full max-w-[440px]">
          <CoverageMap />
        </Reveal>
      </div>
    </section>
  );
}

/** Stylised east-coast illustration — not to scale, purely indicative. */
function CoverageMap() {
  return (
    <svg
      viewBox="0 0 440 560"
      role="img"
      aria-label="Stylised map showing coverage from the Sunshine Coast in Queensland down to the Northern Rivers in New South Wales"
      className="h-auto w-full"
    >
      <rect width="440" height="560" rx="40" fill="var(--accent-soft)" />

      {/* Land mass */}
      <path
        d="M0 40C0 17.9 17.9 0 40 0h250c-14 38 16 62 6 102 26 50-10 96 12 148-18 56 14 96-10 148 16 44-18 76-4 122H40c-22.1 0-40-17.9-40-40V40Z"
        fill="var(--ss-cream-soft)"
        stroke="var(--ss-line)"
        strokeWidth="2"
      />

      {/* Coastal corridor highlight */}
      <path
        d="M288 96c4 44-16 78 4 126-14 52 12 92-6 142-6 18-2 36 2 50"
        fill="none"
        stroke="var(--accent)"
        strokeOpacity="0.32"
        strokeWidth="58"
        strokeLinecap="round"
      />

      {/* QLD / NSW border */}
      <path
        d="M12 348h292"
        stroke="var(--ss-mid)"
        strokeWidth="1.6"
        strokeDasharray="7 7"
        strokeOpacity="0.55"
      />
      <text x="24" y="334" fontSize="15" fill="var(--ss-mid)" fontFamily="var(--font-arcon)" letterSpacing="2">
        QLD
      </text>
      <text x="24" y="376" fontSize="15" fill="var(--ss-mid)" fontFamily="var(--font-arcon)" letterSpacing="2">
        NSW
      </text>

      {/* Route through the corridor */}
      <path
        d="M284 122c-10 36 8 60-2 96-8 32 10 56 0 92-6 26 8 44 0 72-4 16-6 28-8 40"
        fill="none"
        stroke="var(--accent-strong)"
        strokeWidth="2"
        strokeDasharray="2 8"
        strokeLinecap="round"
      />

      <CityDot x={284} y={122} label="Sunshine Coast" />
      <CityDot x={266} y={222} label="Brisbane" />
      <CityDot x={282} y={312} label="Gold Coast" />
      <CityDot x={282} y={416} label="Byron Bay" />
      <CityDot x={222} y={462} label="Lismore" labelSide="left" />

      {/* Ocean waves */}
      <g stroke="var(--accent-strong)" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" fill="none">
        <path d="M376 150c8-6 16-6 24 0" />
        <path d="M386 230c8-6 16-6 24 0" />
        <path d="M372 330c8-6 16-6 24 0" />
        <path d="M384 430c8-6 16-6 24 0" />
      </g>
    </svg>
  );
}

function CityDot({
  x,
  y,
  label,
  labelSide = "right",
}: {
  x: number;
  y: number;
  label: string;
  labelSide?: "left" | "right";
}) {
  const anchor = labelSide === "right" ? "start" : "end";
  const textX = labelSide === "right" ? x + 16 : x - 16;

  return (
    <g>
      <circle cx={x} cy={y} r="10" fill="var(--accent)" fillOpacity="0.35" />
      <circle cx={x} cy={y} r="5" fill="var(--accent-strong)" />
      <text
        x={textX}
        y={y + 5}
        fontSize="15"
        textAnchor={anchor}
        fill="var(--ss-dark)"
        fontFamily="var(--font-arcon)"
      >
        {label}
      </text>
    </g>
  );
}
