import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-10 mt-10">
    <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <div>
        © {new Date().getFullYear()}{" "}
        <span className="font-display font-semibold gradient-text">Akila Wijesooriya</span>. Built with care.
      </div>
      <div className="flex items-center gap-4">
        <a href="https://github.com/akilabandara2002" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-foreground transition-colors">
          <Github className="h-4 w-4" />
        </a>
        <a href="https://www.linkedin.com/in/akila-bandara-9b0a56350" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-foreground transition-colors">
          <Linkedin className="h-4 w-4" />
        </a>
        <a href="mailto:akaakilabinig@gmail.com" aria-label="Email" className="hover:text-foreground transition-colors">
          <Mail className="h-4 w-4" />
        </a>
        <span className="text-xs uppercase tracking-widest">IT · Video · Design</span>
      </div>
    </div>
  </footer>
);

export default Footer;
