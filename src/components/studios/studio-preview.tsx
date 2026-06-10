import {
  claddingOptions,
  resolveConfig,
  type StudioConfig,
} from "./studio-data";

/**
 * Live front elevation of the configured studio. Window, door and cladding
 * choices render instantly; fills ease between colours via CSS transitions.
 */
export function StudioPreview({ config }: { config: StudioConfig }) {
  const resolved = resolveConfig(config);
  const cladding = resolved?.cladding ?? claddingOptions[0];
  const windowId = resolved?.windows.id ?? "standard";
  const doorId = resolved?.doors.id ?? "sliding";
  const darkCladding = cladding.id === "charcoal";

  return (
    <svg
      viewBox="0 0 520 400"
      role="img"
      aria-label={
        resolved
          ? `Preview of ${resolved.style.name} with ${resolved.windows.name.toLowerCase()}, ${resolved.doors.name.toLowerCase()} and ${cladding.name.toLowerCase()} cladding`
          : "Studio preview"
      }
      className="h-auto w-full"
    >
      <defs>
        <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#eef5fa" />
          <stop offset="55%" stopColor="#d8e7f0" />
          <stop offset="100%" stopColor="#f6fbff" />
        </linearGradient>
      </defs>

      {/* Backdrop sun */}
      <circle className="sp-stage" cx="430" cy="84" r="44" fill="var(--accent-soft)" />

      {/* Ground shadow */}
      <ellipse className="sp-stage sp-d1" cx="260" cy="356" rx="206" ry="13" fill="#2c2825" opacity="0.08" />

      {/* Body */}
      <g className="sp-stage sp-d1">
        <rect
          x="80"
          y="140"
          width="360"
          height="204"
          rx="10"
          fill={cladding.swatch}
          stroke="#2c2825"
          strokeWidth="3"
          style={{ transition: "fill 0.45s ease" }}
        />
        <g stroke={darkCladding ? "#ffffff" : "#2c2825"} strokeOpacity="0.08" strokeWidth="1.5">
          {[160, 177, 194, 211, 228, 245, 262, 279, 296, 313, 330].map((y) => (
            <path key={y} d={`M84 ${y}h352`} />
          ))}
        </g>
        {/* Feet, a nod to the logo's little wheels */}
        <g fill="#2c2825">
          <circle cx="126" cy="346" r="8" />
          <circle cx="260" cy="346" r="8" />
          <circle cx="394" cy="346" r="8" />
        </g>
      </g>

      {/* Skillion roof, higher on the left — same silhouette as the logo */}
      <path
        className="sp-stage sp-d2"
        d="M62 144 458 116"
        stroke="#2c2825"
        strokeWidth="13"
        strokeLinecap="round"
      />

      {/* Windows — left wall */}
      {windowId === "feature" ? (
        <g className="sp-stage sp-d3">
          <rect x="104" y="166" width="128" height="116" rx="4" fill="#1f1c1a" />
          <rect x="113" y="175" width="110" height="98" rx="2" fill="url(#glass)" />
          <path d="m126 256 58-66M148 262l66-76" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="5" strokeLinecap="round" />
        </g>
      ) : (
        <g className="sp-stage sp-d3">
          <rect x="118" y="170" width="86" height="104" rx="4" fill="#ffffff" stroke="#2c2825" strokeWidth="2.5" />
          <rect x="126" y="178" width="70" height="40" rx="2" fill="url(#glass)" />
          <rect x="126" y="226" width="70" height="40" rx="2" fill="url(#glass)" />
          <path d="M118 222h86" stroke="#2c2825" strokeWidth="2.5" />
          <rect x="112" y="274" width="98" height="7" rx="3.5" fill="#ffffff" stroke="#2c2825" strokeWidth="2" />
        </g>
      )}

      {/* Doors — right wall */}
      {doorId === "sliding" ? (
        <g className="sp-stage sp-d4">
          <rect x="288" y="162" width="126" height="182" rx="4" fill="#2c2825" />
          <rect x="295" y="169" width="54" height="168" rx="2" fill="url(#glass)" />
          <rect x="351" y="169" width="56" height="168" rx="2" fill="url(#glass)" opacity="0.92" />
          <path d="M349 169v168" stroke="#2c2825" strokeWidth="4" />
          <rect x="340" y="244" width="5" height="26" rx="2.5" fill="#2c2825" />
        </g>
      ) : null}
      {doorId === "french" ? (
        <g className="sp-stage sp-d4">
          <rect x="292" y="162" width="118" height="182" rx="4" fill="#ffffff" stroke="#2c2825" strokeWidth="2.5" />
          {[0, 1].map((side) => {
            const x = 299 + side * 56;
            return (
              <g key={side}>
                <rect x={x} y="170" width="48" height="78" rx="2" fill="url(#glass)" stroke="#2c2825" strokeWidth="1.5" />
                <rect x={x} y="256" width="48" height="78" rx="2" fill="url(#glass)" stroke="#2c2825" strokeWidth="1.5" />
                <path d={`M${x + 24} 170v164`} stroke="#2c2825" strokeWidth="1.2" strokeOpacity="0.5" />
              </g>
            );
          })}
          <path d="M351 162v182" stroke="#2c2825" strokeWidth="3" />
          <circle cx="344" cy="256" r="3.5" fill="#2c2825" />
          <circle cx="358" cy="256" r="3.5" fill="#2c2825" />
        </g>
      ) : null}
      {doorId === "barn" ? (
        <g className="sp-stage sp-d4">
          <path d="M276 156h150" stroke="#2c2825" strokeWidth="9" strokeLinecap="round" />
          <path d="M310 161v14M392 161v14" stroke="#2c2825" strokeWidth="5" strokeLinecap="round" />
          <rect x="296" y="172" width="110" height="172" rx="4" fill="#c89b72" stroke="#2c2825" strokeWidth="3" />
          <path d="M296 196h110M296 320h110M296 196l110 124M406 196 296 320" stroke="#2c2825" strokeWidth="2.5" strokeOpacity="0.65" />
          <rect x="304" y="248" width="6" height="30" rx="3" fill="#2c2825" />
        </g>
      ) : null}

      {/* Planter */}
      <g className="sp-stage sp-d5">
        <path d="M452 318c-10-16 2-30 14-34-2 14-2 26-14 34Z" fill="var(--accent)" opacity="0.55" />
        <path d="M468 320c-2-12 6-22 16-24-4 10-6 18-16 24Z" fill="var(--accent)" opacity="0.4" />
        <path d="M448 322h40l-5 24h-30l-5-24Z" fill="#2c2825" />
      </g>
    </svg>
  );
}
