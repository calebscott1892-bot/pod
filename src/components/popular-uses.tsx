const uses = [
  {
    title: "Home office",
    body: "A separate desk space for calls, focus time and closing the door at the end of the day.",
  },
  {
    title: "Beauty or treatment room",
    body: "A private garden-side room for clients, prep space and the equipment you need close by.",
  },
  {
    title: "Creative studio",
    body: "Room for making, styling, painting, sewing or packing orders without packing down each night.",
  },
  {
    title: "Garden retreat",
    body: "A quiet spot for reading, planning, tea, music or a little time away from the main house.",
  },
  {
    title: "Storage",
    body: "A better-looking place for bikes, tools, garden gear and the things that need a home.",
  },
  {
    title: "Hobby or workshop space",
    body: "A practical setup for hands-on projects, supplies, repairs or weekend work.",
  },
];

export function PopularUses() {
  return (
    <section
      id="uses"
      className="border-b border-[#24231f]/10 bg-[#fffaf2]"
      aria-labelledby="uses-heading"
    >
      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.42fr_1fr] lg:items-start">
          <div>
            <p className="font-mono text-[11px] font-semibold tracking-[0.32em] text-[#59664f] uppercase">
              Popular uses
            </p>
            <h2
              id="uses-heading"
              className="mt-3 text-[34px] leading-tight font-semibold tracking-tight sm:text-[46px]"
            >
              Extra room that feels considered.
            </h2>
            <p className="mt-4 text-[16px] leading-7 text-[#5f5b52]">
              A shed can be useful without feeling harsh. Start with the room
              you need, then choose the finish around it.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden border border-[#24231f]/10 bg-[#24231f]/10 sm:grid-cols-2">
            {uses.map((use) => (
              <article key={use.title} className="bg-[#fbf5ec] p-5">
                <div
                  className="mb-5 h-1.5 w-14 bg-[#b8c7a3]"
                  aria-hidden="true"
                />
                <h3 className="text-[21px] leading-tight font-semibold tracking-tight">
                  {use.title}
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-[#5f5b52]">
                  {use.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
