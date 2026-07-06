import { resolveConfig, type StudioConfig } from "./studio-data";

/**
 * Live garden-scene elevation of the configured studio. Roof shape, door
 * type/colour, window size and the trim + front-wall colours all render
 * from the config; fills ease between choices via CSS transitions. Group
 * `sp-stage` classes drive the staged entrance in the configurator.
 */
export function StudioPreview({ config }: { config: StudioConfig }) {
  const resolved = resolveConfig(config);

  const wall = resolved?.wall.swatch ?? "#f3f0e9";
  const trim = resolved?.trim.swatch ?? "#3d4636";
  const doorColour = resolved?.door.swatch ?? "#2c2c2c";
  const roofKind = resolved?.roof.kind ?? "skillion-right";
  const doorKind = resolved?.door.kind ?? "Sliding door";
  const windowId = resolved?.window.id ?? "large";
  const structure = "#2c2825";
  const darkWall = resolved?.wall.id === "black";

  return (
    <svg
      viewBox="0 0 520 400"
      role="img"
      aria-label={
        resolved
          ? `Preview: ${resolved.roof.name} roof, ${resolved.door.name.toLowerCase()}, ${resolved.window.name.toLowerCase()}, ${resolved.trim.name.toLowerCase()} trim on a ${resolved.wall.name.toLowerCase()} front wall`
          : "Studio preview"
      }
      className="h-auto w-full"
    >
      <defs>
        <linearGradient id="spp-scene" x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0%" stopColor="#f7efe6" />
          <stop offset="100%" stopColor="#f1ddd0" />
        </linearGradient>
        <linearGradient id="spp-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e7f0f2" />
          <stop offset="55%" stopColor="#c2d6d8" />
          <stop offset="100%" stopColor="#eef6f7" />
        </linearGradient>
      </defs>

      <rect width="520" height="400" rx="18" fill="url(#spp-scene)" />
      <circle cx="432" cy="82" r="44" fill="var(--accent-soft)" opacity="0.85" />

      {/* Ground + planting */}
      <path d="M20 366 C150 350 230 352 290 360 C380 372 450 356 500 366" fill="none" stroke="var(--ss-clay)" strokeWidth="20" strokeLinecap="round" opacity="0.55" />
      <g className="sp-stage sp-d5">
        <circle cx="50" cy="338" r="20" fill="var(--ss-sage)" />
        <circle cx="70" cy="346" r="15" fill="var(--ss-eucalyptus)" opacity="0.85" />
        <circle cx="38" cy="350" r="12" fill="var(--ss-sage)" />
        <circle cx="48" cy="331" r="3" fill="var(--ss-blush)" />
        <path d="M470 300c-11-16 2-30 15-34-2 15-2 27-15 34Z" fill="var(--ss-eucalyptus)" />
        <path d="M486 304c-2-12 7-23 18-25-4 11-7 19-18 25Z" fill="var(--ss-sage)" />
        <path d="M466 322h30l-4 24h-22l-4-24Z" fill="var(--ss-clay)" stroke="var(--ss-olive)" strokeWidth="2" />
      </g>

      {/* Contact shadow */}
      <ellipse className="sp-stage sp-d1" cx="262" cy="350" rx="190" ry="12" fill="#2c2825" opacity="0.12" />

      {/* Body, front wall colour, structural outline */}
      <g className="sp-stage sp-d1">
        <rect x="84" y="150" width="352" height="196" rx="8" fill={wall} stroke={structure} strokeWidth="3" style={{ transition: "fill 0.45s ease" }} />
        <g stroke={darkWall ? "#ffffff" : "#2c2825"} strokeOpacity="0.08" strokeWidth="1.4">
          {[172, 194, 216, 238, 260, 282, 304, 326].map((y) => (
            <path key={y} d={`M88 ${y}h344`} />
          ))}
        </g>
        {/* Corner posts in trim colour */}
        <rect x="84" y="150" width="12" height="196" fill={trim} style={{ transition: "fill 0.45s ease" }} />
        <rect x="424" y="150" width="12" height="196" fill={trim} style={{ transition: "fill 0.45s ease" }} />
        {/* Castor wheels, the 9-wheel mobility story */}
        <g fill={structure}>
          {[112, 156, 200, 244, 288, 332, 376, 408].map((cx) => (
            <circle key={cx} cx={cx} cy="350" r="6" />
          ))}
        </g>
      </g>

      {/* Roof, per selected shape, in trim colour */}
      <g className="sp-stage sp-d2">
        {roofKind === "a-frame" ? (
          <path d="M74 152 260 108 446 152" fill="none" stroke={trim} strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
        ) : roofKind === "skillion-left" ? (
          <path d="M74 120 446 150" stroke={trim} strokeWidth="13" strokeLinecap="round" />
        ) : (
          <path d="M74 150 446 120" stroke={trim} strokeWidth="13" strokeLinecap="round" />
        )}
      </g>

      {/* Window, left wall */}
      {windowId !== "none" ? (
        <g className="sp-stage sp-d3">
          {windowId === "large" ? (
            <>
              <rect x="120" y="182" width="80" height="104" rx="4" fill={trim} />
              <rect x="127" y="189" width="66" height="90" rx="2" fill="url(#spp-glass)" />
              <path d="M136 262 168 224" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="4" strokeLinecap="round" />
            </>
          ) : (
            <>
              <rect x="122" y="206" width="70" height="64" rx="4" fill={trim} />
              <rect x="129" y="213" width="56" height="50" rx="2" fill="url(#spp-glass)" />
              <path d="M138 250 162 224" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="3.5" strokeLinecap="round" />
            </>
          )}
        </g>
      ) : null}

      {/* Door, right wall, in the door colour */}
      <g className="sp-stage sp-d4">
        {doorKind === "Sliding door" ? (
          <>
            <rect x="288" y="168" width="126" height="178" rx="4" fill={doorColour} />
            <rect x="295" y="175" width="54" height="164" rx="2" fill="url(#spp-glass)" />
            <rect x="351" y="175" width="56" height="164" rx="2" fill="url(#spp-glass)" opacity="0.9" />
            <path d="M312 184 300 214" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="4" strokeLinecap="round" />
            <path d="M349 175v164" stroke={structure} strokeWidth="3" />
            <rect x="340" y="248" width="5" height="26" rx="2.5" fill={structure} />
          </>
        ) : doorKind === "French doors" ? (
          <>
            <rect x="292" y="168" width="118" height="178" rx="4" fill={doorColour} stroke={structure} strokeWidth="2" />
            {[0, 1].map((side) => {
              const x = 299 + side * 56;
              return (
                <g key={side}>
                  <rect x={x} y="176" width="48" height="74" rx="2" fill="url(#spp-glass)" stroke={structure} strokeWidth="1.4" />
                  <rect x={x} y="258" width="48" height="80" rx="2" fill={doorColour} stroke={structure} strokeWidth="1.4" />
                </g>
              );
            })}
            <path d="M351 168v178" stroke={structure} strokeWidth="2.5" />
            <circle cx="344" cy="258" r="3.5" fill={structure} />
            <circle cx="358" cy="258" r="3.5" fill={structure} />
          </>
        ) : (
          <>
            <rect x="316" y="176" width="80" height="170" rx="4" fill={doorColour} stroke={structure} strokeWidth="2.5" />
            <rect x="326" y="188" width="60" height="52" rx="2" fill="url(#spp-glass)" stroke={structure} strokeWidth="1.4" />
            <rect x="326" y="252" width="60" height="82" rx="2" fill={doorColour} stroke={structure} strokeOpacity="0.4" strokeWidth="1.4" />
            <rect x="330" y="272" width="6" height="24" rx="3" fill={structure} />
          </>
        )}
      </g>
    </svg>
  );
}
