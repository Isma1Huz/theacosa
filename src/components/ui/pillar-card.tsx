import { Icon, type IconName } from "@/components/ui/icon";
import { Reveal } from "@/components/motion/reveal";
import { clsx } from "clsx";

export function PillarCard({
  icon,
  title,
  text,
  index = 0,
  tone = "light",
}: {
  icon: string;
  title: string;
  text: string;
  index?: number;
  tone?: "light" | "dark";
}) {
  return (
    <Reveal delay={index * 0.08} className="h-full">
      <div
        className={clsx(
          "group h-full rounded-2xl p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1.5",
          tone === "light"
            ? "bg-[var(--color-cream)] hover:bg-white hover:shadow-xl"
            : "bg-[var(--color-navy)]/70 backdrop-blur-sm border border-white/15 hover:bg-[var(--color-navy)]/85 shadow-lg"
        )}
      >
        <div
          className={clsx(
            "flex h-12 w-12 items-center justify-center rounded-xl mb-5 transition-colors",
            tone === "light"
              ? "bg-[var(--color-navy)] text-[var(--color-gold)] group-hover:bg-[var(--color-gold)] group-hover:text-[var(--color-navy)]"
              : "bg-[var(--color-gold)] text-[var(--color-navy)]"
          )}
        >
          <Icon name={icon as IconName} className="w-6 h-6" />
        </div>
        <h3
          className={clsx(
            "text-lg font-bold mb-2",
            tone === "light" ? "text-[var(--color-navy)]" : "text-white"
          )}
        >
          {title}
        </h3>
        <p className={clsx("text-sm leading-relaxed", tone === "light" ? "text-[var(--color-muted)]" : "text-white/70")}>
          {text}
        </p>
      </div>
    </Reveal>
  );
}
