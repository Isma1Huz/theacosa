import Image from "next/image";
import { Link } from "@/i18n/navigation";

/**
 * Dark rounded CTA card with copy + two buttons on the left and a large
 * circular photo bleeding off the right edge — ported design-for-design
 * from the client's wow-mom reference ("Get Involved in Creating
 * Child-Friendly Cities"), re-themed to ACOSA's navy/gold palette and fed
 * ACOSA's own copy and photography.
 */
export function CircleCta({
  title,
  highlight,
  subtitle,
  primary,
  secondary,
  image,
  imageAlt,
}: {
  title: string;
  highlight?: string;
  subtitle?: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  image: string;
  imageAlt: string;
}) {
  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="mx-auto max-w-[var(--max-width)] px-5 sm:px-8 lg:px-10">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[var(--color-navy-light)] via-[var(--color-navy)] to-[var(--color-navy)] shadow-xl">
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[var(--color-gold)]/20 blur-3xl"
          />

          <div className="grid items-center lg:grid-cols-[1fr_400px]">
            {/* left: text + buttons */}
            <div className="relative p-8 sm:p-12">
              <h2 className="max-w-xl text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
                {title}{" "}
                {highlight && <span className="font-light text-[var(--color-gold)]">{highlight}</span>}
              </h2>
              {subtitle && (
                <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-white/75">
                  {subtitle}
                </p>
              )}
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href={primary.href}
                  className="inline-flex items-center justify-center rounded-full bg-[var(--color-gold)] px-7 py-3 text-sm font-semibold text-[var(--color-navy)] transition-colors hover:bg-[var(--color-gold-dark)]"
                >
                  {primary.label}
                </Link>
                <Link
                  href={secondary.href}
                  className="inline-flex items-center justify-center rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[var(--color-navy)]"
                >
                  {secondary.label}
                </Link>
              </div>
            </div>

            {/* right: circular image bleeding off the card edge */}
            <div className="relative hidden h-full min-h-[280px] lg:block">
              <div className="absolute -right-20 top-1/2 h-[400px] w-[400px] -translate-y-1/2 overflow-hidden rounded-full shadow-xl ring-8 ring-white/10">
                <Image src={image} alt={imageAlt} fill className="object-cover" sizes="400px" />
              </div>
            </div>

            {/* mobile: image strip below text */}
            <div className="relative h-48 w-full overflow-hidden lg:hidden">
              <Image src={image} alt={imageAlt} fill className="object-cover" sizes="100vw" />
              <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-navy)]/60 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
