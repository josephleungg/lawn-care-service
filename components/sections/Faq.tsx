import { Icon } from "@/components/Icon";
import type { Dictionary } from "@/dictionaries";

import { SectionHeading } from "./SectionHeading";

export function Faq({ dict }: { dict: Dictionary }) {
  const { faq } = dict;

  return (
    <section
      id="faq"
      className="shell relative z-10 grid gap-10 bg-bone pb-24 md:pb-40 lg:grid-cols-[2fr_3fr]"
    >
      <SectionHeading eyebrow={faq.eyebrow} title={faq.title} />
      <div>
        {faq.items.map((item) => (
          <details key={item.question} className="border-t border-forest/20">
            <summary className="flex items-center justify-between gap-4 py-5 text-xl">
              {item.question}
              <Icon name="add-circle-linear" size={24} className="faq-mark" />
            </summary>
            <p className="max-w-2xl pb-6 text-lg leading-relaxed text-forest/85">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
