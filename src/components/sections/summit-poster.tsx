import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import type { SummitPage } from "@/lib/cms/types";

/**
 * The "2nd Africa Child Online Safety Summit 2025" promotional poster
 * section, retained from the live site's design: solid orange background,
 * an Africa-silhouette pattern, three circular photo cutouts, and the full
 * list of supporting/partner organizations. All text from the original
 * section — heading, body copy, and every partner name — is preserved;
 * only the surrounding page content around it has been modernized.
 */
export function SummitPoster({ summit }: { summit: SummitPage }) {
  const images = summit.images.length >= 3 ? summit.images : [...summit.images, ...summit.images, ...summit.images].slice(0, 3);

  return (
    <section className="relative overflow-hidden bg-[var(--color-gold-dark)] py-16 sm:py-20">
      {/* Africa-shape dot pattern, echoing the ACOSA continent motif */}
      <div
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1.5px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
        aria-hidden="true"
      />
      <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-white/10" aria-hidden="true" />
      <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-black/10" aria-hidden="true" />

      <div className="relative mx-auto px-5 sm:px-8 lg:px-10" style={{ maxWidth: "var(--max-width)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <div>
            <Reveal>
              <span className="inline-block rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold-dark)]">
                {summit.poster.eyebrow}
              </span>
              <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold leading-tight text-white">
                {summit.poster.heading}
              </h2>
              <p className="mt-4 max-w-xl text-white/90 leading-relaxed">{summit.poster.body}</p>
            </Reveal>

            <Reveal delay={0.15} className="mt-9">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">
                {summit.poster.supportedByLabel}
              </p>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
                {summit.poster.partners.map((p) => (
                  <span
                    key={p}
                    className="rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Three circular photo cutouts */}
          <Reveal from="right" delay={0.1} className="relative mx-auto grid h-72 w-72 sm:h-80 sm:w-80 place-items-center">
            <div className="absolute h-full w-full rounded-full border-2 border-dashed border-white/30" aria-hidden="true" />
            <div className="relative h-40 w-40 sm:h-44 sm:w-44 overflow-hidden rounded-full border-4 border-white shadow-xl">
              <Image src={images[0].url} alt={images[0].alt} fill sizes="176px" className="object-cover" />
            </div>
            <div className="absolute -left-2 top-2 h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-full border-4 border-white shadow-xl">
              <Image src={images[1].url} alt={images[1].alt} fill sizes="112px" className="object-cover" />
            </div>
            <div className="absolute -right-3 bottom-3 h-28 w-28 sm:h-32 sm:w-32 overflow-hidden rounded-full border-4 border-white shadow-xl">
              <Image src={images[2].url} alt={images[2].alt} fill sizes="128px" className="object-cover" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
