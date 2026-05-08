import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { ParticleHero } from "@/components/ParticleHero";
import { HowItWorks } from "@/components/HowItWorks";
import { WhyCdres } from "@/components/WhyCdres";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { WhatsAppWidget } from "@/components/WhatsAppWidget";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <ParticleHero />
        <HowItWorks />
        <WhyCdres />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppWidget />
    </>
  );
}
