import { clsx } from "clsx";
import { Reveal } from "@/components/motion/reveal";

export function SectionHeading({
  eyebrow,
  title,
  align = "left",
  light = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={clsx(align === "center" && "text-center", className)}>
      {eyebrow && (
        <span
          className={clsx(
            "inline-block text-xs font-bold uppercase tracking-[0.2em]",
            light ? "text-[var(--color-gold)]" : "text-[var(--color-gold-dark)]"
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={clsx(
          "mt-3 text-3xl sm:text-4xl font-extrabold leading-tight",
          light ? "text-white" : "text-[var(--color-navy)]"
        )}
      >
        {title}
      </h2>
    </Reveal>
  );
}
