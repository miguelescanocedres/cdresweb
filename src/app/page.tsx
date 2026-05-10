// Barra de navegacion con links a secciones: Servicios, Proceso, Nosotros
import { Navbar } from "@/components/Navbar";
// Hero animado con efecto splash/particulas canvas al mover el mouse
import { HeroSplash } from "@/components/HeroSplash";
// Grid de servicios ofrecidos con iconos SVG y descripciones
import { Services } from "@/components/Services";
// Seccion 3D scroll con animacion de frames de video
import { ScrollAnimation3D } from "@/components/ScrollAnimation3D";
// Hero secundario que renderiza texto como animacion de particulas (respeta prefers-reduced-motion)
import { ParticleHero } from "@/components/ParticleHero";
// Seccion paso a paso del proceso: Diagnostico → Implementacion → ...
import { HowItWorks } from "@/components/HowItWorks";
// Seccion de diferenciadores: velocidad, no-code, ROI, etc.
import { WhyCdres } from "@/components/WhyCdres";
// Call-to-action con fondo oscuro, grid overlay y elementos animados
import { CTASection } from "@/components/CTASection";
// Footer minimal con logo, copyright dinamico y links de navegacion
import { Footer } from "@/components/Footer";
// Boton flotante de WhatsApp que abre conversacion pre-llenada
import { WhatsAppWidget } from "@/components/WhatsAppWidget";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSplash />
        <Services />
        <ScrollAnimation3D />
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
