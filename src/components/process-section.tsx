const steps = [
  {
    title: "Choose your style",
    body: "Start with Studio Shed, Garden Pod or Utility Shed.",
  },
  {
    title: "Pick your preferences",
    body: "Choose shape, colour and the upgrade ideas you want to talk through.",
  },
  {
    title: "Send your build",
    body: "Use the form to share your selection and how the space will be used.",
  },
  {
    title: "Talk through the quote",
    body: "Review the details, site notes and inclusions before anything moves ahead.",
  },
];

export function ProcessSection() {
  return (
    <section
      id="process"
      className="border-b border-[#24231f]/10 bg-[#eaf0dc]"
      aria-labelledby="process-heading"
    >
      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-[760px]">
          <p className="font-mono text-[11px] font-semibold tracking-[0.32em] text-[#59664f] uppercase">
            Simple process
          </p>
          <h2
            id="process-heading"
            className="mt-3 text-[34px] leading-tight font-semibold tracking-tight sm:text-[46px]"
          >
            From first idea to quote.
          </h2>
        </div>

        <ol className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="border border-[#24231f]/12 bg-[#fffaf2] p-5"
            >
              <p className="font-mono text-[32px] leading-none font-semibold text-[#6f8067]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-5 text-[18px] leading-tight font-semibold">
                {step.title}
              </h3>
              <p className="mt-3 text-[14px] leading-6 text-[#5f5b52]">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
