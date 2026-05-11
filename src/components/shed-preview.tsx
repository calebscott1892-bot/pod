import type {
  ShedColour,
  ShedShape,
  ShedStyle,
  ShedUpgrade,
} from "./builder-options";
import { conceptLabels } from "./builder-options";

type Props = {
  style: ShedStyle;
  shape: ShedShape;
  colour: ShedColour;
  upgrades: ShedUpgrade[];
};

type ColourValue = {
  shell: string;
  roof: string;
  trim: string;
  glass: string;
  floor: string;
  label: string;
};

const colours: Record<ShedColour, ColourValue> = {
  sage: {
    shell: "#b8c7a3",
    roof: "#d7e2c0",
    trim: "#59664f",
    glass: "#31494d",
    floor: "#d8c4ad",
    label: "Sage",
  },
  blush: {
    shell: "#edc3c0",
    roof: "#f6dddd",
    trim: "#6f8067",
    glass: "#31494d",
    floor: "#d8c4ad",
    label: "Blush",
  },
  cream: {
    shell: "#fffaf2",
    roof: "#e8eee0",
    trim: "#59664f",
    glass: "#31494d",
    floor: "#d8c4ad",
    label: "Cream",
  },
  "mist-blue": {
    shell: "#cbdce0",
    roof: "#e6eeee",
    trim: "#59664f",
    glass: "#2f4852",
    floor: "#d8c4ad",
    label: "Mist Blue",
  },
  "charcoal-trim": {
    shell: "#f7efe4",
    roof: "#d7e2c0",
    trim: "#24231f",
    glass: "#202423",
    floor: "#d8c4ad",
    label: "Charcoal Trim",
  },
};

