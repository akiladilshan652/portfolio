import { useReveal } from "@/hooks/use-reveal";
import Navbar from "@/components/portfolio/Navbar";
import ScrollProgress from "@/components/portfolio/ScrollProgress";
import CursorGlow from "@/components/portfolio/CursorGlow";
import FrameBackground from "@/components/portfolio/FrameBackground";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import Projects from "@/components/portfolio/Projects";
import VideoPortfolio from "@/components/portfolio/VideoPortfolio";
import Experience from "@/components/portfolio/Experience";
import Education from "@/components/portfolio/Education";
import Languages from "@/components/portfolio/Languages";
import Achievements from "@/components/portfolio/Achievements";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";

const Index = () => {
  useReveal();
  return (
    <main className="relative min-h-screen text-foreground overflow-x-hidden">
      <FrameBackground />
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <VideoPortfolio />
      <Experience />
      <Education />
      <Languages />
      <Achievements />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
