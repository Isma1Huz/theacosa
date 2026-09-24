import { getSummitEdition } from "@/lib/cms/fetch";
import type { AppLocale } from "@/i18n/routing";
import { SummitTemplate } from "@/components/sections/summit-template";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return { title: locale === "fr" ? "Sommet ACOSA 2024" : "ACOSA Summit 2024" };
}

export default async function Summit2024Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const summit = await getSummitEdition(locale as AppLocale, "2024");
  return <SummitTemplate summit={summit} locale={locale as AppLocale} />;
}
