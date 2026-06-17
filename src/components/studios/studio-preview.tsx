import {
  claddingOptions,
  resolveConfig,
  type StudioConfig,
} from "./studio-data";

/**
 * Live garden-scene elevation of the configured studio. Window, door and
 * cladding choices render instantly; fills ease between colours via CSS
 * transitions. The framed scene, landscaping, drop shadow and earthy
 * material palette are revived from the original Space Sheds preview —
 * carried over onto the modern flat/skillion modular silhouette (the
 * brand is a lifestyle studio, not a pitched-roof shed).
 *
 * Group `sp-stage` classes drive the staged entrance when the configurator
 * scrolls into view; with no `.reveal-in` ancestor they simply render.
 */
export function StudioPreview({ config }: { config: StudioConfig }) {
  const resolved = resolveConfig(config);
  const cladding = resolved?.cladding ?? claddingOptions[0];
  const windowId = resolved?.windows.id ?? "standard";
  const doorId = resolved?.doors.id ?? "sliding";
  const darkCladding = cladding.id === "charcoal";

  // Olive trim warms the whole illustration toward the original palette;
  // a dark cladding needs a near-black frame to stay legible.
  const trim = darkCladding ? "#1f1c1a" : "var(--ss-olive)";
  const boardStroke = darkCladding ? "#ffffff" : "var(--ss-olive)";

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
        <linearGradient id="sp-scene" x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0%" stopColor="#f7efe6" />
          <stop offset="100%" stopColor="#f1ddd0" />
        </linearGradient>
        {/* Cool reflective glass for framed panes. */}
        <linearGradient id="sp-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e7f0f2" />
          <stop offset="55%" stopColor="#c2d6d8" />
          <stop offset="100%" stopColor="#eef6f7" />
        </linearGradient>
        {/* Deep teal-green glass for big picture glazing (old-palette drama). */}
        <linearGradient id="sp-glass-deep" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#48666a" />
          <stop offset="100%" stopColor="var(--ss-glass)" />
        </linearGradient>
      </defs>

      {/* Framed garden scene */}
      <rect width="520" height="400" rx="18" fill="url(#sp-scene)" />

      {/* Soft sun glow */}
      <circle cx="430" cy="86" r="46" fill="var(--accent-soft)" opacity="0.85" />

      {/* Ground: clay berm + grass tufts */}
      <path
        d="M20 366 C150 350 230 352 290 360 C380 372 450 356 500 366"
        fill="none"
        stroke="var(--ss-clay)"
        strokeWidth="20"
        strokeLinecap="round"
        opacity="0.55"
      />
      <g stroke="var(--ss-eucalyptus)" strokeWidth="2.5" strokeLinecap="round" opacity="0.5">
        <path d="M70 360v-12M76 360l5-9M64 360l-4-9" />
        <path d="M250 366v-12M256 366l5-9M244 366l-4-9" />
        <path d="M470 362v-12M476 362l5-9M464 362l-4-9" />
      </g>

      {/* Left shrub — sage foliage with a few blush blossoms */}
      <g className="sp-stage sp-d5">
        <circle cx="52" cy="338" r="22" fill="var(--ss-sage)" />
        <circle cx="74" cy="346" r="17" fill="var(--ss-eucalyptus)" opacity="0.85" />
        <circle cx="38" cy="350" r="14" fill="var(--ss-sage)" />
        <circle cx="50" cy="330" r="3" fill="var(--ss-blush)" />
        <circle cx="66" cy="340" r="3" fill="var(--ss-blush)" />
        <circle cx="44" cy="346" r="2.6" fill="var(--ss-blush)" />
      </g>

      {/* Contact shadow grounding the studio */}
      <ellipse className="sp-stage sp-d1" cx="262" cy="350" rx="190" ry="13" fill="#2c2825" opacity="0.12" />

      {/* Body */}
      <g className="sp-stage sp-d1">
        <rect
          x="80"
          y="140"
          width="360"
          height="204"
          rx="10"
          fill={cladding.swatch}
          stroke={trim}
          strokeWidth="3"
          style={{ transition: "fill 0.45s ease" }}
        />
        <g stroke={boardStroke} strokeOpacity="0.12" strokeWidth="1.5">
          {[160, 177, 194, 211, 228, 245, 262, 279, 296, 313, 330].map((y) => (
            <path key={y} d={`M84 ${y}h352`} />
          ))}
        </g>
        {/* Feet, a nod to the logo's little wheels */}
        <g fill={trim}>
          <circle cx="126" cy="346" r="8" />
          <circle cx="260" cy="346" r="8" />
          <circle cx="394" cy="346" r="8" />
        </g>
      </g>

      {/* Skillion roof, higher on the left — same silhouette as the logo */}
      <path
        className="sp-stage sp-d2"
        d="M62 144 458 116"
        stroke={trim}
        strokeWidth="13"
        strokeLinecap="round"
      />

      {/* Windows — left wall */}
      {windowId === "feature" ? (
        <g className="sp-stage sp-d3">
          <rect x="104" y="166" width="128" height="116" rx="4" fill={trim} />
          <rect x="113" y="175" width="110" height="98" rx="2" fill="url(#sp-glass-deep)" />
          <path d="m126 256 58-66M148 262l66-76" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="5" strokeLinecap="round" />
        </g>
      ) : (
        <g className="sp-stage sp-d3">
          <rect x="118" y="170" width="86" height="104" rx="4" fill="#fbf6ef" stroke={trim} strokeWidth="2.5" />
          <rect x="126" y="178" width="70" height="40" rx="2" fill="url(#sp-glass)" />
          <rect x="126" y="226" width="70" height="40" rx="2" fill="url(#sp-glass)" />
          <path d="M118 222h86" stroke={trim} strokeWidth="2.5" />
          <rect x="112" y="274" width="98" height="7" rx="3.5" fill="#fbf6ef" stroke={trim} strokeWidth="2" />
        </g>
      )}

      {/* Doors — right wall */}
      {doorId === "sliding" ? (
        <g className="sp-stage sp-d4">
          <rect x="288" y="162" width="126" height="182" rx="4" fill={trim} />
          <rect x="295" y="169" width="54" height="168" rx="2" fill="url(#sp-glass-deep)" />
          <rect x="351" y="169" width="56" height="168" rx="2" fill="url(#sp-glass-deep)" opacity="0.9" />
          <path d="M315 178 300 210M335 178 320 210" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="4" strokeLinecap="round" />
          <path d="M349 169v168" stroke={trim} strokeWidth="4" />
          <rect x="340" y="244" width="5" height="26" rx="2.5" fill={trim} />
        </g>
      ) : null}
      {doorId === "french" ? (
        <g className="sp-stage sp-d4">
          <rect x="292" y="162" width="118" height="182" rx="4" fill="#fbf6ef" stroke={trim} strokeWidth="2.5" />
          {[0, 1].map((side) => {
            const x = 299 + side * 56;
            return (
              <g key={side}>
                <rect x={x} y="170" width="48" height="78" rx="2" fill="url(#sp-glass)" stroke={trim} strokeWidth="1.5" />
                <rect x={x} y="256" width="48" height="78" rx="2" fill="url(#sp-glass)" stroke={trim} strokeWidth="1.5" />
                <path d={`M${x + 24} 170v164`} stroke={trim} strokeWidth="1.2" strokeOpacity="0.5" />
              </g>
            );
          })}
          <path d="M351 162v182" stroke={trim} strokeWidth="3" />
          <circle cx="344" cy="256" r="3.5" fill={trim} />
          <circle cx="358" cy="256" r="3.5" fill={trim} />
        </g>
      ) : null}
      {doorId === "barn" ? (
        <g className="sp-stage sp-d4">
          <path d="M276 156h150" stroke={trim} strokeWidth="9" strokeLinecap="round" />
          <path d="M310 161v14M392 161v14" stroke={trim} strokeWidth="5" strokeLinecap="round" />
          <rect x="296" y="172" width="110" height="172" rx="4" fill="#c89b72" stroke={trim} strokeWidth="3" />
          <path d="M296 196h110M296 320h110M296 196l110 124M406 196 296 320" stroke={trim} strokeWidth="2.5" strokeOpacity="0.6" />
          <rect x="304" y="248" width="6" height="30" rx="3" fill={trim} />
        </g>
      ) : null}

      {/* Right plant — clay pot with eucalyptus foliage */}
      <g className="sp-stage sp-d5">
        <path d="M452 300c-12-18 2-34 16-38-2 16-2 30-16 38Z" fill="var(--ss-eucalyptus)" />
        <path d="M470 304c-2-14 8-26 20-28-4 12-8 22-20 28Z" fill="var(--ss-sage)" />
        <path d="M460 320v-26" stroke="var(--ss-olive)" strokeWidth="3" />
        <path d="M448 322h32l-5 26h-22l-5-26Z" fill="var(--ss-clay)" stroke="var(--ss-olive)" strokeWidth="2" />
      </g>
    </svg>
  );
}
