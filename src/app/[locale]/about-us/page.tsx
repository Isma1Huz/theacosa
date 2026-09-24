import Image from "next/image";
import { getAboutPage } from "@/lib/cms/fetch";
import type { AppLocale } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { PillarCard } from "@/components/ui/pillar-card";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/sections/page-hero";
import { MembersGrid } from "@/components/ui/members-grid";
import { JoinCta } from "@/components/sections/join-cta";
import { FocusShowcase } from "@/components/sections/focus-showcase";
import { AfricanBlobAccent, AfricanPattern } from "@/components/ui/african-pattern";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return { title: locale === "fr" ? "À propos" : "About Us" };
}

export default async function AboutUsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const about = await getAboutPage(locale as AppLocale);

  return (
    <>
      <PageHero
        eyebrow={about.intro.heading}
        title={about.story.heading}
        subtitle={about.story.subheading}
        image={{ url: "/images/summit/large-group-photo.jpg", alt: "ACOSA delegates" }}
      />

      {/* Who we are / Mission / Vision */}
      <section className="section-y bg-white relative overflow-hidden">
        <AfricanBlobAccent className="absolute -left-20 -top-20 w-64 h-64 pointer-events-none" />
        <Container className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Reveal from="left" className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
            <Image src={about.intro.image.url} alt={about.intro.image.alt} fill sizes="(max-width:1024px) 100vw, 560px" className="object-cover" />
          </Reveal>
          <div className="space-y-8">
            <Reveal>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold-dark)]">{about.intro.heading}</span>
              <h2 className="mt-2 text-3xl font-extrabold text-[var(--color-navy)]">{about.whoWeAre.heading}</h2>
              <p className="mt-3 text-[var(--color-muted)] leading-relaxed">{about.whoWeAre.body}</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="text-3xl font-extrabold text-[var(--color-navy)]">{about.intro.missionHeading}</h2>
              <p className="mt-3 text-[var(--color-muted)] leading-relaxed">{about.intro.missionText}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-3xl font-extrabold text-[var(--color-navy)]">{about.intro.visionHeading}</h2>
              <p className="mt-3 text-[var(--color-muted)] leading-relaxed">{about.intro.visionText}</p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Our story */}
      <section className="section-y bg-[var(--color-cream)] relative overflow-hidden">
        <AfricanBlobAccent className="absolute -right-24 top-1/3 w-72 h-72 pointer-events-none" />
        <Container className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
            <div className="lg:col-span-2">
              <SectionHeading eyebrow={about.story.subheading} title={about.story.heading} />
              {(() => {
                const marker = "This landmark event";
                const idx = about.story.body.indexOf(marker);
                const first = idx > -1 ? about.story.body.slice(0, idx).trim() : about.story.body;
                const second = idx > -1 ? about.story.body.slice(idx).trim() : "";
                return (
                  <>
                    <Reveal delay={0.1}>
                      <p className="mt-5 text-[var(--color-muted)] leading-relaxed">{first}</p>
                    </Reveal>
                    {second && (
                      <Reveal delay={0.15}>
                        <p className="mt-4 text-[var(--color-muted)] leading-relaxed">{second}</p>
                      </Reveal>
                    )}
                  </>
                );
              })()}
              <Reveal delay={0.25}>
                <Button href={about.story.cta.href} variant="primary" className="mt-8">
                  {about.story.cta.label}
                </Button>
              </Reveal>
            </div>
            <Reveal from="right" delay={0.15} className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={about.whoWeAre.image?.url ?? "https://theacosa.com/wp-content/uploads/2025/07/group-young-african-friends-with-facemasks-using-their-phones-park_11zon-scaled.jpg"}
                alt={about.whoWeAre.image?.alt ?? "Young African friends together in a park"}
                fill
                sizes="(max-width:1024px) 100vw, 400px"
                className="object-cover"
              />
            </Reveal>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {about.story.pillars.map((p, i) => (
              <PillarCard key={p.title} icon={p.icon} title={p.title} text={p.text} index={i} />
            ))}
          </div>
          <div className="mt-14">
            <AfricanPattern className="w-full h-6 mb-8 opacity-70" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold-dark)] text-center mb-6">
              {locale === "fr" ? "Membres" : "Members"}
            </p>
            {about.story.members && <MembersGrid members={about.story.members} marquee />}
          </div>
        </Container>
      </section>

      <section className="section-y relative overflow-hidden bg-[var(--color-navy)]">
        <div className="absolute inset-0">
          <Image
            src={about.whoWeAre.pillarsBackgroundImage?.url ?? "https://theacosa.com/wp-content/uploads/2025/01/A01A1395-scaled.jpg"}
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-[0.14]"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-navy)] via-[var(--color-navy)]/95 to-[var(--color-navy)]" />
        </div>
        <AfricanBlobAccent className="absolute -right-16 -top-16 w-56 h-56 pointer-events-none" />
        <Container className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {about.whoWeAre.pillars.map((p, i) => (
              <PillarCard key={p.title} icon={p.icon} title={p.title} text={p.text} index={i} tone="dark" />
            ))}
          </div>
          <Reveal delay={0.2}>
            <p className="mt-12 max-w-3xl mx-auto text-center text-white/85 leading-relaxed text-lg">
              {about.whoWeAre.whyBody}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Core values */}
      <FocusShowcase
        eyebrow={locale === "fr" ? "Ce qui nous guide" : "What guides us"}
        title={about.coreValues.heading}
        image={about.coreValues.image.url}
        imageAlt={about.coreValues.image.alt}
        listLabel={locale === "fr" ? "Valeurs" : "Our values"}
        items={about.coreValues.values.slice(0, 5).map((v) => ({ title: v.title, text: v.text }))}
      />

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
