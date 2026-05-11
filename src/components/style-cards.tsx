const styles = [
  {
    title: "Studio Shed",
    body: "A composed room for focused work, beauty appointments, creative projects or a calm desk setup outside the house.",
    tone: "bg-[#d7e2c0]",
  },
  {
    title: "Garden Pod",
    body: "A light garden-facing room for reading, client work, slow weekends or a quiet place to reset.",
    tone: "bg-[#f6dddd]",
  },
  {
    title: "Utility Shed",
    body: "A practical shed for tools, bikes, garden gear and household overflow that still feels considered.",
    tone: "bg-[#cbdce0]",
  },
];

export function StyleCards() {
  return (
    <section
      id="styles"
      className="border-b border-[#24231f]/10 bg-[#fbf5ec]"
      aria-labelledby="styles-heading"
    >
      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-[760px]">
          <p className="font-mono text-[11px] font-semibold tracking-[0.32em] text-[#59664f] uppercase">
            Starting styles
          </p>
          <h2
            id="styles-heading"
            className="mt-3 text-[34px] leading-tight font-semibold tracking-tight sm:text-[46px]"
          >
            Three starting points.
          </h2>
          <p className="mt-4 text-[16px] leading-7 text-[#5f5b52]">
            Choose the closest fit, then shape the front, finish and options
            around the way the shed will be used.
          </p>
        </div>

        <div className="mt-9 grid gap-4 lg:grid-cols-3">
          {styles.map((style) => (
            <article
              key={style.title}
              className="border border-[#24231f]/12 bg-[#fffaf2] p-5"
            >
              <div className={`h-32 ${style.tone}`} aria-hidden="true">
                <div className="flex h-full items-end justify-end p-4">
                  <span className="h-14 w-28 border-[3px] border-[#59664f] bg-[#fffaf2] shadow-[12px_10px_0_0_rgba(36,35,31,0.08)]" />
                </div>
              </div>
              <h3 className="mt-5 text-[25px] leading-tight font-semibold tracking-tight">
                {style.title}
              </h3>
              <p className="mt-3 text-[15px] leading-7 text-[#5f5b52]">
                {style.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
