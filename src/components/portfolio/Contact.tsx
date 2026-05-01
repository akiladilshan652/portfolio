import { useState } from "react";
import { z } from "zod";
import { MessageCircle, Phone, Mail, Send, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import SectionHeading from "./SectionHeading";

const PHONE = "+94718919995";
const PHONE_DISPLAY = "+94 71 891 9995";
const WHATSAPP = "94718919995";
const EMAIL = "akaakilabinig@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/akila-bandara-9b0a56350";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Max 100 chars"),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(5, "Message too short").max(1000, "Max 1000 chars"),
});

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setSending(true);
    // Open user's mail client with prefilled draft
    const subject = encodeURIComponent(`Portfolio enquiry from ${result.data.name}`);
    const body = encodeURIComponent(
      `Name: ${result.data.name}\nEmail: ${result.data.email}\n\n${result.data.message}`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setSending(false);
      toast.success("Opening your email client…");
      setForm({ name: "", email: "", message: "" });
    }, 600);
  };

  const direct = [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: PHONE_DISPLAY,
      href: `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi Akila! Saw your portfolio.")}`,
      external: true,
    },
    { icon: Phone, label: "Call", value: PHONE_DISPLAY, href: `tel:${PHONE}` },
    { icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
    { icon: Linkedin, label: "LinkedIn", value: "akila-bandara", href: LINKEDIN, external: true },
  ];

  return (
    <section id="contact" className="relative py-28 md:py-36">
      <div className="container">
        <SectionHeading
          eyebrow="Contact"
          title="Let's make something."
          description="Available for video editing, freelance dev work, and remote collabs."
          align="center"
        />

        <div className="grid lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {/* Direct actions */}
          <div className="lg:col-span-2 grid gap-4 reveal">
            {direct.map((d) => (
              <a
                key={d.label}
                href={d.href}
                target={d.external ? "_blank" : undefined}
                rel={d.external ? "noreferrer" : undefined}
                className="group flex items-center gap-4 bg-gradient-card border border-border rounded-2xl p-5 hover-lift"
              >
                <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center text-primary-foreground shadow-glow-blue shrink-0">
                  <d.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-widest text-primary mb-0.5">
                    {d.label}
                  </div>
                  <div className="font-medium truncate">{d.value}</div>
                </div>
              </a>
            ))}
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 bg-gradient-card border border-border rounded-2xl p-6 md:p-8 reveal space-y-5"
          >
            <div>
              <label className="block text-sm font-medium mb-2">Your Name</label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Jane Doe"
                maxLength={100}
                className="bg-background/60 border-border h-12 rounded-xl"
              />
              {errors.name && <p className="text-xs text-destructive mt-1.5">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="jane@company.com"
                maxLength={255}
                className="bg-background/60 border-border h-12 rounded-xl"
              />
              {errors.email && <p className="text-xs text-destructive mt-1.5">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <Textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about your project…"
                maxLength={1000}
                rows={5}
                className="bg-background/60 border-border rounded-xl resize-none"
              />
              <div className="flex justify-between mt-1.5">
                <span className="text-xs text-destructive">{errors.message}</span>
                <span className="text-xs text-muted-foreground">{form.message.length}/1000</span>
              </div>
            </div>

            <Button type="submit" variant="hero" size="lg" disabled={sending} className="w-full">
              <Send /> {sending ? "Sending…" : "Send Email"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
