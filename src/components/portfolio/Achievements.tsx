import SectionHeading from "./SectionHeading";
import { Trophy, Film, Camera, Palette, Dumbbell } from "lucide-react";

const achievements = [
  "Rugby — school & club level",
  "Basketball — competitive team play",
  "Athletics — track & field",
  "Arts & Essay competitions — multiple participations",
];

const interests = [
  { icon: Film, label: "Video Editing" },
  { icon: Camera, label: "Photography" },
  { icon: Palette, label: "Digital Designing" },
  { icon: Dumbbell, label: "Fitness" },
];

const Achievements = () => (
  <section id="achievements" className="relative py-28 md:py-36">
    <div className="container">
      <SectionHeading
        eyebrow="Achievements & Hobbies"
        title="Beyond the keyboard."
      />

      <div className="grid lg:grid-cols-2 gap-6 max-w-5xl">
        <div className="bg-gradient-card border border-border rounded-2xl p-7 reveal">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center text-primary-foreground shadow-glow-blue">
              <Trophy className="h-5 w-5" />
            </div>
            <h3 className="font-display text-xl font-semibold">Achievements</h3>
          </div>
          <ul className="space-y-3">
            {achievements.map((a) => (
              <li key={a} className="flex items-start gap-3 text-muted-foreground">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shadow-glow-blue shrink-0" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gradient-card border border-border rounded-2xl p-7 reveal">
          <h3 className="font-display text-xl font-semibold mb-5">Interests</h3>
          <div className="grid grid-cols-2 gap-3">
            {interests.map((it) => (
              <div
                key={it.label}
                className="group flex items-center gap-3 rounded-xl bg-secondary/50 border border-border p-4 hover-lift"
              >
                <it.icon className="h-5 w-5 text-primary" />
                <span className="font-medium text-sm">{it.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Achievements;
