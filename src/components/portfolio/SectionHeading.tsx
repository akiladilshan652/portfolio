interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

const SectionHeading = ({ eyebrow, title, description, align = "left" }: Props) => {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""} mb-12 reveal`}>
      {eyebrow && (
        <div className={`inline-flex items-center gap-2 mb-4 ${align === "center" ? "justify-center" : ""}`}>
          <span className="h-px w-8 bg-gradient-primary" />
          <span className="text-xs font-medium tracking-[0.25em] uppercase text-primary">{eyebrow}</span>
        </div>
      )}
      <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{description}</p>
      )}
    </div>
  );
};

export default SectionHeading;
