import { Reveal } from "@/components/shared/reveal";

export function BrandStatement() {
  return (
    <section className="section-dark" aria-labelledby="statement-heading">
      <div className="mx-auto w-full max-w-[900px] px-4 py-20 text-center sm:px-6 lg:py-28">
        <Reveal>
          <p
            id="statement-heading"
            className="font-script text-[38px] leading-[1.3] text-cream sm:text-[54px]"
          >
            Designed for the way you actually live.
          </p>
          <p className="mt-6 font-heading text-[13px] tracking-[0.12em] text-accent-soft uppercase">
            Not a shed, a lifestyle asset
          </p>
        </Reveal>
      </div>
    </section>
  );
}
