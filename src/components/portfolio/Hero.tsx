import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Hero is now a transparent overlay sitting on top of the global
 * scroll-driven FrameBackground. No internal video / canvas logic here.
 */
const Hero = () => {
  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center"
    >
      <div className="container relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6 animate-fade-in">
            <span className="h-2 w-2 rounded-full bg-primary shadow-glow-blue animate-pulse" />
            <span className="text-xs font-medium tracking-wider uppercase text-muted-foreground">
              Available for projects
            </span>
          </div>

          <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] mb-5 animate-fade-in-up">
            Hi, I'm <span className="gradient-text glow-text">Akila</span>
          </h1>

          <p
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mb-10 animate-fade-in-up"
            style={{ animationDelay: "120ms" }}
          >
            IT Undergraduate <span className="text-primary">·</span> Video Editor{" "}
            <span className="text-primary">·</span> Tech Enthusiast
          </p>

          <div
            className="flex flex-wrap gap-4 animate-fade-in-up"
            style={{ animationDelay: "180ms" }}
          >
            <Button variant="hero" size="xl" onClick={() => go("projects")}>
              View Projects <ArrowRight />
            </Button>
            <Button variant="glow" size="xl" onClick={() => go("contact")}>
              <Mail /> Contact Me
            </Button>
          </div>

          <div
            className="mt-14 flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-muted-foreground animate-fade-in"
            style={{ animationDelay: "500ms" }}
          >
            <div className="h-px w-12 bg-gradient-to-r from-primary to-transparent" />
            Scroll to play
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
