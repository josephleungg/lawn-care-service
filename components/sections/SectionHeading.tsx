import { RevealText } from "@/components/motion/RevealText";

export function SectionHeading({
  eyebrow,
  title,
  className = "",
  eyebrowClassName = "text-clay",
}: {
  eyebrow: string;
  title: string;
  className?: string;
  eyebrowClassName?: string;
}) {
  return (
    <div className={className}>
      <p className={`eyebrow mb-4 ${eyebrowClassName}`}>{eyebrow}</p>
      <RevealText>
        <h2 className="display text-4xl md:text-7xl">{title}</h2>
      </RevealText>
    </div>
  );
}
