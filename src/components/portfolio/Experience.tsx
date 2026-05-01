import { Briefcase, MapPin } from "lucide-react";
import SectionHeading from "./SectionHeading";

const Experience = () => {
  const items = [
    {
      role: "Data Operational Technical Assistant",
      company: "Remote · Australian Company",
      period: "Present",
      desc: "Supporting daily data operations, building internal tools, and maintaining data pipelines for an Australian team — fully remote from Sri Lanka.",
    },
  ];

  return (
    <section id="experience" className="relative py-28 md:py-36">
      <div className="container">
        <SectionHeading eyebrow="Experience" title="Where I work." />

        <div className="relative max-w-3xl reveal">
          {/* Timeline rail */}
          <div className="absolute left-4 md:left-6 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-accent to-transparent" />

          {items.map((it, i) => (
            <div key={i} className="relative pl-14 md:pl-20 pb-10 last:pb-0">
              <div className="absolute left-0 md:left-2 top-1 h-9 w-9 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow-blue">
                <Briefcase className="h-4 w-4 text-primary-foreground" />
              </div>

              <div className="bg-gradient-card border border-border rounded-2xl p-6 hover-lift">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-1">
                  <h3 className="font-display text-xl font-semibold">{it.role}</h3>
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                    {it.period}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <MapPin className="h-3.5 w-3.5" /> {it.company}
                </div>
                <p className="text-muted-foreground leading-relaxed">{it.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
