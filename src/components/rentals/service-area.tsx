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
   coastal waypoints (lon/lat) projected into the viewBox and smoothed with
   Catmull-Rom splines. East–west is exaggerated ~2.4× so the features of a
   narrow coastal strip read at this size. The geography is genuine: the bay
   shore ducks west behind Bribie through Pumicestone Passage, the Redcliffe
   peninsula juts back east, the four sand islands enclose Moreton Bay with
   their real gaps (South Passage, Jumpinpin, the Southport Seaway), the
   rivers meander to their true mouths, and Cape Byron is the easternmost
   point on the sheet — as it is on the continent.
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
  [153.1, 27.24], // Redcliffe peninsula — one rounded lobe at this scale
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
  [153.34, 29.61], // Brooms Head (runs off bottom)
];

// The sand islands, each a closed outline with its real channels: the
// Caloundra bar, Pumicestone Passage, South Passage, Jumpinpin and the
// Southport Seaway all stay open water.
const ISLANDS: { name: string; outline: Pt[]; fringe: boolean }[] = [
  {
    name: "Bribie Island",
    fringe: false, // Pumicestone Passage is too narrow for the sand fringe
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
    fringe: true,
    outline: [
      [153.43, 27.75], [153.44, 27.82], [153.43, 27.89], [153.43, 27.94],
      [153.41, 27.88], [153.42, 27.8],
    ],
  },
];

// Rivers, inland → mouth; each mouth lands exactly on its coast waypoint.
// The Brisbane gets its city S-bend; the Richmond genuinely hooks south
// through Woodburn before turning back northeast to Ballina.
const RIVERS: { name: string; width: number; path: Pt[] }[] = [
  {
    name: "Brisbane River",
    width: 1.6,
    path: [
      [152.85, 27.55], [152.95, 27.5], [153.03, 27.48], [153.07, 27.44],
      [153.12, 27.46], [153.17, 27.38],
    ],
  },
  {
    name: "Tweed River",
    width: 1.3,
    path: [[153.33, 28.42], [153.4, 28.33], [153.47, 28.28], [153.54, 28.23], [153.55, 28.18]],
  },
  {
    name: "Richmond River",
    width: 1.3,
    path: [[153.05, 28.86], [153.28, 28.99], [153.35, 29.07], [153.44, 28.96], [153.58, 28.87]],
  },
];

const PEAKS: { name: string; at: Pt; anchor: "start" | "end" }[] = [
  { name: "Glass House Mtns", at: [152.95, 26.91], anchor: "end" },
  { name: "Wollumbin", at: [153.27, 28.4], anchor: "end" },
];

const CITIES: { name: string; at: Pt; dx: number; anchor: "start" | "end"; minor?: boolean }[] = [
  { name: "Sunshine Coast", at: [153.09, 26.66], dx: -10, anchor: "end" },
  { name: "Brisbane", at: [153.02, 27.47], dx: -10, anchor: "end" },
  { name: "Gold Coast", at: [153.42, 28.0], dx: 12, anchor: "start" },
  { name: "Byron Bay", at: [153.64, 28.64], dx: -12, anchor: "end" },
  { name: "Lismore", at: [153.28, 28.81], dx: -10, anchor: "end", minor: true },
];

