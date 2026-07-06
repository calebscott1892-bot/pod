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
            arrive, we assess your property with Google Earth, so we know
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
            . We review every site individually.
          </p>
        </Reveal>

        <Reveal delay={120} className="mx-auto w-full max-w-[440px]">
          <CoverageMap />
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────────────────────────────
   Coverage map, the southeast-QLD / northern-NSW coast drawn from real
   coastal waypoints (lon/lat) projected into the viewBox and smoothed with
   Catmull-Rom splines, the same approach used for the full-Australia map.
   East–west is exaggerated ~2.4× so the features of a narrow coastal strip
   read at this size: Moreton Bay behind its sand islands, the Gold Coast,
   and Cape Byron jutting east as the mainland's easternmost point.
─────────────────────────────────────────────────────────────────────────── */

type Pt = [number, number];

// Projection: lon east, lat as positive degrees south.
const project = ([lon, lat]: Pt): Pt => [
  Number(((lon - 152.5) * 285).toFixed(1)),
  Number(((lat - 26.0) * 135 + 40).toFixed(1)),
];

// Catmull-Rom through points → smooth cubic-bezier path (open).
function spline(points: Pt[]): string {
  if (points.length < 2) return "";
  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? points[i + 1];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2[0]} ${p2[1]}`;
  }
  return d;
}

// Mainland ocean/bay shore, north → south (lon, °south).
const MAINLAND: Pt[] = [
  [153.19, 26.05], // north of Noosa (off top)
  [153.1, 26.39], // Noosa
  [153.09, 26.66], // Maroochydore, Sunshine Coast
  [153.14, 26.8], // Caloundra
  [153.05, 27.07], // into Moreton Bay (Pumicestone)
  [153.1, 27.23], // Redcliffe
  [153.18, 27.4], // Brisbane river mouth / Wynnum
  [153.26, 27.58], // Redland Bay
  [153.31, 27.78], // southern bay
  [153.42, 27.96], // Southport, back to the ocean
  [153.43, 28.03], // Surfers Paradise
  [153.45, 28.1], // Burleigh
  [153.55, 28.17], // Coolangatta / Tweed Heads
  [153.57, 28.34], // Pottsville
  [153.59, 28.45], // Cabarita
  [153.64, 28.64], // Cape Byron, easternmost point
  [153.58, 28.87], // Ballina
  [153.45, 29.07], // Evans Head
  [153.4, 29.27], // Iluka
  [153.37, 29.43], // Yamba (off bottom)
];

// Sand islands enclosing Moreton Bay.
const MORETON: Pt[] = [
  [153.4, 27.02],
  [153.46, 27.1],
  [153.46, 27.26],
  [153.42, 27.34],
  [153.385, 27.24],
  [153.38, 27.08],
];
const STRADBROKE: Pt[] = [
  [153.42, 27.43],
  [153.52, 27.52],
  [153.53, 27.63],
  [153.46, 27.74],
  [153.41, 27.62],
  [153.4, 27.49],
];

const CITIES: { name: string; at: Pt; dx: number; anchor: "start" | "end" }[] = [
  { name: "Sunshine Coast", at: [153.09, 26.66], dx: -10, anchor: "end" },
  { name: "Brisbane", at: [153.02, 27.47], dx: -10, anchor: "end" },
  { name: "Gold Coast", at: [153.42, 28.0], dx: 12, anchor: "start" },
  { name: "Byron Bay", at: [153.64, 28.64], dx: -12, anchor: "end" },
  { name: "Lismore", at: [153.28, 28.81], dx: -10, anchor: "end" },
];

function CoverageMap() {
  const mainland = MAINLAND.map(project);
  const coast = spline(mainland);
  const land = `${coast} L 0 520 L 0 30 Z`;
  const moreton = `${spline(MORETON.map(project))} Z`;
  const stradbroke = `${spline(STRADBROKE.map(project))} Z`;
  const corridor = spline(mainland.slice(1, 17)); // Noosa → Ballina (served)
  const borderY = (28.16 - 26.0) * 135 + 40;

  return (
    <svg
      viewBox="0 0 372 560"
      role="img"
      aria-label="Map of the service area along the coast from the Sunshine Coast in Queensland, past Brisbane, the Gold Coast and Byron Bay, down to the Northern Rivers in New South Wales"
      className="h-auto w-full"
    >
      {/* Ocean */}
      <rect width="372" height="560" rx="26" fill="var(--accent-soft)" />
      <g stroke="var(--accent-strong)" strokeOpacity="0.22" strokeWidth="2" strokeLinecap="round" fill="none">
        <path d="M338 150c8-6 16-6 24 0" />
        <path d="M340 250c8-6 16-6 24 0" />
        <path d="M336 360c8-6 16-6 24 0" />
      </g>
      <text
        x="350"
        y="300"
        fontSize="13"
        fill="var(--accent-strong)"
        fillOpacity="0.45"
        fontFamily="var(--font-arcon)"
        letterSpacing="3"
        textAnchor="middle"
        transform="rotate(90 350 300)"
      >
        PACIFIC OCEAN
      </text>

      {/* Land */}
      <path d={land} fill="var(--ss-cream-soft)" />
      <path d={moreton} fill="var(--ss-cream-soft)" stroke="var(--ss-olive)" strokeWidth="1.5" strokeOpacity="0.5" />
      <path d={stradbroke} fill="var(--ss-cream-soft)" stroke="var(--ss-olive)" strokeWidth="1.5" strokeOpacity="0.5" />

      {/* Served corridor highlight + the coastline */}
      <path d={corridor} fill="none" stroke="var(--accent-strong)" strokeOpacity="0.18" strokeWidth="22" strokeLinecap="round" />
      <path d={coast} fill="none" stroke="var(--ss-olive)" strokeWidth="2.5" strokeOpacity="0.85" strokeLinejoin="round" />

      {/* QLD / NSW border */}
      <path d={`M0 ${borderY.toFixed(1)} L 300 ${borderY.toFixed(1)}`} stroke="var(--ss-mid)" strokeWidth="1.4" strokeDasharray="6 7" strokeOpacity="0.55" />
      <text x="20" y={borderY - 12} fontSize="14" fill="var(--ss-mid)" fontFamily="var(--font-arcon)" letterSpacing="2">
        QLD
      </text>
      <text x="20" y={borderY + 26} fontSize="14" fill="var(--ss-mid)" fontFamily="var(--font-arcon)" letterSpacing="2">
        NSW
      </text>

      {/* Compass */}
      <g transform="translate(346 34)">
        <path d="M0 12 L0 -12 M0 -12 L-4 -5 M0 -12 L4 -5" stroke="var(--ss-mid)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <text x="0" y="24" fontSize="11" fill="var(--ss-mid)" fontFamily="var(--font-arcon)" textAnchor="middle">
          N
        </text>
      </g>

      {/* Cities */}
      {CITIES.map((city) => {
        const [x, y] = project(city.at);
        return (
          <g key={city.name}>
            <circle cx={x} cy={y} r="9" fill="var(--accent)" fillOpacity="0.4" />
            <circle cx={x} cy={y} r="4.5" fill="var(--accent-strong)" />
            <text
              x={x + city.dx}
              y={y + 4}
              fontSize="13.5"
              textAnchor={city.anchor}
              fill="var(--ss-dark)"
              fontFamily="var(--font-arcon)"
              style={{ paintOrder: "stroke", stroke: "var(--ss-cream)", strokeWidth: 3.5, strokeLinejoin: "round" }}
            >
              {city.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
