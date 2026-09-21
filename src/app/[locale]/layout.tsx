import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getSiteSettings } from "@/lib/cms/fetch";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const settings = await getSiteSettings(locale as "en" | "fr");
  return {
    title: {
      default: settings.siteName,
      template: `%s · ACOSA`,
    },
    description:
      locale === "fr"
        ? "L'Alliance Africaine pour la Sécurité des Enfants en Ligne — collaboration, plaidoyer et innovation pour la sécurité numérique des enfants à travers l'Afrique."
        : "African Child Online Safety Alliance — collaboration, advocacy, and innovation for children's digital safety across Africa.",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();
  const settings = await getSiteSettings(locale as "en" | "fr");

  return (
    <html lang={locale}>
      <body className="antialiased bg-white text-[var(--color-ink)]">
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:rounded-md focus:shadow-lg"
          >
            Skip to content
          </a>
          <Header settings={settings} locale={locale as "en" | "fr"} />
          <main id="main-content">{children}</main>
          <Footer settings={settings} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
