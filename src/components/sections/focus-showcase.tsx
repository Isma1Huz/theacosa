import Image from "next/image";

type Item = { title?: string; text: string };

/**
 * Full-bleed photo section with editorial copy on the left and stacked
 * glass "module" cards on the right — ported design-for-design from the
 * client's reference (the "Key Focus Areas" section on their wow-mom
 * site), re-themed to ACOSA's own navy/gold palette and fed ACOSA's own
 * copy and photography.
 */
export function FocusShowcase({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  listLabel,
  items,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  image: string;
  imageAlt: string;
  listLabel?: string;
  items: Item[];
}) {
  return (
    <section className="relative overflow-hidden">
      <Image src={image} alt={imageAlt} fill className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-navy)]/95 via-[var(--color-navy)]/80 to-[var(--color-navy)]/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)]/60 to-transparent" />

      <div className="relative mx-auto grid max-w-[var(--max-width)] items-center gap-14 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-20 lg:px-10">
        {/* left: editorial copy */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
            {eyebrow}
          </span>
          <h2 className="mt-5 max-w-md text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {title}
          </h2>
          {description && (
            <p className="mt-6 max-w-md text-[15px] font-light leading-relaxed text-white/75">
              {description}
            </p>
          )}
        </div>

        {/* right: stacked glass module cards */}
        <div>
          {listLabel && (
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
              {listLabel}
            </p>
          )}
          <div className="space-y-4">
            {items.slice(0, 5).map((it, i) => (
              <div
                key={it.title ?? it.text}
                className="group rounded-2xl border border-white/10 bg-white/[0.07] p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.13]"
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    {it.title ? (
                      <>
                        <h3 className="text-lg font-medium text-white">{it.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-white/70">{it.text}</p>
                      </>
                    ) : (
                      <p className="text-[15px] leading-relaxed text-white/90">{it.text}</p>
                    )}
                  </div>
                  <span className="mt-0.5 inline-flex shrink-0 items-center rounded-full border border-white/30 px-3.5 py-1 text-xs text-white/80 transition-colors duration-300 group-hover:border-[var(--color-gold)] group-hover:text-[var(--color-gold)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
