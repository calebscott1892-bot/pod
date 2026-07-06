import type { LifestyleCategory } from "./categories";

/**
 * Interior vignette for a lifestyle category, a furnished room scene rather
 * than the studio exterior, so each use (gym, office, retreat…) reads
 * distinctly. Placeholder illustration until Paul's photography lands; the
 * wall tint and accent come from the category data.
 */
export function CategoryScene({ category }: { category: LifestyleCategory }) {
  const olive = "var(--ss-olive)";
  return (
    <svg
      viewBox="0 0 300 330"
      role="img"
      aria-label={`Illustration of a ${category.name.toLowerCase()} interior`}
      className="absolute inset-0 h-full w-full"
    >
      {/* Room */}
      <rect width="300" height="330" fill={category.wall} />
      <circle cx="246" cy="58" r="66" fill={category.accent} opacity="0.16" />
      <rect x="200" y="46" width="64" height="146" rx="3" fill="#fbf4e8" stroke={olive} strokeWidth="3" />
      <path d="M232 46v146M200 119h64" stroke={olive} strokeWidth="2" opacity="0.35" />
      <rect y="248" width="300" height="82" fill="var(--ss-clay)" />
      <path d="M0 248h300" stroke={olive} strokeWidth="2" opacity="0.3" />
      <ellipse cx="135" cy="294" rx="118" ry="20" fill={category.accent} opacity="0.18" />

      <Furniture category={category} />
    </svg>
  );
}

