import SectionHeading from "./SectionHeading";
import { Film, Figma, Database, FileSpreadsheet, Brain, MessageCircle, Camera } from "lucide-react";

const skills = [
  {
    icon: Film,
    name: "Video Editing",
    desc: "Adobe Premiere, After Effects — color, sound, motion. My primary craft.",
    primary: true,
  },
  { icon: Camera, name: "Adobe Lightroom", desc: "Photo editing, color grading, presets." },
  { icon: Figma, name: "Figma — UI/UX", desc: "Wireframes, prototypes, design systems." },
  { icon: FileSpreadsheet, name: "MS Office", desc: "Excel, Word, PowerPoint — power-user." },
  { icon: Database, name: "Database Mgmt", desc: "SQL, schema design, data ops." },
  { icon: Brain, name: "Critical Thinking", desc: "Problem decomposition, root-cause analysis." },
  { icon: MessageCircle, name: "Communication", desc: "Clear writing, async-friendly remote work." },
];

const Skills = () => {
  return (
    <section id="skills" className="relative py-28 md:py-36">
      <div className="container">
        <SectionHeading
          eyebrow="Skills"
          title="A toolkit for makers."
          description="Equal parts story, design, and engineering."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((s, i) => (
            <div
              key={s.name}
              className={`group relative rounded-2xl p-7 hover-lift reveal overflow-hidden ${
                s.primary
                  ? "bg-gradient-card border border-primary/40 shadow-glow-blue"
                  : "bg-gradient-card border border-border"
              }`}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {s.primary && (
                <div className="absolute top-4 right-4 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-gradient-primary text-primary-foreground">
                  Primary
                </div>
              )}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-glow pointer-events-none" />
              <div className={`inline-flex items-center justify-center h-12 w-12 rounded-xl mb-5 ${
                s.primary ? "bg-gradient-primary text-primary-foreground" : "bg-secondary text-primary"
              }`}>
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{s.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
