import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "videos", label: "Videos" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "achievements", label: "More" },
  { id: "contact", label: "Contact" },
];

const Navbar = () => {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const offset = window.innerHeight * 0.35;
      let current = "home";
      for (const l of links) {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top <= offset) current = l.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <div className="container">
        <nav
          className={cn(
            "flex items-center justify-between rounded-full px-5 py-3 transition-all duration-500",
            scrolled ? "glass shadow-elegant" : "bg-transparent"
          )}
        >
          <button
            onClick={() => go("home")}
            className="font-display font-bold text-lg tracking-tight"
          >
            <span className="gradient-text">AKILA</span>
            <span className="text-foreground">.W</span>
          </button>

          <ul className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => go(l.id)}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors rounded-full",
                    active === l.id
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {l.label}
                  {active === l.id && (
                    <span className="absolute inset-0 -z-10 rounded-full bg-gradient-primary opacity-20" />
                  )}
                  {active === l.id && (
                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-primary shadow-glow-blue" />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-full glass"
            aria-label="Menu"
          >
            <div className="space-y-1.5">
              <span className={cn("block h-0.5 w-5 bg-foreground transition-transform", open && "translate-y-2 rotate-45")} />
              <span className={cn("block h-0.5 w-5 bg-foreground transition-opacity", open && "opacity-0")} />
              <span className={cn("block h-0.5 w-5 bg-foreground transition-transform", open && "-translate-y-2 -rotate-45")} />
            </div>
          </button>
        </nav>

        {open && (
          <div className="lg:hidden mt-3 glass rounded-3xl p-4 animate-fade-in">
            <ul className="grid gap-1">
              {links.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => go(l.id)}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-2xl text-sm font-medium transition-colors",
                      active === l.id ? "bg-primary/15 text-foreground" : "text-muted-foreground hover:bg-secondary"
                    )}
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
