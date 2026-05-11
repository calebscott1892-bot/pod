function RoofMark() {
  return (
    <span
      className="grid size-10 place-items-center border border-[#59664f]/20 bg-[#fffaf2] shadow-[0_12px_30px_-24px_rgba(36,35,31,0.5)]"
      aria-hidden="true"
    >
      <svg
        width="25"
        height="18"
        viewBox="0 0 25 18"
        fill="none"
        role="img"
      >
        <path d="M5.5 8.8V16H19.5V8.8" fill="#d7e2c0" opacity="0.55" />
        <path
          d="M2 9.5 12.5 2 23 9.5"
          stroke="#59664f"
          strokeWidth="1.6"
          strokeLinecap="square"
        />
        <path
          d="M5.5 8.8V16H19.5V8.8"
          stroke="#24231f"
          strokeWidth="1.3"
          strokeLinecap="square"
        />
      </svg>
    </span>
  );
}

export function SiteHeader() {
  const navItems = [
    { href: "#builder", label: "Builder" },
    { href: "#styles", label: "Styles" },
    { href: "#uses", label: "Uses" },
    { href: "#gallery", label: "Gallery" },
    { href: "#quote", label: "Quote" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-[#24231f]/10 bg-[#fbf5ec]/92 backdrop-blur">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <a
          href="#top"
          className="flex items-center gap-3 focus:ring-2 focus:ring-[#6f8067] focus:ring-offset-2 focus:ring-offset-[#fbf5ec] focus:outline-none"
          aria-label="Space Sheds home"
        >
          <RoofMark />
          <span className="font-mono text-[13px] font-semibold tracking-[0.24em] whitespace-nowrap text-[#24231f] uppercase">
            Space Sheds
          </span>
        </a>

        <nav
          className="hidden items-center gap-6 lg:flex"
          aria-label="Main sections"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-mono text-[11px] tracking-[0.2em] text-[#24231f]/55 uppercase transition hover:text-[#24231f]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#quote"
          className="inline-flex min-h-10 shrink-0 items-center justify-center bg-[#b8c7a3] px-4 font-mono text-[10px] font-semibold tracking-[0.18em] whitespace-nowrap text-[#24231f] uppercase transition hover:bg-[#d7e2c0] focus:ring-2 focus:ring-[#6f8067] focus:ring-offset-2 focus:ring-offset-[#fbf5ec] focus:outline-none sm:px-5"
        >
          Request a Quote
        </a>
      </div>
    </header>
  );
}
