import { Shield, BookOpen, Users, Scale, Lightbulb, Megaphone, Handshake, LineChart } from "lucide-react";
import { getWhatWeDoPage } from "@/lib/cms/fetch";
import type { AppLocale } from "@/i18n/routing";
import { PageHero } from "@/components/sections/page-hero";
import { JoinCta } from "@/components/sections/join-cta";
import { FocusGrid, type FocusGridItem } from "@/components/sections/focus-grid";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return { title: locale === "fr" ? "Nos actions" : "What We Do" };
}

// Icon + representative photo for each focus area, in the same order as
// `page.focusAreas` — paired the way wow-mom pairs an icon with a related
// image per card.
const FOCUS_VISUALS: { icon: FocusGridItem["icon"]; image: string; imageAlt: string }[] = [
  { icon: Shield, image: "/images/hero/girl-laptop-hero.jpg", imageAlt: "A girl safely using a laptop" },
  { icon: BookOpen, image: "/images/summit/speaker-address.jpg", imageAlt: "Digital literacy training session" },
  { icon: Users, image: "/images/summit/large-group-photo.jpg", imageAlt: "Diverse group of ACOSA delegates" },
  { icon: Scale, image: "/images/summit/panel-speaker.jpg", imageAlt: "Policy panel discussion" },
  { icon: Lightbulb, image: "/images/summit/board-meeting.jpg", imageAlt: "Working session on child safety solutions" },
  { icon: Megaphone, image: "/images/summit/group-photo.jpg", imageAlt: "Speaker raising awareness at an ACOSA summit" },
  { icon: Handshake, image: "/images/summit/registration-desk.jpg", imageAlt: "Partners connecting at an ACOSA event" },
  { icon: LineChart, image: "/images/summit/registration.jpg", imageAlt: "Tracking ACOSA's ongoing initiatives" },
];

export default async function WhatWeDoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const page = await getWhatWeDoPage(locale as AppLocale);

  const items: FocusGridItem[] = page.focusAreas.map((a, i) => {
    const visual = FOCUS_VISUALS[i % FOCUS_VISUALS.length];
    return { icon: visual.icon, image: visual.image, imageAlt: visual.imageAlt, title: a.title };
  });

  return (
    <>
      <PageHero
        title={page.heading}
        subtitle={page.intro}
        image={{ url: "/images/summit/panel-speaker.jpg", alt: "ACOSA panel discussion" }}
      />

      <FocusGrid
        eyebrow={locale === "fr" ? "Nos priorités" : "Where we focus"}
        title={locale === "fr" ? "Axes prioritaires" : "Key Focus Areas"}
        description={
          locale === "fr"
            ? "Huit axes qui guident le travail de l'ACOSA à travers le continent, des politiques publiques à la sensibilisation communautaire."
            : "Eight priorities that guide ACOSA's work across the continent, from public policy to grassroots awareness."
        }
        items={items}
      />

      <JoinCta
        heading={
          locale === "fr"
            ? "Rejoignez-nous pour bâtir un avenir numérique plus sûr pour les enfants d'Afrique."
            : "Join us in building a safer digital future for Africa's children."
        }
        ctaLabel={page.cta.label}
        ctaHref={page.cta.href}
      />
    </>
  );
}
