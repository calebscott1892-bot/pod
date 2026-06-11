import { DeliverySection } from "@/components/studios/delivery-section";
import { StudioJourney } from "@/components/studios/studio-journey";
import { StudiosFaq } from "@/components/studios/studios-faq";
import { StudiosHero } from "@/components/studios/studios-hero";
import { StudiosShell } from "@/components/studios/studios-shell";
import { Curve } from "@/components/shared/curve";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";
import { sites } from "@/lib/site-config";

export default function StudiosPage() {
  return (
    <>
      <SiteHeader site={sites.studios} />
      <main>
        <StudiosHero />
        <StudiosShell />
        <StudioJourney />
        <Curve />
        <DeliverySection />
        <Curve flip />
        <StudiosFaq />
      </main>
      <SiteFooter site={sites.studios} />
    </>
  );
}
