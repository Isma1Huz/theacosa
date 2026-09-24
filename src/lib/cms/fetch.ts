import "server-only";
import type { AppLocale } from "@/i18n/routing";
import type {
  SiteSettings,
  HomePage,
  AboutPage,
  WhatWeDoPage,
  SummitPage,
  ContactPage,
} from "./types";

import { siteSettingsEn } from "./data/site-settings.en";
import { siteSettingsFr } from "./data/site-settings.fr";
import { homeEn } from "./data/home.en";
import { homeFr } from "./data/home.fr";
import { aboutEn } from "./data/about.en";
import { aboutFr } from "./data/about.fr";
import { whatWeDoEn } from "./data/what-we-do.en";
import { whatWeDoFr } from "./data/what-we-do.fr";
import { summitEn } from "./data/summit.en";
import { summitFr } from "./data/summit.fr";
import { summit2027En } from "./data/summit-2027.en";
import { summit2027Fr } from "./data/summit-2027.fr";
import { summit2024En } from "./data/summit-2024.en";
import { summit2024Fr } from "./data/summit-2024.fr";
import { contactEn } from "./data/contact.en";
import { contactFr } from "./data/contact.fr";

/**
 * ---------------------------------------------------------------------
 *  CONTENT SOURCE SWITCH
 * ---------------------------------------------------------------------
 * Every function below currently resolves from local seed data (scraped
 * from the live theacosa.com so the layout ships with real copy).
 *
 * Once the WordPress backend exists, set WP_API_URL in the environment
 * and flip USE_WORDPRESS to true. Each function's seed branch can then be
 * deleted — the fetch branch already returns the exact same TypeScript
 * shape (see ./types.ts), so no component changes are needed.
 *
 * Expected WP REST endpoints (ACF-to-REST-API plugin), one per language
 * via Polylang/WPML's `?lang=` query param:
 *   GET /wp-json/acf/v3/options/site-settings?lang=en
 *   GET /wp-json/wp/v2/pages?slug=home&lang=en&acf_format=standard
 *   GET /wp-json/wp/v2/pages?slug=about-us&lang=en&acf_format=standard
 *   GET /wp-json/wp/v2/pages?slug=what-we-do&lang=en&acf_format=standard
 *   GET /wp-json/wp/v2/pages?slug=acosa-summit&lang=en&acf_format=standard
 *   GET /wp-json/wp/v2/pages?slug=contact&lang=en&acf_format=standard
 * ---------------------------------------------------------------------
 */
const USE_WORDPRESS = Boolean(process.env.WP_API_URL);
const WP_API_URL = process.env.WP_API_URL;

async function wpFetch<T>(path: string, locale: AppLocale): Promise<T> {
  const sep = path.includes("?") ? "&" : "?";
  const res = await fetch(`${WP_API_URL}${path}${sep}lang=${locale}`, {
    // ISR: re-fetch page content at most once a minute so editors see
    // WordPress changes without needing a full redeploy.
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error(`WordPress fetch failed for ${path}: ${res.status}`);
  }
  return res.json();
}

export async function getSiteSettings(locale: AppLocale): Promise<SiteSettings> {
  if (USE_WORDPRESS) {
    return wpFetch<SiteSettings>("/wp-json/acf/v3/options/site-settings", locale);
  }
  return locale === "fr" ? siteSettingsFr : siteSettingsEn;
}

export async function getHomePage(locale: AppLocale): Promise<HomePage> {
  if (USE_WORDPRESS) {
    return wpFetch<HomePage>("/wp-json/theacosa/v1/page/home", locale);
  }
  return locale === "fr" ? homeFr : homeEn;
}

export async function getAboutPage(locale: AppLocale): Promise<AboutPage> {
  if (USE_WORDPRESS) {
    return wpFetch<AboutPage>("/wp-json/theacosa/v1/page/about-us", locale);
  }
  return locale === "fr" ? aboutFr : aboutEn;
}

export async function getWhatWeDoPage(locale: AppLocale): Promise<WhatWeDoPage> {
  if (USE_WORDPRESS) {
    return wpFetch<WhatWeDoPage>("/wp-json/theacosa/v1/page/what-we-do", locale);
  }
  return locale === "fr" ? whatWeDoFr : whatWeDoEn;
}

export async function getSummitPage(locale: AppLocale): Promise<SummitPage> {
  return getSummitEdition(locale, "2027");
}

const SUMMIT_EDITIONS = {
  "2027": { en: summit2027En, fr: summit2027Fr },
  "2025": { en: summitEn, fr: summitFr },
  "2024": { en: summit2024En, fr: summit2024Fr },
} as const;

export type SummitYear = keyof typeof SUMMIT_EDITIONS;

export async function getSummitEdition(locale: AppLocale, year: SummitYear): Promise<SummitPage> {
  if (USE_WORDPRESS) {
    return wpFetch<SummitPage>(`/wp-json/theacosa/v1/page/acosa-summit-${year}`, locale);
  }
  const edition = SUMMIT_EDITIONS[year];
  return locale === "fr" ? edition.fr : edition.en;
}

export async function getContactPage(locale: AppLocale): Promise<ContactPage> {
  if (USE_WORDPRESS) {
    return wpFetch<ContactPage>("/wp-json/theacosa/v1/page/contact", locale);
  }
  return locale === "fr" ? contactFr : contactEn;
}