function CoverageMap() {
  const mainland = MAINLAND.map(project);
  const coast = spline(mainland);
  const land = `${coast} L 0 532 L 0 30 Z`;
  const corridor = spline(mainland.slice(2, 33)); // Noosa → Ballina (served)
  const borderY = (28.16 - 26.0) * 135 + 40;

  return (
    <svg
      viewBox="0 0 372 560"
      role="img"
      aria-label="Map of the service area along the coast from the Sunshine Coast in Queensland, past Brisbane, Moreton Bay and its sand islands, the Gold Coast and Byron Bay, down to the Northern Rivers in New South Wales"
      className="h-auto w-full"
    >
      {/* Ocean */}
      <rect width="372" height="560" rx="26" fill="var(--accent-soft)" />
      <g stroke="var(--accent-strong)" strokeOpacity="0.22" strokeWidth="2" strokeLinecap="round" fill="none">
        <path d="M338 150c8-6 16-6 24 0" />
        <path d="M340 250c8-6 16-6 24 0" />
        <path d="M344 352c8-6 16-6 24 0" />
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

      {/* Shallows — a wide pale stroke of the coast painted under the land
          fill, so only the seaward fringe survives: near-shore water reads
          lighter, the classic chart cue for shallow water. */}
      <path d={coast} fill="none" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="11" strokeLinejoin="round" strokeLinecap="round" />

      {/* Land */}
      <path d={land} fill="var(--ss-cream-soft)" />

      {/* Hinterland — the range foothills as a tonal wash off the west edge,
          with two contour whispers. Texture, not data. */}
      <path
        d="M0 40 C 70 70 100 140 96 220 C 92 300 84 380 40 450 C 25 472 10 488 0 496 Z"
        fill="var(--ss-sage)"
        fillOpacity="0.12"
      />
      <g stroke="var(--ss-eucalyptus)" strokeOpacity="0.22" strokeWidth="1" strokeLinecap="round" strokeDasharray="1 5" fill="none">
        <path d="M18 120 C 60 140 78 200 74 260" />
        <path d="M26 320 C 56 340 58 396 34 440" />
      </g>

      {/* Moreton Bay sand banks — soft pale shoals floating in the bay. */}
      <g fill="#ffffff" fillOpacity="0.45">
        <path d="M222 196 C 230 190 240 196 238 206 C 236 215 223 217 217 210 C 212 204 215 199 222 196 Z" />
        <path d="M244 246 C 250 242 256 246 255 253 C 254 259 245 260 241 255 C 238 251 240 248 244 246 Z" />
      </g>

      {/* Sand islands — fringed with shallows, filled a half-step warmer than
          the mainland (they are sand), with the olive outline on top. */}
      {ISLANDS.map((island) => {
        const outline = `${spline(island.outline.map(project))} Z`;
        return (
          <g key={island.name}>
            {island.fringe ? (
              <path d={outline} fill="none" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="9" strokeLinejoin="round" />
            ) : null}
            <path d={outline} fill="var(--ss-cream-soft)" />
            <path d={outline} fill="var(--ss-clay)" fillOpacity="0.28" stroke="var(--ss-olive)" strokeWidth="1.5" strokeOpacity="0.5" />
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
      <path d={corridor} fill="none" stroke="var(--accent-strong)" strokeOpacity="0.18" strokeWidth="22" strokeLinecap="round" />
      <path d={coast} fill="none" stroke="var(--ss-clay)" strokeWidth="4.5" strokeOpacity="0.55" strokeLinejoin="round" />
      <path d={coast} fill="none" stroke="var(--ss-olive)" strokeWidth="2.5" strokeOpacity="0.85" strokeLinejoin="round" />

      {/* QLD / NSW border */}
      <path d={`M0 ${borderY.toFixed(1)} L 290 ${borderY.toFixed(1)}`} stroke="var(--ss-mid)" strokeWidth="1.4" strokeDasharray="6 7" strokeOpacity="0.55" />
      <text x="20" y={borderY - 12} fontSize="14" fill="var(--ss-mid)" fillOpacity="0.75" fontFamily="var(--font-arcon)" letterSpacing="3">
        QLD
      </text>
      <text x="20" y={borderY + 26} fontSize="14" fill="var(--ss-mid)" fillOpacity="0.75" fontFamily="var(--font-arcon)" letterSpacing="3">
        NSW
      </text>

      {/* Peaks — Wollumbin and the Glass House Mountains, the two landmarks
          that genuinely command this frame. */}
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
    </svg>
  );
}
