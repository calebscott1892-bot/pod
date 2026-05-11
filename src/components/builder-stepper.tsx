export type BuilderStep = "style" | "shape" | "colour" | "upgrades" | "review";

export const builderSteps: { id: BuilderStep; label: string }[] = [
  { id: "style", label: "Style" },
  { id: "shape", label: "Shape" },
  { id: "colour", label: "Colour" },
  { id: "upgrades", label: "Upgrades" },
  { id: "review", label: "Review" },
];

type Props = {
  activeStep: BuilderStep;
  onStepChange: (step: BuilderStep) => void;
};

export function BuilderStepper({ activeStep, onStepChange }: Props) {
  return (
    <nav aria-label="Builder steps">
      <ol className="grid grid-cols-5 overflow-hidden border border-[#24231f]/12 bg-[#fffaf2] shadow-[0_18px_48px_-42px_rgba(36,35,31,0.45)]">
        {builderSteps.map((step, index) => {
          const isActive = step.id === activeStep;

          return (
            <li
              key={step.id}
              className="min-w-0 border-r border-[#24231f]/10 last:border-r-0"
            >
              <button
                type="button"
                aria-current={isActive ? "step" : undefined}
                onClick={() => onStepChange(step.id)}
                className={`flex min-h-14 w-full flex-col items-center justify-center gap-1 px-1 text-center transition focus:ring-2 focus:ring-inset focus:ring-[#6f8067] focus:outline-none sm:min-h-16 ${
                  isActive
                    ? "bg-[#eaf0dc] text-[#24231f] shadow-[inset_0_4px_0_0_#59664f]"
                    : "bg-[#fffaf2] text-[#24231f]/55 hover:bg-[#f8eadf]"
                }`}
              >
                <span className="font-mono text-[10px] font-semibold tracking-[0.12em]">
                  {index + 1}
                </span>
                <span className="text-[11px] font-semibold sm:text-[13px]">
                  {step.label}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
