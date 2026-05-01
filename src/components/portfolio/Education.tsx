import { GraduationCap } from "lucide-react";
import SectionHeading from "./SectionHeading";

const items = [
  { school: "SLIIT", program: "BSc (Hons) in Information Technology", note: "Undergraduate" },
  { school: "ESOFT Metro Campus", program: "Diploma in IT & Diploma in English", note: "Completed" },
  { school: "IMBS Green Campus", program: "Diploma in Human Resource Management", note: "Completed" },
  { school: "St. Anne's College, Kurunegala", program: "G.C.E. O/L & A/L (Commerce)", note: "Completed" },
];

const Education = () => {
  return (
    <section id="education" className="relative py-28 md:py-36">
      <div className="container">
        <SectionHeading eyebrow="Education" title="Where I learn." />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((it, i) => (
            <div
              key={i}
              className="group relative bg-gradient-card border border-border rounded-2xl p-7 hover-lift reveal overflow-hidden"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-glow pointer-events-none" />
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground mb-5 shadow-glow-blue">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div className="text-xs uppercase tracking-widest text-primary mb-1.5">{it.note}</div>
              <h3 className="font-display text-2xl font-bold mb-1">{it.school}</h3>
              <p className="text-muted-foreground">{it.program}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
