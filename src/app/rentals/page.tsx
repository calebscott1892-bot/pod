import { BrandStatement } from "@/components/rentals/brand-statement";
import { DayJourney } from "@/components/rentals/day-journey";
import { EnquiryForm } from "@/components/rentals/enquiry-form";
import { LifestyleCategories } from "@/components/rentals/lifestyle-categories";
import { LifestyleStrip } from "@/components/rentals/lifestyle-strip";
import { RentalsHero } from "@/components/rentals/rentals-hero";
import { ServiceArea } from "@/components/rentals/service-area";
import { BackToTop } from "@/components/shared/back-to-top";
import { Curve } from "@/components/shared/curve";
import { HowItWorks, type ProcessStep } from "@/components/shared/how-it-works";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";
import { sites } from "@/lib/site-config";

const processSteps: ProcessStep[] = [
  {
    title: "Choose your style",
    body: "Browse our range of purpose-designed spaces and pick the one that fits your life.",
    icon: "choose",
  },
  {
    title: "We handle delivery",
    body: "Crane or flat delivery, we assess your site via Google Earth beforehand.",
    icon: "delivery",
  },
  {
    title: "Professional installation",
    body: "Our team installs everything. You just enjoy it.",
    icon: "install",
  },
  {
    title: "Move in",
    body: "Fully finished, weather-tight and ready to use, delivered and installed.",
    icon: "movein",
  },
];

export default function RentalsPage() {
  return (
    <>
      <SiteHeader site={sites.rentals} />
      <main id="main-content">
        <RentalsHero />
        <LifestyleCategories />
        <DayJourney />
        <HowItWorks
          title="From first look to move-in day."
          intro="A considered process with one team from start to finish, no subcontractors, no surprises."
          steps={processSteps}
        />
        <Curve />
        <LifestyleStrip />
        <Curve flip />
        <ServiceArea />
        <BrandStatement />
        <EnquiryForm />
      </main>
      <SiteFooter site={sites.rentals} />
      <BackToTop />
    </>
  );
}
