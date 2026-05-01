import SectionHeading from "./SectionHeading";
import { GraduationCap, Code, Film, Sparkles } from "lucide-react";

const About = () => {
  const stats = [
    { icon: GraduationCap, label: "BSc IT @ SLIIT", sub: "Undergraduate" },
    { icon: Film, label: "Video Editing", sub: "Primary craft" },
    { icon: Code, label: "Software Dev", sub: "UI/UX + Code" },
    { icon: Sparkles, label: "Remote Role", sub: "🇦🇺 Australia" },
  ];

  return (
    <section id="about" className="relative py-28 md:py-36">
      <div className="container grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7">
          <SectionHeading eyebrow="About Me" title="Crafting code, cutting frames." />
          <div className="space-y-5 text-muted-foreground text-lg leading-relaxed reveal">
            <p>
              I'm <span className="text-foreground font-medium">Akila Wijesooriya</span> from{" "}
              <span className="text-foreground">Kurunegala, Sri Lanka</span> — a highly motivated
              IT undergraduate with a strong foundation in{" "}
              <span className="text-foreground">software development</span>,{" "}
              <span className="text-foreground">database management</span>, and{" "}
              <span className="text-foreground">UI/UX design</span>.
            </p>
            <p>
              Passionate about technology and problem-solving, with hands-on experience in{" "}
              <span className="gradient-text font-semibold">Figma</span> and{" "}
              <span className="gradient-text font-semibold">video editing</span>. A quick learner
              with diplomas in IT and Human Resource Management, eager to gain industry experience.
            </p>
            <p>
              Known for adaptability, teamwork, and a strong work ethic — currently working
              remotely as a Data Operational Technical Assistant for an Australian company.
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 grid grid-cols-2 gap-4 reveal">
          {stats.map((s, i) => (
            <div
              key={i}
              className="group relative bg-gradient-card border border-border rounded-2xl p-5 hover-lift overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-glow pointer-events-none" />
              <s.icon className="h-7 w-7 text-primary mb-3" />
              <div className="font-display font-semibold text-foreground">{s.label}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
