import { useState } from "react";
import { ExternalLink, Github, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "./SectionHeading";

type Project = {
  title: string;
  desc: string;
  tags: string[];
  progress?: number;
  link?: string;
  github?: string;
};

const GITHUB = "https://github.com/akilabandara2002";

const ongoing: Project[] = [
  {
    title: "Personal Portfolio v2",
    desc: "This very site — scroll-controlled hero, neon design system, motion-first.",
    tags: ["React", "Tailwind", "Motion"],
    progress: 85,
    github: GITHUB,
  },
  {
    title: "Data Ops Dashboard",
    desc: "Internal analytics dashboard for the Australian remote team. Live data, dark UI.",
    tags: ["Next.js", "PostgreSQL", "Charts"],
    progress: 60,
  },
  {
    title: "SLIIT Group Project",
    desc: "Full-stack academic project — auth, role-based dashboards, REST API.",
    tags: ["Node", "MongoDB", "React"],
    progress: 45,
    github: GITHUB,
  },
];

const completed: Project[] = [
  {
    title: "SLIIT Web & Mobile Projects",
    desc: "Coursework projects covering full-stack web apps and mobile UI builds.",
    tags: ["React", "Java", "Android"],
    github: GITHUB,
  },
  {
    title: "ESOFT IT Project",
    desc: "Diploma capstone — application development with database integration.",
    tags: ["PHP", "MySQL", "Bootstrap"],
    github: GITHUB,
  },
  {
    title: "HRM Project",
    desc: "Human Resource Management diploma project — processes, policies and reporting.",
    tags: ["HRM", "Reports", "Documentation"],
  },
  {
    title: "Short Film — Edit & Color",
    desc: "Editing, color grading and sound design for a student short.",
    tags: ["Premiere Pro", "DaVinci"],
    link: "#videos",
  },
];

const Card = ({ p, ongoing }: { p: Project; ongoing?: boolean }) => (
  <div className="group relative bg-gradient-card border border-border rounded-2xl p-6 hover-lift overflow-hidden flex flex-col">
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-glow pointer-events-none" />
    {ongoing && (
      <div className="inline-flex items-center gap-2 self-start mb-4 text-[10px] font-semibold tracking-widest uppercase text-primary">
        <Loader2 className="h-3 w-3 animate-spin" /> In progress
      </div>
    )}
    <h3 className="font-display text-xl font-semibold mb-2">{p.title}</h3>
    <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">{p.desc}</p>

    {ongoing && typeof p.progress === "number" && (
      <div className="mb-5">
        <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
          <span>Progress</span>
          <span className="text-foreground font-medium">{p.progress}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full bg-gradient-primary shadow-glow-blue transition-all duration-700"
            style={{ width: `${p.progress}%` }}
          />
        </div>
      </div>
    )}

    <div className="flex flex-wrap gap-2 mb-5">
      {p.tags.map((t) => (
        <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-secondary text-muted-foreground border border-border">
          {t}
        </span>
      ))}
    </div>

    <div className="flex gap-2">
      {p.link && (
        <Button variant="glow" size="sm" asChild>
          <a href={p.link}><ExternalLink /> View</a>
        </Button>
      )}
      {p.github && (
        <Button variant="outline" size="sm" asChild>
          <a href={p.github} target="_blank" rel="noreferrer"><Github /> GitHub</a>
        </Button>
      )}
    </div>
  </div>
);

const Projects = () => {
  const [tab, setTab] = useState<"ongoing" | "completed">("ongoing");
  const list = tab === "ongoing" ? ongoing : completed;

  return (
    <section id="projects" className="relative py-28 md:py-36">
      <div className="container">
        <SectionHeading
          eyebrow="Projects"
          title="Things I'm building & have shipped."
        />

        <div className="reveal inline-flex p-1.5 rounded-full glass mb-10">
          {(["ongoing", "completed"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative px-5 py-2.5 text-sm font-medium rounded-full transition-all ${
                tab === t ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab === t && (
                <span className="absolute inset-0 rounded-full bg-gradient-primary shadow-glow-blue" />
              )}
              <span className="relative">
                {t === "ongoing" ? "Working On" : "Completed"}
              </span>
            </button>
          ))}
        </div>

        <div key={tab} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 animate-fade-in-up">
          {list.map((p) => (
            <Card key={p.title} p={p} ongoing={tab === "ongoing"} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
