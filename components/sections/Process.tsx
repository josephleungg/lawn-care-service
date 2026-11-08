import { PathDraw } from "@/components/motion/PathDraw";
import { Reveal } from "@/components/motion/Reveal";
import type { Dictionary } from "@/dictionaries";

import { SectionHeading } from "./SectionHeading";

export function Process({ dict }: { dict: Dictionary }) {
  const { process } = dict;

  return (
    <section id="process" className="shell relative z-10 bg-bone py-24 md:py-40">
      <SectionHeading
        className="mb-16 md:mb-24"
        eyebrow={process.eyebrow}
        title={process.title}
      />
      <PathDraw>
        <ol className="relative flex flex-col gap-16 md:gap-40 md:py-16">
          {process.steps.map((step, index) => (
            <li
              key={step.title}
              className={`max-w-md md:w-1/2 ${
                index % 2 === 1 ? "md:mr-[12%] md:ml-auto" : "md:ml-[12%]"
              }`}
            >
              <Reveal>
                <p className="display mb-2 text-6xl text-clay">{index + 1}</p>
                <h3 className="display mb-3 text-3xl md:text-4xl">
                  {step.title}
                </h3>
                <p className="text-lg leading-relaxed text-forest/85">
                  {step.body}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </PathDraw>
    </section>
  );
}
