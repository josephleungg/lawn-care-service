import { RevealText } from "@/components/motion/RevealText";

export function Statement({ text }: { text: string }) {
  return (
    <section className="shell py-24 md:py-44">
      <RevealText mode="scrub">
        <h2 className="display max-w-6xl text-4xl md:text-7xl">{text}</h2>
      </RevealText>
    </section>
  );
}
