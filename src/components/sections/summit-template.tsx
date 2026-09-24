import Image from "next/image";
import type { AppLocale } from "@/i18n/routing";
import type { SummitPage } from "@/lib/cms/types";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Icon, type IconName } from "@/components/ui/icon";
import { Reveal } from "@/components/motion/reveal";
import { SummitPoster } from "@/components/sections/summit-poster";
import { JoinCta } from "@/components/sections/join-cta";
import { AfricanBlobAccent } from "@/components/ui/african-pattern";
import { StaticCta } from "@/components/ui/static-cta";

/**
 * Shared ACOSA Summit page layout, reused for every edition (2027, 2025,
 * 2024, ...). Each `/acosa-summit/<year>` route just supplies its own
 * `SummitPage` data object — the design stays identical across editions.
 */
export function SummitTemplate({ summit, locale }: { summit: SummitPage; locale: AppLocale }) {
  return (
    <>
      {/* HERO — photo + stat ribbon, modeled on the summit design reference */}
      <section className="relative overflow-hidden bg-[var(--color-navy)]">
        <div className="absolute inset-0">
          <Image
            src={summit.images[0].url}
            alt={summit.images[0].alt}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, var(--color-navy) 0%, rgba(11,35,64,0.85) 28%, rgba(11,35,64,0.55) 48%, rgba(11,35,64,0.2) 70%, rgba(11,35,64,0.06) 100%)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)]/55 via-transparent to-transparent" />
        </div>
        <Container className="relative py-24 sm:py-32">
          <Reveal>
            <span className="inline-block rounded-full bg-[var(--color-gold)] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-navy)]">
              {summit.heading}
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 max-w-3xl text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] text-white">
              {summit.edition}
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 max-w-2xl text-lg text-white/80 leading-relaxed">{summit.theme}</p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-wrap gap-4">
              {summit.ctaStatic ? (
                <StaticCta label={summit.cta.label} email={summit.ctaEmail} variant="primary" />
              ) : (
                <Button href={summit.cta.href} variant="primary">
                  {summit.cta.label}
                </Button>
              )}
            </div>
          </Reveal>
        </Container>

        {/* stat / info ribbon */}
        <div className="relative border-t border-white/10 bg-white/5 backdrop-blur">
          <Container className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-white/10 py-6">
            <Reveal className="flex items-center gap-3 py-3 sm:py-0 sm:pr-8">
              <Icon name="launch" className="w-6 h-6 text-[var(--color-gold)]" />
              <div>
                <p className="text-xs uppercase tracking-wide text-white/60">
                  {locale === "fr" ? "Dates" : "Dates"}
                </p>
                <p className="font-bold text-white">{summit.dates}</p>
              </div>
            </Reveal>
            <Reveal delay={0.08} className="flex items-center gap-3 py-3 sm:py-0 sm:pl-8">
              <Icon name="pin" className="w-6 h-6 text-[var(--color-gold)]" />
              <div>
                <p className="text-xs uppercase tracking-wide text-white/60">
                  {locale === "fr" ? "Lieu" : "Location"}
                </p>
                <p className="font-bold text-white">{summit.location}</p>
              </div>
            </Reveal>
          </Container>
        </div>
      </section>

      {/* AUDIENCE ROW — modernized as a card grid instead of a plain icon+label row */}
      <section className="relative overflow-hidden bg-white py-14 sm:py-16 border-b border-black/5">
        <AfricanBlobAccent className="absolute -left-16 -bottom-16 w-56 h-56 pointer-events-none" />
        <Container className="relative">
          <Reveal>
            <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold-dark)] mb-8">
              {locale === "fr" ? "Qui participe" : "Who it's for"}
            </p>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
            {summit.audience.map((a, i) => {
              const icons: IconName[] = ["shield", "monitor", "advocacy", "education", "research"];
              return (
                <Reveal
                  key={a}
                  delay={i * 0.06}
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-black/5 bg-[var(--color-cream)] px-4 py-7 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--color-navy)] hover:shadow-xl"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[var(--color-green)] transition-colors duration-300 group-hover:bg-[var(--color-gold)] group-hover:text-[var(--color-navy)]">
                    <Icon name={icons[i % icons.length]} className="w-5 h-5" />
                  </span>
                  <span className="text-sm font-semibold text-[var(--color-navy)] leading-snug transition-colors duration-300 group-hover:text-white">
                    {a}
                  </span>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <SummitPoster summit={summit} />

      {/* ABOUT — 2-col with pull quote card, matching reference layout */}
      <section className="section-y bg-[var(--color-cream)] relative overflow-hidden">
        <AfricanBlobAccent className="absolute -left-20 -bottom-20 w-64 h-64 pointer-events-none" />
        <Container className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading eyebrow="About the summit" title={locale === "fr" ? "Un sommet porté par l'Afrique" : "An Africa-led platform"} />
            <Reveal delay={0.1}>
              <p className="mt-5 text-[var(--color-muted)] leading-relaxed">{summit.about}</p>
            </Reveal>
          </div>
          <Reveal from="right" delay={0.1} className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image src={summit.images[1].url} alt={summit.images[1].alt} fill sizes="(max-width:1024px) 100vw, 560px" className="object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 max-w-[15rem] rounded-2xl bg-[var(--color-navy)] p-5 shadow-xl hidden sm:block">
              <Icon name="advocacy" className="w-6 h-6 text-[var(--color-gold)] mb-2" />
              <p className="text-sm text-white/85 leading-snug">{summit.legacyNote}</p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* TWO DEFINING QUESTIONS style grid — objectives + activities */}
      <section className="section-y bg-white">
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Reveal className="rounded-3xl bg-[var(--color-cream)] p-8 sm:p-10">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold-dark)]">
              01 · {locale === "fr" ? "Objectifs" : "Objectives"}
            </span>
            <ul className="mt-5 space-y-4">
              {summit.objectives.map((o) => (
                <li key={o} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--color-green)]" />
                  <span className="text-[var(--color-navy)] font-medium">{o}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="rounded-3xl bg-[var(--color-navy)] p-8 sm:p-10">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">
              02 · {locale === "fr" ? "Activités clés" : "Key activities"}
            </span>
            <ul className="mt-5 space-y-5">
              {summit.activities.map((a) => (
                <li key={a.text} className="flex items-start gap-3.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[var(--color-gold)]">
                    <Icon name={a.icon as IconName} className="w-5 h-5" />
                  </span>
                  <span className="text-white/85 pt-1.5">{a.text}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* CONTACT / GET INVOLVED band */}
      <section className="section-y bg-[var(--color-gold)]">
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-navy)]">
              {locale === "fr" ? "Impliquez-vous dans le Sommet ACOSA" : "Get involved in the ACOSA Summit"}
            </h2>
            {summit.ctaStatic ? (
              <StaticCta label={summit.cta.label} email={summit.ctaEmail} variant="outline" className="mt-6" />
            ) : (
              <Button href={summit.cta.href} variant="outline" className="mt-6 border-[var(--color-navy)] text-[var(--color-navy)] hover:bg-[var(--color-navy)] hover:text-white">
                {summit.cta.label}
              </Button>
            )}
          </Reveal>
          <Reveal delay={0.1} className="rounded-2xl bg-[var(--color-navy)] p-7 sm:p-8">
            <p className="text-sm font-bold uppercase tracking-wide text-[var(--color-gold)]">{summit.contact.name}</p>
            <div className="mt-4 space-y-2.5 text-sm text-white/85">
              <p className="flex items-center gap-2.5">
                <Icon name="mail" className="w-4 h-4 text-[var(--color-gold)]" />
                <a href={`mailto:${summit.contact.email}`} className="hover:text-white">{summit.contact.email}</a>
              </p>
              <p className="flex items-center gap-2.5">
                <Icon name="phone" className="w-4 h-4 text-[var(--color-gold)]" />
                <a href={`tel:${summit.contact.phone.replace(/\s+/g, "")}`} className="hover:text-white">{summit.contact.phone}</a>
              </p>
              <p className="flex items-start gap-2.5">
                <Icon name="pin" className="w-4 h-4 mt-0.5 text-[var(--color-gold)] shrink-0" />
                <span>{summit.contact.address}</span>
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <JoinCta
        heading={
          locale === "fr"
            ? "Rejoignez-nous pour bâtir un avenir numérique plus sûr pour les enfants d'Afrique."
            : "Join us in building a safer digital future for Africa's children."
        }
        ctaLabel={locale === "fr" ? "Contactez-nous" : "Get in touch"}
      />
    </>
  );
}
