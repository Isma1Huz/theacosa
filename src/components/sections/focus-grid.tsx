import Image from "next/image";
import type { LucideIcon } from "lucide-react";

export type FocusGridItem = {
  icon: LucideIcon;
  title: string;
  image: string;
  imageAlt: string;
};

/**
 * Static card-grid version of the wow-mom "How We Get Things Done" module —
 * same visual language (full-bleed photo card, white icon badge, large
 * number, title pinned to the bottom) but laid out as a plain grid (4 cols
 * on the first row, remaining items wrapping to a second row) instead of
 * the original's hover-to-expand slider, and with no buttons/description
 * text — just the full list of points at a glance.
 */
export function FocusGrid({
  eyebrow,
  title,
  description,
  items,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  items: FocusGridItem[];
}) {
  return (
    <section className="section-y bg-white">
      <div className="mx-auto max-w-[var(--max-width)] px-5 sm:px-8 lg:px-10">
        {(eyebrow || title) && (
          <div className="mx-auto max-w-2xl text-center">
            {eyebrow && (
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold-dark)]">
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[var(--color-navy)]">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-[var(--color-muted)] leading-relaxed">{description}</p>
            )}
          </div>
        )}

        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {items.map((it, i) => (
            <div
              key={it.title}
              className="group relative flex min-h-[15rem] sm:min-h-[17rem] flex-col justify-between overflow-hidden rounded-3xl p-5 sm:p-6 ring-1 ring-black/5 shadow-sm"
            >
              <Image
                src={it.image}
                alt={it.imageAlt}
                fill
                sizes="(max-width:1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)]/95 via-[var(--color-navy)]/55 to-[var(--color-navy)]/30" />

              <div className="relative flex items-start justify-between gap-4">
                <span className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[var(--color-navy)] shadow-md">
                  <it.icon size={20} />
                </span>
                <span className="text-5xl sm:text-6xl font-semibold leading-none text-white/20">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="relative text-base sm:text-lg font-medium text-white leading-snug">
                {it.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
