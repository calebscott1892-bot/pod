import { DeliverySection } from "@/components/studios/delivery-section";
import { StudioJourney } from "@/components/studios/studio-journey";
import { StudiosBenefits } from "@/components/studios/studios-benefits";
import { StudiosFaq } from "@/components/studios/studios-faq";
import { StudiosHero } from "@/components/studios/studios-hero";
import { StudiosProof } from "@/components/studios/studios-proof";
import { StudiosShell } from "@/components/studios/studios-shell";
import { BackToTop } from "@/components/shared/back-to-top";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";
import { sites } from "@/lib/site-config";

export default function StudiosPage() {
  return (
    <>
      <SiteHeader site={sites.studios} />
      <main id="main-content">
        <StudiosHero />
        <StudiosProof />
        <StudiosBenefits />
        <StudiosShell />
        <StudioJourney />
        <DeliverySection />
        <StudiosFaq />
      </main>
      <SiteFooter site={sites.studios} />
      <BackToTop />
    </>
  );
}
