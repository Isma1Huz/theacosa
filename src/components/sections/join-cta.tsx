import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

/**
 * Sitewide "Join us..." call-to-action band — shown just above the footer
 * on every page except Contact (which already ends in its own form).
 */
export function JoinCta({
  heading,
  ctaLabel,
  ctaHref = "/contact",
}: {
  heading: string;
  ctaLabel: string;
  ctaHref?: string;
}) {
  return (
    <section className="py-14 sm:py-20 bg-white">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-[var(--color-gold)] grid grid-cols-1 md:grid-cols-2 md:h-[22rem]">
            <div
              className="absolute -left-10 -bottom-10 h-52 w-52 rounded-full bg-[var(--color-gold-dark)]/30"
              aria-hidden="true"
            />
            <div className="relative flex flex-col justify-center p-8 sm:p-12 md:p-14 md:h-[22rem]">
              <h2 className="text-2xl sm:text-3xl lg:text-[2.1rem] font-extrabold leading-tight text-[var(--color-navy)] max-w-md">
                {heading}
              </h2>
              <Link
                href={ctaHref}
                className="mt-7 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--color-navy)] shadow-md transition-transform hover:-translate-y-0.5 self-start"
              >
                {ctaLabel}
              </Link>
            </div>
            <div className="relative h-56 md:h-[22rem]">
              <Image
                src="/images/cta/kids-laptop.png"
                alt="Two children smiling while using a laptop together"
                fill
                sizes="(max-width:768px) 100vw, 50vw"
                className="object-cover object-bottom"
              />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
