import HeroSection from "@/components/about/HeroSection";
import BiographySection from "@/components/about/BiographySection";
import MinistrySection from "@/components/about/MinistrySection";
import MentorsSection from "@/components/about/MentorsSection";
import PublicationsSection from "@/components/about/PublicationsSection";
import MandateSection from "@/components/about/MandateSection";
import TimelineSection from "@/components/about/TimelineSection";
import ContactSection from "@/components/about/ContactSection";

const Index = () => {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <BiographySection />
      <MinistrySection />
      <TimelineSection />
      <MentorsSection />
      <PublicationsSection />
      <MandateSection />
      <ContactSection />
    </main>
  );
};

export default Index;