export function ShedPreview({ style, shape, colour, upgrades }: Props) {
  const palette = colours[colour];
  const labels = conceptLabels({ style, shape, colour, upgrades });
  const isGlassFront =
    shape === "glass-front" || upgrades.includes("sliding-glass-doors");
  const hasExtraWindow = upgrades.includes("extra-window");
  const hasSkylight = upgrades.includes("skylight");
  const hasDeck = upgrades.includes("deck-step");
  const hasStorage = upgrades.includes("storage-wall");
  const hasPower = upgrades.includes("power-provision");
  const hasAc = upgrades.includes("air-conditioning-provision");
  const hasLining = upgrades.includes("interior-lining");

  return (
    <div className="overflow-hidden border border-[#24231f]/12 bg-[#fffaf2] shadow-[0_34px_90px_-52px_rgba(36,35,31,0.62)]">
      <div className="flex items-start justify-between gap-4 border-b border-[#24231f]/10 px-4 py-4 sm:px-5">
        <div>
          <p className="font-mono text-[10px] font-semibold tracking-[0.28em] text-[#59664f] uppercase">
            Your current build
          </p>
          <h3 className="mt-2 text-[25px] leading-tight font-semibold tracking-tight">
            {labels.style}
          </h3>
        </div>
        <p className="border border-[#24231f]/10 bg-[#eaf0dc] px-3 py-2 text-right font-mono text-[10px] font-semibold tracking-[0.16em] text-[#59664f] uppercase">
          {labels.shape}
        </p>
      </div>

      <div className="bg-[#fbf5ec] p-3 sm:p-5">
        <div className="overflow-hidden bg-[#f8eadf] shadow-[inset_0_0_0_1px_rgba(36,35,31,0.07)]">
          <svg
            viewBox="0 0 760 500"
            className="block h-auto w-full"
            role="img"
            aria-label={`${labels.style} preview in ${palette.label}`}
          >
            <defs>
              <linearGradient id="previewBg" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#fbf5ec" />
                <stop offset="100%" stopColor="#f4dfd2" />
              </linearGradient>
              <linearGradient id="previewGlass" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#496267" />
                <stop offset="100%" stopColor={palette.glass} />
              </linearGradient>
              <filter
                id="shedShadow"
                x="-20%"
                y="-20%"
                width="140%"
                height="150%"
                colorInterpolationFilters="sRGB"
              >
                <feDropShadow
                  dx="0"
                  dy="14"
                  stdDeviation="12"
                  floodColor="#24231f"
                  floodOpacity="0.16"
                />
              </filter>
            </defs>
            <rect width="760" height="500" fill="url(#previewBg)" />
            <path
              d="M70 383 C160 348 245 350 332 367 C430 386 540 347 700 377"
              fill="none"
              stroke="#d8c4ad"
              strokeWidth="22"
              strokeLinecap="round"
              opacity="0.38"
            />
            <path
              d="M92 384 C160 396 240 390 318 398 C438 411 560 388 674 398"
              fill="none"
              stroke="#6f8067"
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.2"
            />
            <g opacity="0.42" stroke="#6f8067" strokeLinecap="square">
              <path d="M95 350 V311" strokeWidth="3" />
              <path d="M95 329 74 305" strokeWidth="2" />
              <path d="M95 333 118 309" strokeWidth="2" />
              <path d="M664 356 V322" strokeWidth="3" />
              <path d="M664 337 643 318" strokeWidth="2" />
              <path d="M664 339 686 318" strokeWidth="2" />
            </g>

            <ellipse
              cx={shape === "corner" ? "392" : "382"}
              cy="376"
              rx={shape === "corner" ? "238" : "216"}
              ry="24"
              fill="#24231f"
              opacity="0.12"
            />

            {shape === "corner" ? (
              <g filter="url(#shedShadow)">
                <path
                  d="M170 182 H465 L570 244 V365 H170 Z"
                  fill={palette.shell}
                  stroke={palette.trim}
                  strokeWidth="4"
                  strokeLinejoin="round"
                />
                <path
                  d="M465 182 570 244 V365 H465 Z"
                  fill={palette.roof}
                  opacity="0.42"
                  stroke={palette.trim}
                  strokeWidth="4"
                  strokeLinejoin="round"
                />
                <path
                  d="M150 182 258 114 H462 L593 184 H466 L405 152 H252 Z"
                  fill={palette.roof}
                  stroke={palette.trim}
                  strokeWidth="4"
                  strokeLinejoin="round"
                />
                <path
                  d="M465 182 V365"
                  stroke={palette.trim}
                  strokeWidth="3"
                  opacity="0.75"
                />
              </g>
            ) : (
              <g filter="url(#shedShadow)">
                <rect
                  x="168"
                  y="178"
                  width="420"
                  height="184"
                  fill={palette.shell}
                  stroke={palette.trim}
                  strokeWidth="4"
                />
                {style === "garden-pod" ? (
                  <path
                    d="M168 178 C238 104 516 104 588 178 Z"
                    fill={palette.roof}
                    stroke={palette.trim}
                    strokeWidth="4"
                  />
                ) : (
                  <path
                    d={
                      style === "utility-shed"
                        ? "M150 178 214 126 H594 L610 178 Z"
                        : "M140 178 242 118 H562 L616 178 Z"
                    }
                    fill={palette.roof}
                    stroke={palette.trim}
                    strokeWidth="4"
                    strokeLinejoin="round"
                  />
                )}
              </g>
            )}

            {hasLining ? (
              <rect
                x="195"
                y="203"
                width={shape === "corner" ? "240" : "334"}
                height="128"
                fill="none"
                stroke="#fffaf2"
                strokeWidth="3"
                strokeDasharray="10 8"
                opacity="0.78"
              />
            ) : null}

            {isGlassFront ? (
              <g>
                <rect
                  x={shape === "corner" ? "338" : "357"}
                  y="207"
                  width={shape === "glass-front" ? "166" : "128"}
                  height="142"
                  fill="url(#previewGlass)"
                  stroke={palette.trim}
                  strokeWidth="4"
                  opacity="0.94"
                />
                <line
                  x1={shape === "glass-front" ? "440" : "421"}
                  y1="207"
                  x2={shape === "glass-front" ? "440" : "421"}
                  y2="349"
                  stroke="#fffaf2"
                  strokeWidth="2"
                  opacity="0.45"
                />
                <path
                  d={
                    shape === "glass-front"
                      ? "M377 228 H486 M377 329 H486"
                      : "M375 228 H466 M375 329 H466"
                  }
                  stroke="#fffaf2"
                  strokeWidth="2"
                  opacity="0.28"
                />
              </g>
            ) : (
              <g>
                <rect
                  x={shape === "corner" ? "352" : "400"}
                  y="218"
                  width="76"
                  height="130"
                  fill="#fffaf2"
                  stroke={palette.trim}
                  strokeWidth="4"
                />
                <circle
                  cx={shape === "corner" ? "414" : "462"}
                  cy="285"
                  r="3"
                  fill={palette.trim}
                />
              </g>
            )}

            <rect
              x="215"
              y="218"
              width={style === "utility-shed" ? "70" : "108"}
              height="72"
              fill="#fffaf2"
              stroke={palette.trim}
              strokeWidth="4"
            />
            <line
              x1={style === "utility-shed" ? "250" : "269"}
              y1="218"
              x2={style === "utility-shed" ? "250" : "269"}
              y2="290"
              stroke={palette.trim}
              strokeWidth="2"
              opacity="0.5"
            />

            {hasExtraWindow ? (
              <rect
                x={shape === "corner" ? "510" : "520"}
                y={shape === "corner" ? "257" : "229"}
                width="58"
                height="52"
                fill="#fffaf2"
                stroke={palette.trim}
                strokeWidth="4"
              />
            ) : null}

            {hasStorage ? (
              <g>
                <rect
                  x="205"
                  y="314"
                  width="132"
                  height="30"
                  fill="#fffaf2"
                  stroke={palette.trim}
                  strokeWidth="3"
                />
                <line
                  x1="249"
                  y1="314"
                  x2="249"
                  y2="344"
                  stroke={palette.trim}
                  strokeWidth="2"
                  opacity="0.5"
                />
                <line
                  x1="293"
                  y1="314"
                  x2="293"
                  y2="344"
                  stroke={palette.trim}
                  strokeWidth="2"
                  opacity="0.5"
                />
              </g>
            ) : null}

            {hasSkylight ? (
              <rect
                x={style === "garden-pod" ? "326" : "333"}
                y={style === "garden-pod" ? "130" : "143"}
                width="94"
                height="22"
                fill="#fffaf2"
                stroke={palette.trim}
                strokeWidth="3"
                transform="rotate(-8 380 154)"
              />
            ) : null}

            {hasDeck ? (
              <g>
                <rect
                  x={isGlassFront ? "327" : "374"}
                  y="362"
                  width={isGlassFront ? "210" : "156"}
                  height="34"
                  fill={palette.floor}
                  stroke={palette.trim}
                  strokeWidth="4"
                />
                <path
                  d={
                    isGlassFront
                      ? "M348 379 H517 M348 388 H517"
                      : "M392 379 H512 M392 388 H512"
                  }
                  stroke={palette.trim}
                  strokeWidth="2"
                  opacity="0.34"
                />
              </g>
            ) : null}

            {hasPower ? (
              <g>
                <rect
                  x={shape === "corner" ? "528" : "538"}
                  y="323"
                  width="24"
                  height="18"
                  fill="#fffaf2"
                  stroke={palette.trim}
                  strokeWidth="3"
                />
                <circle
                  cx={shape === "corner" ? "536" : "546"}
                  cy="332"
                  r="1.8"
                  fill={palette.trim}
                />
                <circle
                  cx={shape === "corner" ? "544" : "554"}
                  cy="332"
                  r="1.8"
                  fill={palette.trim}
                />
              </g>
            ) : null}

            {hasAc ? (
              <g>
                <rect
                  x={shape === "corner" ? "516" : "520"}
                  y={shape === "corner" ? "204" : "193"}
                  width="70"
                  height="28"
                  fill="#fffaf2"
                  stroke={palette.trim}
                  strokeWidth="3"
                />
                <path
                  d={
                    shape === "corner"
                      ? "M528 218 H573"
                      : "M532 207 H577"
                  }
                  stroke={palette.trim}
                  strokeWidth="2"
                  opacity="0.55"
                />
              </g>
            ) : null}
          </svg>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-[0.75fr_1fr]">
          <div className="border border-[#24231f]/10 bg-[#fffaf2] p-4">
            <p className="font-mono text-[10px] font-semibold tracking-[0.24em] text-[#59664f] uppercase">
              Plan view
            </p>
            <svg
              viewBox="0 0 230 130"
              className="mt-3 block aspect-[16/9] w-full border border-[#24231f]/20 bg-[#fbf5ec]"
              aria-hidden="true"
            >
              {shape === "corner" ? (
                <path
                  d="M24 24 H142 V64 H204 V108 H24 Z"
                  fill="#fffaf2"
                  stroke="#24231f"
                  strokeWidth="3"
                />
              ) : (
                <rect
                  x="24"
                  y="24"
                  width="182"
                  height="84"
                  fill="#fffaf2"
                  stroke="#24231f"
                  strokeWidth="3"
                />
              )}
              <path
                d={
                  shape === "glass-front"
                    ? "M132 24 V108"
                    : "M148 24 V108"
                }
                stroke="#24231f"
                strokeWidth="2"
                opacity="0.7"
              />
              <rect
                x={shape === "glass-front" ? "142" : "158"}
                y="34"
                width="38"
                height="64"
                fill="#d7e2c0"
                opacity="0.95"
              />
            </svg>
          </div>

          <div className="border border-[#24231f]/10 bg-[#fffaf2] p-4">
            <p className="font-mono text-[10px] font-semibold tracking-[0.24em] text-[#59664f] uppercase">
              Build notes
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <PreviewBadge label={labels.colour} />
              {labels.upgrades.length ? (
                labels.upgrades.slice(0, 5).map((upgrade) => (
                  <PreviewBadge key={upgrade} label={upgrade} />
                ))
              ) : (
                <span className="text-[13px] leading-5 text-[#5f5b52]">
                  Optional upgrades appear here as you add them.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PreviewBadge({ label }: { label: string }) {
  return (
    <span className="bg-[#eaf0dc] px-2.5 py-1.5 text-[12px] leading-none text-[#24231f]">
      {label}
    </span>
  );
}
