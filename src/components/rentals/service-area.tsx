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
            <div className="shape-soft elev-1 border border-line bg-cream-soft p-6">
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
            <div className="shape-soft elev-1 border border-line bg-cream-soft p-6">
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
   coastal waypoints (lon/lat) smoothed with Catmull-Rom splines — at TRUE
   proportions. The projection is equal-scale (1° of longitude spans
   cos 27.85° of a degree of latitude), so the coast renders at its real,
   near-vertical slope: Moreton Bay is the subtle notch it actually is, the
   sand islands hug the shore as slivers, Cape Byron bows gently east, the
   hinterland fills the west, and the state border wanders along the
   McPherson Range before running due west — matching the real map.
─────────────────────────────────────────────────────────────────────────── */

type Pt = [number, number];

// Equal-proportion projection: lon east, lat as positive degrees south.
const SX = 130.4; // px per °lon (= SY × cos 27.85°)
const SY = 147.4; // px per °lat
const LON0 = 151.34;
const LAT0 = 25.95;
const project = ([lon, lat]: Pt): Pt => [
  Number(((lon - LON0) * SX).toFixed(1)),
  Number(((lat - LAT0) * SY).toFixed(1)),
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

// Mainland shore, north → south (lon, °south).
const MAINLAND: Pt[] = [
  [153.19, 25.93], // Double Island Point (runs off top)
  [153.07, 26.28], // Teewah Beach
  [153.09, 26.39], // Noosa Heads
  [153.09, 26.53], // Coolum
  [153.1, 26.65], // Maroochydore
  [153.14, 26.68], // Point Cartwright, Mooloolaba
  [153.13, 26.8], // Caloundra headland
  [153.12, 26.83], // Golden Beach — shore turns in behind Bribie
  [153.09, 27.03], // Toorbul, Pumicestone Passage
  [153.05, 27.13], // Beachmere
  [153.02, 27.19], // Deception Bay
  [153.1, 27.24], // Redcliffe peninsula
  [153.06, 27.31], // Brighton, Bramble Bay
  [153.1, 27.35], // Nudgee Beach
  [153.17, 27.38], // Brisbane River mouth, Luggage Point
  [153.17, 27.44], // Wynnum
  [153.24, 27.47], // Wellington Point
  [153.29, 27.52], // Cleveland Point
  [153.31, 27.61], // Redland Bay
  [153.36, 27.78], // Jacobs Well
  [153.4, 27.88], // Paradise Point — the Broadwater
  [153.41, 27.96], // Southport
  [153.43, 28.0], // Surfers Paradise — open ocean again
  [153.45, 28.09], // Burleigh Heads
  [153.49, 28.13], // Currumbin
  [153.55, 28.17], // Point Danger, the border
  [153.55, 28.18], // Tweed River mouth
  [153.58, 28.26], // Kingscliff
  [153.57, 28.39], // Pottsville
  [153.55, 28.54], // Brunswick Heads
  [153.64, 28.64], // Cape Byron, easternmost point
  [153.6, 28.79], // Lennox Head
  [153.58, 28.87], // Ballina, Richmond River mouth
  [153.43, 29.11], // Evans Head
  [153.36, 29.41], // Iluka, Clarence mouth
  [153.36, 29.44], // Yamba
  [153.34, 29.61], // Brooms Head
  [153.27, 29.85], // Wooli (runs off bottom)
];

// The sand islands — at true scale they are slivers hugging the coast, with
// their channels (Pumicestone Passage, South Passage, Jumpinpin, the
// Southport Seaway) as the hairline gaps they really are.
const ISLANDS: { name: string; outline: Pt[]; fringe: boolean }[] = [
  {
    name: "Bribie Island",
    fringe: false,
    outline: [
      [153.14, 26.81], [153.16, 26.89], [153.19, 27.0], [153.19, 27.08],
      [153.16, 27.09], [153.13, 27.02], [153.12, 26.94], [153.13, 26.85],
    ],
  },
  {
    name: "Moreton Island",
    fringe: true,
    outline: [
      [153.47, 27.03], [153.45, 27.12], [153.44, 27.22], [153.43, 27.33],
      [153.4, 27.37], [153.37, 27.2], [153.37, 27.12], [153.37, 27.06],
      [153.43, 27.02],
    ],
  },
  {
    name: "North Stradbroke Island",
    fringe: true,
    outline: [
      [153.44, 27.4], [153.54, 27.43], [153.51, 27.55], [153.47, 27.65],
      [153.44, 27.74], [153.41, 27.63], [153.41, 27.5],
    ],
  },
  {
    name: "South Stradbroke Island",
    fringe: false,
    outline: [
      [153.43, 27.75], [153.44, 27.82], [153.43, 27.89], [153.43, 27.94],
      [153.41, 27.88], [153.42, 27.8],
    ],
  },
];

// Rivers, inland → mouth; each mouth lands exactly on its coast waypoint.
const RIVERS: { name: string; width: number; path: Pt[] }[] = [
  {
    name: "Brisbane River",
    width: 1.6,
    path: [
      [152.7, 27.5], [152.85, 27.45], [152.98, 27.47], [153.06, 27.44],
      [153.12, 27.46], [153.17, 27.38],
    ],
  },
  {
    name: "Tweed River",
    width: 1.2,
    path: [[153.33, 28.42], [153.4, 28.33], [153.47, 28.28], [153.54, 28.23], [153.55, 28.18]],
  },
  {
    name: "Richmond River",
    width: 1.2,
    path: [[153.05, 28.86], [153.28, 28.99], [153.35, 29.07], [153.44, 28.96], [153.58, 28.87]],
  },
  {
    name: "Clarence River",
    width: 1.4,
    path: [[152.9, 29.6], [153.1, 29.5], [153.22, 29.45], [153.36, 29.42]],
  },
];

// The QLD/NSW border as it really runs: from Point Danger west along the
// McPherson Range, dipping southwest through the Dividing Range to
// Wallangarra, then due west along 29°S.
const BORDER: Pt[] = [
  [153.55, 28.17],
  [153.35, 28.24],
  [153.1, 28.29],
  [152.85, 28.33],
  [152.6, 28.36],
  [152.4, 28.5],
  [152.1, 28.75],
  [151.93, 28.92],
  [151.75, 29.0],
  [151.3, 29.0],
];

const PEAKS: { name: string; at: Pt; anchor: "start" | "end" }[] = [
  { name: "Glass House Mtns", at: [152.95, 26.91], anchor: "end" },
  { name: "Wollumbin", at: [153.27, 28.4], anchor: "end" },
];

const CITIES: { name: string; at: Pt; dx: number; anchor: "start" | "end"; minor?: boolean }[] = [
  { name: "Sunshine Coast", at: [153.09, 26.66], dx: -10, anchor: "end" },
  { name: "Brisbane", at: [153.02, 27.47], dx: -10, anchor: "end" },
  { name: "Gold Coast", at: [153.42, 28.0], dx: -12, anchor: "end" },
  { name: "Byron Bay", at: [153.64, 28.64], dx: -12, anchor: "end" },
  { name: "Lismore", at: [153.28, 28.81], dx: -10, anchor: "end", minor: true },
];

function CoverageMap() {
  const mainland = MAINLAND.map(project);
  const coast = spline(mainland);
  const land = `${coast} L 0 600 L 0 -20 Z`;
  const corridor = spline(mainland.slice(2, 33)); // Noosa → Ballina (served)
  const border = spline(BORDER.map(project));

  return (
    <svg
      viewBox="0 0 372 560"
      role="img"
      aria-label="Map of the service area along the coast from the Sunshine Coast in Queensland, past Brisbane, Moreton Bay and its sand islands, the Gold Coast and Byron Bay, down to the Northern Rivers in New South Wales"
      className="h-auto w-full"
    >
      <defs>
        <clipPath id="svc-map-clip">
          <rect width="372" height="560" rx="26" />
        </clipPath>
      </defs>

      <g clipPath="url(#svc-map-clip)">
        {/* Ocean */}
        <rect width="372" height="560" fill="var(--accent-soft)" />
        <g stroke="var(--accent-strong)" strokeOpacity="0.22" strokeWidth="2" strokeLinecap="round" fill="none">
          <path d="M322 96c8-6 16-6 24 0" />
          <path d="M330 336c8-6 16-6 24 0" />
          <path d="M324 468c8-6 16-6 24 0" />
        </g>
        <text
          x="345"
          y="240"
          fontSize="13"
          fill="var(--accent-strong)"
          fillOpacity="0.45"
          fontFamily="var(--font-arcon)"
          letterSpacing="3"
          textAnchor="middle"
          transform="rotate(90 345 240)"
        >
          PACIFIC OCEAN
        </text>

        {/* Shallows — a pale under-stroke of the coast; only the seaward
            fringe survives the land fill, so near-shore water reads lighter. */}
        <path d={coast} fill="none" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="7" strokeLinejoin="round" strokeLinecap="round" />

        {/* Land */}
        <path d={land} fill="var(--ss-cream-soft)" />

        {/* Hinterland — the Dividing Range foothills as a tonal wash filling
            the west, with two contour whispers. Texture, not data. */}
        <path
          d="M0 -10 C 120 30 150 120 148 220 C 146 320 120 420 60 520 C 40 550 20 570 0 575 Z"
          fill="var(--ss-sage)"
          fillOpacity="0.14"
        />
        <g stroke="var(--ss-eucalyptus)" strokeOpacity="0.22" strokeWidth="1" strokeLinecap="round" strokeDasharray="1 5" fill="none">
          <path d="M40 90 C 95 130 112 210 108 290" />
          <path d="M30 350 C 70 380 76 440 48 500" />
        </g>

        {/* A soft shoal in the northern bay. */}
        <ellipse cx="247" cy="197" rx="7" ry="4.5" fill="#ffffff" fillOpacity="0.45" />

        {/* Sand islands — slivers hugging the coast, a half-step warmer than
            the mainland (they are sand), thin olive outline. */}
        {ISLANDS.map((island) => {
          const outline = `${spline(island.outline.map(project))} Z`;
          return (
            <g key={island.name}>
              {island.fringe ? (
                <path d={outline} fill="none" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="3.5" strokeLinejoin="round" />
              ) : null}
              <path d={outline} fill="var(--ss-cream-soft)" />
              <path d={outline} fill="var(--ss-clay)" fillOpacity="0.28" stroke="var(--ss-olive)" strokeWidth="1.1" strokeOpacity="0.5" />
            </g>
          );
        })}

        {/* Rivers — meandering to their true mouths on the coast. */}
        <g fill="none" stroke="var(--accent-strong)" strokeOpacity="0.35" strokeLinecap="round">
          {RIVERS.map((river) => (
            <path key={river.name} d={spline(river.path.map(project))} strokeWidth={river.width} />
          ))}
        </g>

        {/* Served corridor highlight, then the beach under-ink + coastline. */}
        <path d={corridor} fill="none" stroke="var(--accent-strong)" strokeOpacity="0.2" strokeWidth="13" strokeLinecap="round" />
        <path d={coast} fill="none" stroke="var(--ss-clay)" strokeWidth="3.5" strokeOpacity="0.55" strokeLinejoin="round" />
        <path d={coast} fill="none" stroke="var(--ss-olive)" strokeWidth="2.2" strokeOpacity="0.85" strokeLinejoin="round" />

        {/* QLD / NSW border, wandering the range then running due west */}
        <path d={border} fill="none" stroke="var(--ss-mid)" strokeWidth="1.3" strokeDasharray="6 7" strokeOpacity="0.55" />
        <text x="16" y="434" fontSize="13" fill="var(--ss-mid)" fillOpacity="0.75" fontFamily="var(--font-arcon)" letterSpacing="3">
          QLD
        </text>
        <text x="16" y="472" fontSize="13" fill="var(--ss-mid)" fillOpacity="0.75" fontFamily="var(--font-arcon)" letterSpacing="3">
          NSW
        </text>

        {/* Peaks — Wollumbin and the Glass House Mountains. */}
        {PEAKS.map((peak) => {
          const [x, y] = project(peak.at);
          return (
            <g key={peak.name} transform={`translate(${x} ${y})`}>
              <path d="M-5 3.5 L0 -4.5 L5 3.5 Z" fill="var(--ss-eucalyptus)" fillOpacity="0.25" stroke="var(--ss-eucalyptus)" strokeWidth="1.3" strokeLinejoin="round" />
              <text
                x={peak.anchor === "end" ? -8 : 8}
                y="3.5"
                fontSize="9"
                textAnchor={peak.anchor}
                fill="var(--ss-mid)"
                fillOpacity="0.8"
                fontFamily="var(--font-arcon)"
                letterSpacing="0.5"
                style={{ paintOrder: "stroke", stroke: "var(--ss-cream)", strokeWidth: 2.5, strokeLinejoin: "round" }}
              >
                {peak.name}
              </text>
            </g>
          );
        })}

        {/* Compass */}
        <g transform="translate(346 34)">
          <path d="M0 12 L0 -12 M0 -12 L-4 -5 M0 -12 L4 -5" stroke="var(--ss-mid)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <text x="0" y="24" fontSize="11" fill="var(--ss-mid)" fontFamily="var(--font-arcon)" textAnchor="middle">
            N
          </text>
        </g>

        {/* Cities — inland Lismore sits one hierarchy step below the coast. */}
        {CITIES.map((city) => {
          const [x, y] = project(city.at);
          return (
            <g key={city.name}>
              <circle cx={x} cy={y} r={city.minor ? 7 : 9} fill="var(--accent)" fillOpacity={city.minor ? 0.3 : 0.4} />
              <circle cx={x} cy={y} r="4.5" fill="var(--accent-strong)" />
              <text
                x={x + city.dx}
                y={y + 4}
                fontSize={city.minor ? 12.5 : 13.5}
                textAnchor={city.anchor}
                fill="var(--ss-dark)"
                fillOpacity={city.minor ? 0.85 : 1}
                fontFamily="var(--font-arcon)"
                style={{ paintOrder: "stroke", stroke: "var(--ss-cream)", strokeWidth: 3.5, strokeLinejoin: "round" }}
              >
                {city.name}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
