import { Film } from "lucide-react";
import SectionHeading from "./SectionHeading";

type Reel = {
  title: string;
  category: string;
  gradient: string;
};

const reels: Reel[] = [
  { title: "Cinematic Eye Open", category: "Short Film · Color", gradient: "from-primary/40 via-accent/30 to-background" },
  { title: "Kinetic Brand Reel", category: "After Effects", gradient: "from-accent/40 via-primary/30 to-background" },
  { title: "Travel Edit", category: "Premiere Pro", gradient: "from-primary/30 via-accent/40 to-background" },
  { title: "Music Video Cut", category: "Music · Sync", gradient: "from-accent/50 via-primary/20 to-background" },
  { title: "Product Teaser", category: "Commercial", gradient: "from-primary/50 via-accent/20 to-background" },
  { title: "Documentary Trailer", category: "Storytelling", gradient: "from-accent/30 via-primary/40 to-background" },
];

const Tile = ({ reel }: { reel: Reel }) => (
  <div className="group relative aspect-video rounded-2xl overflow-hidden bg-secondary border border-border hover-lift">
    <div className={`absolute inset-0 bg-gradient-to-br ${reel.gradient}`} />
    <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-700"
         style={{ backgroundImage: "radial-gradient(circle at 30% 30%, hsl(var(--primary) / 0.5), transparent 60%)" }} />
    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

    <div className="absolute top-4 left-4 text-[10px] font-semibold tracking-widest uppercase text-primary bg-background/70 backdrop-blur-sm px-2.5 py-1 rounded-full border border-primary/30">
      {reel.category}
    </div>

    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-16 w-16 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow-blue scale-90 group-hover:scale-100 transition-transform duration-500">
        <Film className="h-7 w-7 text-primary-foreground" />
      </div>
    </div>

    <div className="absolute bottom-4 left-4 right-4">
      <div className="font-display text-lg font-semibold">{reel.title}</div>
      <div className="text-xs text-muted-foreground mt-0.5">Coming soon</div>
    </div>
  </div>
);

const VideoPortfolio = () => {
  return (
    <section id="videos" className="relative py-28 md:py-36">
      <div className="container">
        <SectionHeading
          eyebrow="Video Editing Portfolio"
          title="Where pacing meets pixels."
          description="A selection of edits, reels and motion pieces — uploads coming soon."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 reveal">
          {reels.map((r) => (
            <Tile key={r.title} reel={r} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoPortfolio;
