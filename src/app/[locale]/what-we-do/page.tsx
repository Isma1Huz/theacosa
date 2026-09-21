import { getWhatWeDoPage } from "@/lib/cms/fetch";
import type { AppLocale } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Icon, type IconName } from "@/components/ui/icon";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/sections/page-hero";
import { OrganicCta } from "@/components/sections/organic-cta";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return { title: locale === "fr" ? "Nos actions" : "What We Do" };
}

export default async function WhatWeDoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const page = await getWhatWeDoPage(locale as AppLocale);

  return (
    <>
      <PageHero title={page.heading} subtitle={page.intro} />

      <section className="section-y bg-white">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-black/5 rounded-3xl overflow-hidden auto-rows-fr">
            {page.focusAreas.map((area, i) => (
              <Reveal key={area.title} delay={(i % 4) * 0.06} className="bg-white h-full">
                <div className="group flex h-full flex-col items-start p-7 sm:p-8 transition-colors duration-300 hover:bg-[var(--color-cream)]">
                  <span className="text-xs font-bold text-[var(--color-gold-dark)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="mt-3 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-navy)] text-[var(--color-gold)] transition-colors duration-300 group-hover:bg-[var(--color-gold)] group-hover:text-[var(--color-navy)]">
                    <Icon name={area.icon as IconName} className="w-6 h-6" />
                  </div>
                  <h3 className="mt-4 font-bold text-[var(--color-navy)] leading-snug">{area.title}</h3>
                  <p className="mt-2 text-sm text-[var(--color-muted)] leading-relaxed flex-1">{area.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <OrganicCta
        heading={
          locale === "fr"
            ? "Rejoignez-nous pour bâtir un avenir numérique plus sûr pour les enfants d'Afrique."
            : "Join us in building a safer digital future for Africa's children."
        }
        cta={page.cta}
      />
    </>
  );
}
