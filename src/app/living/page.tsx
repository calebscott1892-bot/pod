import { LivingEnquiry } from "@/components/living/living-enquiry";
import { LivingHero } from "@/components/living/living-hero";
import { LivingFitout, LivingOffering } from "@/components/living/living-sections";
import { BackToTop } from "@/components/shared/back-to-top";
import { Curve } from "@/components/shared/curve";
import { HowItWorks, type ProcessStep } from "@/components/shared/how-it-works";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";
import { sites } from "@/lib/site-config";

const processSteps: ProcessStep[] = [
  {
    title: "Browse the range",
    body: "Flooring, window furnishings, shelving and furniture chosen for compact spaces.",
    icon: "choose",
  },
  {
    title: "We measure & quote",
    body: "Send us your space; we spec and price it — supply only or fully installed.",
    icon: "customise",
  },
  {
    title: "Supply or install",
    body: "Delivered ready to fit, or our team installs the full fit-out for you.",
    icon: "delivery",
  },
  {
    title: "Enjoy your space",
    body: "A finished, functional room that feels like home.",
    icon: "movein",
  },
];

export default function LivingPage() {
  return (
    <>
      <SiteHeader site={sites.living} />
      <main id="main-content">
        <LivingHero />
        <LivingOffering />
        <Curve />
        <LivingFitout />
        <Curve flip />
        <HowItWorks
          title="From bare space to finished room."
          intro="One team for the fit-out — supply what you need, or have us install it end to end."
          steps={processSteps}
        />
        <LivingEnquiry />
      </main>
      <SiteFooter site={sites.living} />
      <BackToTop />
    </>
  );
}
