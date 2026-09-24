import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { getHomePage } from "@/lib/cms/fetch";
import type { AppLocale } from "@/i18n/routing";
import { HeroSlider } from "@/components/sections/hero-slider";
import { MembersGrid } from "@/components/ui/members-grid";
import { AfricanPattern, AfricanBlobAccent, AfricanSunBurst, KenteStripe, AfricanMedallion } from "@/components/ui/african-pattern";
import { JoinCta } from "@/components/sections/join-cta";
import { CircleCta } from "@/components/sections/circle-cta";

const GALLERY_PHOTOS = [
  { url: "/images/summit/group-photo.jpg", alt: "ACOSA delegates group photo", span: "lg:col-span-3 lg:row-span-2" },
  { url: "/images/summit/speaker-address.jpg", alt: "Speaker addressing an ACOSA summit audience", span: "lg:col-span-3" },
  { url: "/images/summit/banners.jpg", alt: "Panel discussion at an ACOSA summit", span: "lg:col-span-3" },
  { url: "/images/summit/team-photo.jpg", alt: "ACOSA Summit branded banners on display", span: "lg:col-span-2" },
  { url: "/images/summit/registration.jpg", alt: "Delegate registration at an ACOSA event", span: "lg:col-span-2" },
  { url: "/images/summit/board-meeting.jpg", alt: "ACOSA delegates in a working session", span: "lg:col-span-2" },
];

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
  const memberList = home.whoWeAre.members ?? [];
  const countryCount = new Set(memberList.map((m) => m.country)).size;
  const stats = [
    { value: `${memberList.length || 10}`, label: locale === "fr" ? "Organisations membres" : "Member organizations" },
    { value: `${countryCount || 9}`, label: locale === "fr" ? "Pays africains représentés" : "African countries represented" },
    { value: "3", label: locale === "fr" ? "Sommets organisés depuis 2024" : "Summits hosted since 2024" },
  ];

  return (
    <>
      <HeroSlider slides={home.hero.slides} />

      {/* EXECUTIVE SECRETARY'S ADDRESS */}
      <section className="section-y bg-white relative overflow-hidden">
        <AfricanBlobAccent className="absolute -right-20 -bottom-20 w-64 h-64 pointer-events-none" />
        <Container className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Reveal from="left" className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
            <Image src={home.execSecretary.images[0].url} alt={home.execSecretary.images[0].alt} fill sizes="(max-width:1024px) 100vw, 480px" className="object-cover" />
          </Reveal>
          <div>
            <SectionHeading eyebrow="ACOSA" title={home.execSecretary.heading} />
            <Reveal delay={0.1}>
              <p className="mt-5 text-[var(--color-muted)] leading-relaxed">{home.execSecretary.body}</p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* IMPACT IN NUMBERS */}
      <section className="relative overflow-hidden bg-[var(--color-navy)]">
        <KenteStripe className="h-2" />
        <AfricanSunBurst className="absolute -right-10 -top-10 w-48 h-48 opacity-20 pointer-events-none" />
        <AfricanBlobAccent className="absolute -left-16 -bottom-16 w-56 h-56 pointer-events-none" />
        <Container className="relative py-14 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1} className="flex flex-col items-center text-center py-6 sm:py-0">
                <span className="text-4xl sm:text-5xl font-extrabold text-[var(--color-gold)]">{s.value}</span>
                <span className="mt-2 text-sm sm:text-base font-semibold text-white/85 max-w-[14rem]">{s.label}</span>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* WHO WE ARE + MEMBERS */}
      <section className="section-y bg-[var(--color-cream)] relative overflow-hidden">
        <AfricanBlobAccent className="absolute -right-16 -top-16 w-64 h-64 pointer-events-none" />
        <Container className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center mb-6">
            <div className="lg:col-span-2">
              <SectionHeading eyebrow="Who we are" title={home.whoWeAre.heading} />
              <Reveal delay={0.1}>
                <p className="mt-5 text-[var(--color-muted)] leading-relaxed max-w-2xl">{home.whoWeAre.body}</p>
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
          <AfricanPattern className="w-full h-6 my-8 opacity-70" />
          <SectionHeading title="Members" align="center" />
          <div className="mt-10">
            {home.whoWeAre.members && <MembersGrid members={home.whoWeAre.members} />}
          </div>
        </Container>
      </section>

      {/* WHY ACOSA */}
      <CircleCta
        title={locale === "fr" ? "Pourquoi" : "Why"}
        highlight="ACOSA?"
        subtitle={home.whyAcosa.body}
        primary={{ label: locale === "fr" ? "Contactez-nous" : "Get in touch", href: "/contact" }}
        secondary={{ label: locale === "fr" ? "À propos" : "About us", href: "/about-us" }}
        image="/images/summit/panel-speaker.jpg"
        imageAlt="The ACOSA team with partners at a summit"
      />

      {/* PHOTO GALLERY — moments from summits and fieldwork across the continent */}
      <section className="section-y bg-white relative overflow-hidden">
        <AfricanMedallion className="absolute -left-8 top-10 w-28 h-28 opacity-70 pointer-events-none hidden sm:block" />
        <AfricanBlobAccent className="absolute -right-16 bottom-0 w-56 h-56 pointer-events-none" />
        <Container className="relative">
          <SectionHeading eyebrow={locale === "fr" ? "Sur le terrain"  : "In the field"} title={locale === "fr" ? "Des moments à travers l'Afrique" : "Moments across Africa"} align="center" />
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-6 auto-rows-[9rem] sm:auto-rows-[10rem] gap-3 sm:gap-4">
            {GALLERY_PHOTOS.map((p, i) => (
              <Reveal key={p.url} delay={i * 0.06} className={`relative col-span-1 ${p.span} rounded-2xl overflow-hidden shadow-sm group`}>
                <Image
                  src={p.url}
                  alt={p.alt}
                  fill
                  sizes="(max-width:1024px) 50vw, 20vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <JoinCta
        heading={locale === "fr" ? "Rejoignez-nous pour bâtir un avenir numérique plus sûr pour les enfants d'Afrique." : "Join us in building a safer digital future for Africa's children."}
        ctaLabel={locale === "fr" ? "Contactez-nous" : "Get in touch"}
      />
    </>
  );
}
