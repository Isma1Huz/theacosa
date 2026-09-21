import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { PillarCard } from "@/components/ui/pillar-card";
import { Reveal } from "@/components/motion/reveal";
import { Icon } from "@/components/ui/icon";
import { getHomePage } from "@/lib/cms/fetch";
import type { AppLocale } from "@/i18n/routing";
import { TestimonialCarousel } from "@/components/sections/testimonial-carousel";
import { HeroSlider } from "@/components/sections/hero-slider";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ui" });
  return { title: locale === "fr" ? "Accueil" : "Home", description: t("getInTouch") };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const home = await getHomePage(locale as AppLocale);

  return (
    <>
      <HeroSlider slides={home.hero.slides} />

      {/* EXECUTIVE SECRETARY'S ADDRESS */}
      <section className="section-y bg-white">
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Reveal from="left" className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg translate-y-6">
              <Image src={home.execSecretary.images[0].url} alt={home.execSecretary.images[0].alt} fill sizes="240px" className="object-cover" />
            </div>
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
              <Image src={home.execSecretary.images[1].url} alt={home.execSecretary.images[1].alt} fill sizes="240px" className="object-cover" />
            </div>
          </Reveal>
          <div>
            <SectionHeading eyebrow="ACOSA" title={home.execSecretary.heading} />
            <Reveal delay={0.1}>
              <p className="mt-5 text-[var(--color-muted)] leading-relaxed">{home.execSecretary.body}</p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* WHO WE ARE + PILLARS */}
      <section className="section-y bg-[var(--color-cream)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center mb-12">
            <div className="lg:col-span-2">
              <SectionHeading eyebrow="Who we are" title={home.whoWeAre.heading} />
              <Reveal delay={0.1}>
                <p className="mt-5 text-[var(--color-muted)] leading-relaxed max-w-2xl">{home.whoWeAre.body}</p>
              </Reveal>
              <Reveal delay={0.15} className="mt-7">
                <Button href={home.whoWeAre.cta.href} variant="outline">
                  {home.whoWeAre.cta.label}
                </Button>
              </Reveal>
            </div>
            <Reveal from="right" delay={0.1} className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={home.whoWeAre.image?.url ?? "https://theacosa.com/wp-content/uploads/2025/01/IMG-20241124-WA0020-1024x768.jpg"}
                alt={home.whoWeAre.image?.alt ?? "ACOSA members at a summit session"}
                fill
                sizes="(max-width:1024px) 100vw, 420px"
                className="object-cover"
              />
            </Reveal>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {home.whoWeAre.pillars.map((p, i) => (
              <PillarCard key={p.title} icon={p.icon} title={p.title} text={p.text} index={i} />
            ))}
          </div>
        </Container>
      </section>

      {/* WHY ACOSA */}
      <section className="section-y bg-[var(--color-navy)] relative overflow-hidden">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[var(--color-gold)]/10" aria-hidden="true" />
        <Container className="relative max-w-3xl text-center">
          <Reveal>
            <p className="text-xl sm:text-2xl font-medium leading-relaxed text-white/90">
              {home.whyAcosa.body}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg font-bold text-[var(--color-gold)]">{home.whyAcosa.ctaText}</p>
          </Reveal>
        </Container>
      </section>

      {/* ABOUT TEASER — vision / mission */}
      <section className="section-y bg-white">
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <SectionHeading eyebrow="About ACOSA" title={home.aboutTeaser.heading} />
            <Reveal delay={0.1} className="mt-6 space-y-6">
              <div className="border-l-4 border-[var(--color-gold)] pl-5">
                <h3 className="font-bold text-[var(--color-navy)]">{home.aboutTeaser.visionHeading}</h3>
                <p className="mt-1.5 text-sm text-[var(--color-muted)] leading-relaxed">{home.aboutTeaser.visionText}</p>
              </div>
              <div className="border-l-4 border-[var(--color-green)] pl-5">
                <h3 className="font-bold text-[var(--color-navy)]">{home.aboutTeaser.missionHeading}</h3>
                <p className="mt-1.5 text-sm text-[var(--color-muted)] leading-relaxed">{home.aboutTeaser.missionText}</p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <Button href={home.aboutTeaser.cta.href} variant="primary" className="mt-8">
                {home.aboutTeaser.cta.label}
              </Button>
            </Reveal>
          </div>
          <Reveal from="right" className="order-1 lg:order-2 relative aspect-square max-w-md mx-auto w-full">
            <Image src={home.aboutTeaser.image.url} alt={home.aboutTeaser.image.alt} fill sizes="400px" className="object-contain" />
          </Reveal>
        </Container>
      </section>

      {/* OUR STORY TEASER */}
      <section className="section-y bg-[var(--color-cream)]">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow={home.storyTeaser.subheading} title={home.storyTeaser.heading} align="center" />
          <Reveal delay={0.1}>
            <p className="mt-6 text-center text-[var(--color-muted)] leading-relaxed">{home.storyTeaser.body}</p>
          </Reveal>
          <Reveal delay={0.2} className="flex justify-center mt-8">
            <Button href={home.storyTeaser.cta.href} variant="outline">
              {home.storyTeaser.cta.label}
            </Button>
          </Reveal>
        </Container>
      </section>

      {/* PROTECTING AFRICA'S DIGITAL FUTURE */}
      <section className="relative overflow-hidden bg-[var(--color-navy)] py-24 sm:py-32">
        <div className="absolute inset-0">
          <Image
            src={home.futureCards.backgroundImage?.url ?? "https://theacosa.com/wp-content/uploads/2025/07/group-young-african-friends-with-facemasks-using-their-phones-park_11zon-scaled.jpg"}
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-70"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-navy)]/80 via-[var(--color-navy)]/50 to-[var(--color-navy)]/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-navy)]/40 via-transparent to-[var(--color-navy)]/40" />
        </div>
        {/* Top accent line — visually opens this section */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent" aria-hidden="true" />
        <Container className="relative">
          <SectionHeading title={home.futureCards.heading} align="center" light />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {home.futureCards.cards.map((c, i) => (
              <PillarCard key={c.title} icon={c.icon} title={c.title} text={c.text} index={i} tone="dark" />
            ))}
          </div>
        </Container>
      </section>

      {/* TESTIMONIALS — visually distinct section (lighter navy) so it
          reads as separate from the "Protecting Africa's Digital Future"
          banner above rather than blending into one long navy block. */}
      <section className="section-y bg-[var(--color-navy-light)]">
        <Container>
          <SectionHeading title={home.testimonials.heading} align="center" light />
          <div className="mt-12">
            <TestimonialCarousel items={home.testimonials.items} />
          </div>
        </Container>
      </section>

      {/* BLOG */}
      <section className="section-y bg-white">
        <Container>
          <SectionHeading eyebrow="News & Updates" title={home.blog.heading} />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {home.blog.posts.map((post, i) => (
              <Reveal key={post.href} delay={i * 0.1}>
                <a
                  href={post.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block h-full rounded-2xl overflow-hidden border border-black/5 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.image.url}
                      alt={post.image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <time className="text-xs font-semibold uppercase tracking-wide text-[var(--color-gold-dark)]">
                      {new Date(post.date).toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" })}
                    </time>
                    <h3 className="mt-2 font-bold text-[var(--color-navy)] leading-snug group-hover:text-[var(--color-gold-dark)] transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--color-muted)] line-clamp-2">{post.excerpt}</p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CONTACT CTA */}
      <section className="section-y bg-[var(--color-gold)] relative overflow-hidden">
        <Container className="relative flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-navy)]/70">
              {home.contactCta.tagline}
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[var(--color-navy)]">
              {home.contactCta.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Button href={home.contactCta.cta.href} variant="outline" className="border-[var(--color-navy)] text-[var(--color-navy)] hover:bg-[var(--color-navy)] hover:text-white">
              {home.contactCta.cta.label}
              <Icon name="launch" className="w-4 h-4" />
            </Button>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
