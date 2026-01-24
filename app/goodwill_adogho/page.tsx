import "./index.css";
import HeroSection from "@/components/about/HeroSection";
import BiographySection from "@/components/about/BiographySection";
import MinistrySection from "@/components/about/MinistrySection";
import MentorsSection from "@/components/about/MentorsSection";
import PublicationsSection from "@/components/about/PublicationsSection";
import MandateSection from "@/components/about/MandateSection";
import TimelineSection from "@/components/about/TimelineSection";
import ContactSection from "@/components/about/ContactSection";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const GoodwillAdogho = () => {
  return (
    <main className="overflow-hidden">
      <Navigation/>
      <HeroSection />
      <BiographySection />
      <MinistrySection />
      <TimelineSection />
      <MentorsSection />
      <PublicationsSection />
      <MandateSection />
      <ContactSection />
      <Footer/>
    </main>
  );
};

export default GoodwillAdogho;
