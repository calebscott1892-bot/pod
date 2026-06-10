import { DeliverySection } from "@/components/studios/delivery-section";
import { StudiosFaq } from "@/components/studios/studios-faq";
import { StudiosHero } from "@/components/studios/studios-hero";
import { StudiosShell } from "@/components/studios/studios-shell";
import { HowItWorks, type ProcessStep } from "@/components/shared/how-it-works";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";
import { sites } from "@/lib/site-config";

const processSteps: ProcessStep[] = [
  {
    title: "Choose your design",
    body: "Seven signature styles, one premium shell — start with the one that fits your life.",
    icon: "choose",
  },
  {
    title: "Customise your space",
    body: "Windows, doors and cladding, your way. Watch the price update as you build.",
    icon: "customise",
  },
  {
    title: "We deliver & install",
    body: "13 weeks from order. We assess your site via Google Earth for crane requirements.",
    icon: "delivery",
  },
  {
    title: "Move in",
    body: "Fully finished, weather-tight and ready to live in from day one.",
    icon: "movein",
  },
];

export default function StudiosPage() {
  return (
    <>
      <SiteHeader site={sites.studios} />
      <main>
        <StudiosHero />
        <StudiosShell />
        <HowItWorks
          title="From style to studio."
          intro="Order online in minutes — then we take care of the build, the logistics and the installation."
          steps={processSteps}
        />
        <DeliverySection />
        <StudiosFaq />
      </main>
      <SiteFooter site={sites.studios} />
    </>
  );
}
