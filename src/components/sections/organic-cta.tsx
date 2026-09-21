import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import type { LinkField } from "@/lib/cms/types";

/**
 * Bottom-of-page CTA band modeled on the organic-curve orange banner
 * reference: a blob-shaped orange panel on the left carrying the heading
 * and CTA button, with a photo bleeding in from the right behind a curved
 * boundary. The curve is drawn with an SVG blob mask so it scales cleanly
 * at any width instead of being baked into an image.
 */
export function OrganicCta({
  heading,
  cta,
  image,
}: {
  heading: string;
  cta: LinkField;
  image?: { url: string; alt: string };
}) {
  const photo =
    image ?? {
      url: "https://theacosa.com/wp-content/uploads/2025/07/full-shot-african-kids-with-laptop_11zon-scaled.jpg",
      alt: "African children using a laptop together",
    };

  return (
    <section className="section-y bg-white">
      <div className="mx-auto px-5 sm:px-8 lg:px-10" style={{ maxWidth: "var(--max-width)" }}>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[var(--color-gold)] min-h-[22rem] sm:min-h-[26rem]">
            {/* Photo bleeding in from the right, clipped to an organic curve */}
            <div
              className="absolute inset-y-0 right-0 w-[70%] sm:w-[62%] lg:w-[56%]"
              style={{
                clipPath:
                  "path('M120,0 C40,60 0,160 30,260 C55,340 140,360 220,400 L1000,400 L1000,0 Z')",
              }}
            >
              <div className="relative h-full w-full">
                <Image src={photo.url} alt={photo.alt} fill sizes="(max-width:1024px) 100vw, 60vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-gold)]/40 via-transparent to-transparent" />
              </div>
            </div>

            {/* Decorative organic blob accents */}
            <div
              className="absolute -left-16 -bottom-20 h-64 w-64 rounded-full bg-[var(--color-gold-dark)]/25"
              aria-hidden="true"
            />
            <div
              className="absolute left-1/3 -top-16 h-40 w-40 rounded-full bg-white/10"
              aria-hidden="true"
            />

            <div className="relative z-10 flex h-full max-w-md flex-col justify-center gap-6 p-8 sm:p-12 lg:p-14">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight text-[var(--color-navy)]">
                {heading}
              </h2>
              <div>
                <Button
                  href={cta.href}
                  variant="primary"
                  className="bg-white text-[var(--color-navy)] hover:bg-[var(--color-navy)] hover:text-white"
                >
                  {cta.label}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
