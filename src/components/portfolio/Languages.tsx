import SectionHeading from "./SectionHeading";
import { Languages as LangIcon } from "lucide-react";

const langs = [
  { name: "English", level: "Proficient", value: 85 },
  { name: "Sinhala", level: "Fluent (Native)", value: 100 },
];

const Languages = () => (
  <section id="languages" className="relative py-28 md:py-36">
    <div className="container max-w-4xl">
      <SectionHeading eyebrow="Languages" title="How I communicate." />
      <div className="grid sm:grid-cols-2 gap-5">
        {langs.map((l, i) => (
          <div
            key={l.name}
            className="group relative bg-gradient-card border border-border rounded-2xl p-6 hover-lift reveal overflow-hidden"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-glow pointer-events-none" />
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center text-primary-foreground shadow-glow-blue">
                <LangIcon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-display text-lg font-semibold">{l.name}</div>
                <div className="text-xs uppercase tracking-widest text-primary">{l.level}</div>
              </div>
            </div>
            <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full bg-gradient-primary shadow-glow-blue transition-all duration-700"
                style={{ width: `${l.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Languages;
