import solar from "@iconify-json/solar/icons.json";
import { getIconData, iconToHTML, iconToSVG } from "@iconify/utils";

type IconProps = { name: string; size?: number; className?: string };

export function Icon({ name, size = 20, className }: IconProps) {
  const data = getIconData(solar, name);
  if (!data) throw new Error(`Unknown Solar icon: ${name}`);

  const { attributes, body } = iconToSVG(data, { height: size, width: size });

  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 ${className ?? ""}`}
      dangerouslySetInnerHTML={{ __html: iconToHTML(body, attributes) }}
    />
  );
}