function Furniture({ category }: { category: LifestyleCategory }) {
  const olive = "var(--ss-olive)";
  const warm = "#c79a68";
  const accent = category.accent;

  switch (category.icon) {
    case "gym":
      return (
        <g>
          {/* bench */}
          <rect x="64" y="212" width="96" height="12" rx="3" fill={warm} stroke={olive} strokeWidth="3" />
          <path d="M76 224v26M150 224v26" stroke={olive} strokeWidth="5" strokeLinecap="round" />
          {/* dumbbell */}
          <g fill="#b07f4f" stroke={olive} strokeWidth="2.5">
            <rect x="46" y="250" width="44" height="8" rx="2" />
            <rect x="42" y="244" width="10" height="20" rx="3" />
            <rect x="84" y="244" width="10" height="20" rx="3" />
          </g>
          {/* kettlebell */}
          <path d="M210 234q14-16 28 0" fill="none" stroke={olive} strokeWidth="5" strokeLinecap="round" />
          <circle cx="224" cy="250" r="15" fill={warm} stroke={olive} strokeWidth="3" />
        </g>
      );
    case "office":
      return (
        <g>
          {/* wall shelf with books */}
          <rect x="40" y="120" width="66" height="8" rx="2" fill={warm} />
          <g fill={accent}>
            <rect x="48" y="100" width="8" height="20" />
            <rect x="59" y="104" width="8" height="16" />
            <rect x="71" y="98" width="8" height="22" />
          </g>
          {/* desk */}
          <rect x="56" y="210" width="150" height="10" rx="2" fill={warm} stroke={olive} strokeWidth="2.5" />
          <path d="M64 220v28M198 220v28" stroke={olive} strokeWidth="5" strokeLinecap="round" />
          {/* monitor */}
          <rect x="150" y="176" width="48" height="32" rx="2" fill="#3a342e" />
          <path d="M174 208v8M162 220h24" stroke={olive} strokeWidth="3" strokeLinecap="round" />
          {/* chair, side-on */}
          <rect x="88" y="224" width="34" height="7" rx="2" fill={warm} stroke={olive} strokeWidth="2" />
          <rect x="88" y="198" width="7" height="33" rx="2" fill={warm} stroke={olive} strokeWidth="2" />
          <path d="M92 231v17M118 231v17" stroke={olive} strokeWidth="4" strokeLinecap="round" />
        </g>
      );
    case "creative":
      return (
        <g>
          {/* easel */}
          <path d="M120 250 150 152 180 250" fill="none" stroke={olive} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M150 152v66" stroke={olive} strokeWidth="4" />
          <rect x="120" y="168" width="60" height="56" rx="2" fill="#fbf4e8" stroke={olive} strokeWidth="3" />
          <path d="M130 210q14-30 40-16" stroke={accent} strokeWidth="5" fill="none" strokeLinecap="round" />
          {/* brush jar */}
          <rect x="52" y="228" width="20" height="22" rx="2" fill={warm} stroke={olive} strokeWidth="2.5" />
          <path d="M58 228v-16M64 228v-20M70 228v-13" stroke={accent} strokeWidth="3" strokeLinecap="round" />
          {/* stool */}
          <rect x="206" y="224" width="34" height="7" rx="2" fill={warm} stroke={olive} strokeWidth="2" />
          <path d="M210 231v18M236 231v18" stroke={olive} strokeWidth="4" strokeLinecap="round" />
        </g>
      );
    case "craft":
      return (
        <g>
          {/* pegboard */}
          <rect x="36" y="64" width="78" height="66" rx="3" fill="#e8d6c2" stroke={olive} strokeWidth="3" />
          <g fill={olive} opacity="0.35">
            {[50, 66, 82, 98].map((x) =>
              [78, 94, 110].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" />),
            )}
          </g>
          <path d="M58 76v24" stroke={olive} strokeWidth="3" strokeLinecap="round" />
          <path d="M86 76l14 12-14 8z" fill={accent} />
          {/* worktable */}
          <rect x="60" y="210" width="160" height="10" rx="2" fill={warm} stroke={olive} strokeWidth="2.5" />
          <path d="M70 220v28M210 220v28" stroke={olive} strokeWidth="5" strokeLinecap="round" />
          {/* spools + box on table */}
          <g fill={accent} stroke={olive} strokeWidth="2">
            <circle cx="108" cy="203" r="7" />
            <circle cx="128" cy="203" r="7" />
          </g>
          <rect x="158" y="196" width="20" height="14" rx="2" fill={warm} stroke={olive} strokeWidth="2" />
        </g>
      );
    case "wellness":
      return (
        <g>
          {/* pendant light */}
          <path d="M150 40v44" stroke={olive} strokeWidth="2.5" />
          <path d="M138 84h24l-5 15h-14z" fill={warm} stroke={olive} strokeWidth="2" strokeLinejoin="round" />
          {/* rolled mat */}
          <rect x="52" y="196" width="18" height="52" rx="9" fill={accent} stroke={olive} strokeWidth="2" />
          {/* flat mat */}
          <rect x="84" y="250" width="124" height="9" rx="4" fill={accent} opacity="0.55" />
          {/* floor cushion */}
          <rect x="118" y="230" width="46" height="20" rx="7" fill={warm} stroke={olive} strokeWidth="2.5" />
          {/* plant */}
          <path d="M232 248v-28" stroke={olive} strokeWidth="3" />
          <path d="M232 222c-12-4-16-18-12-30 12 4 16 18 12 30Z" fill="var(--ss-sage)" />
          <path d="M232 224c12-5 17-20 13-32-12 5-17 20-13 32Z" fill="var(--ss-eucalyptus)" />
          <path d="M222 248h20l-3 16h-14z" fill="var(--ss-clay)" stroke={olive} strokeWidth="2" strokeLinejoin="round" />
        </g>
      );
    case "cabana":
      return (
        <g>
          {/* string lights */}
          <path d="M18 42q70 34 140 24T288 46" fill="none" stroke={olive} strokeWidth="2" opacity="0.5" />
          <g fill={accent}>
            <circle cx="62" cy="54" r="4" />
            <circle cx="112" cy="60" r="4" />
            <circle cx="170" cy="59" r="4" />
            <circle cx="228" cy="52" r="4" />
          </g>
          {/* sun lounger */}
          <path d="M74 240 150 240 186 210" fill="none" stroke={warm} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M74 240 150 240 186 210" fill="none" stroke={olive} strokeWidth="2" opacity="0.45" />
          <path d="M80 248v-10M150 248v-8" stroke={olive} strokeWidth="4" strokeLinecap="round" />
          <g stroke={accent} strokeWidth="3" opacity="0.7" strokeLinecap="round">
            <path d="M104 234v12M126 234v12" />
          </g>
          {/* side table + drink */}
          <rect x="206" y="232" width="34" height="8" rx="2" fill={warm} stroke={olive} strokeWidth="2" />
          <path d="M214 240v12M232 240v12" stroke={olive} strokeWidth="3" strokeLinecap="round" />
          <rect x="216" y="214" width="13" height="18" rx="2" fill={accent} opacity="0.75" stroke={olive} strokeWidth="2" />
        </g>
      );
  }
}
