/**
 * These types mirror the shape of what the future headless WordPress
 * backend will return (WP REST API + ACF-to-REST, or WPGraphQL + ACF).
 * Every field here maps 1:1 to an ACF field the client will see and edit
 * in wp-admin — see /docs/wordpress-editing-guide.md for the exact field
 * group layout to build in ACF.
 *
 * `content.ts` currently serves this shape from local seed data (scraped
 * from the live theacosa.com). Swapping to real WordPress later is a
 * change to `fetch.ts` only — every component below already consumes
 * these types, not the seed data directly.
 */

export interface WPImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface LinkField {
  label: string;
  href: string;
  /** external / not part of the Next.js route tree (e.g. mailto:, tel:, social) */
  external?: boolean;
}

export interface SocialLink {
  network: "tiktok" | "twitter" | "instagram" | "facebook" | "linkedin" | "youtube";
  url: string;
}

export interface NavChild {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

/** ACF Options Page: "Site Settings" — one per language in WPML/Polylang */
export interface SiteSettings {
  siteName: string;
  logo: WPImage;
  logoFooter: WPImage;
  phone: string;
  email: string;
  address: string;
  socialLinks: SocialLink[];
  primaryNav: NavItem[];
  footer: {
    tagline: string;
    about: string;
    quickLinks: NavChild[];
    copyright: string;
  };
}

export interface Member {
  name: string;
  country: string;
  logo: WPImage;
}

export interface Pillar {
  icon: string; // icon key or WPImage URL
  title: string;
  text: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar?: WPImage;
}

export interface BlogTeaser {
  title: string;
  excerpt: string;
  href: string;
  date: string;
  image: WPImage;
}

export interface HeroSlide {
  heading: string;
  /** Small uppercase pill shown above the heading. Leave empty to omit the
   *  pill (used by the summit-announcement style slide, which instead uses
   *  `tagline` directly under the heading). */
  subheading: string;
  body: string;
  image: WPImage;
  /** Primary CTA. Optional — a slide can lead with just `secondaryCta`
   *  (rendered as the primary gold button in that case). */
  cta?: LinkField;
  secondaryCta?: LinkField;
  /** When true, `cta` renders as a static (non-clickable) button that
   *  keeps its pill design — used for the "Partner With Us" slide, which
   *  shows a contact email instead of linking anywhere. */
  ctaStatic?: boolean;
  /** Email line shown inside the static cta button, under the label. */
  ctaEmail?: string;
  /** When true, the slide renders as image-only — no text/CTA overlay. */
  imageOnly?: boolean;
  /** Optional accent text appended after `heading` in gold, e.g. a year. */
  headingHighlight?: string;
  /** Optional subtitle line rendered directly under the heading (larger
   *  than body copy), e.g. an event theme line. */
  tagline?: string;
  /** Optional event date/location row, shown with calendar/pin icons when
   *  both are present. */
  dateLabel?: string;
  locationLabel?: string;
  /** Optional "Organized by X · Hosted by Y" pill shown near the CTA.
   *  Text fallback, used only if `partnersBadge` isn't set. */
  partnersLine?: string;
  /** Optional organizer/host logo badge image, shown instead of
   *  `partnersLine` when present. */
  partnersBadge?: WPImage;
}

/** Home page — ACF Flexible Content field group "home_sections" */
export interface HomePage {
  /** ACF repeater "hero_slides" — the homepage hero is a slider (matches
   *  the Slider Revolution hero on the live theacosa.com), so the client
   *  can add/remove/reorder slides in wp-admin without a code change. */
  hero: {
    slides: HeroSlide[];
  };
  execSecretary: {
    heading: string;
    body: string;
    establishedLabel: string;
    images: WPImage[];
  };
  whoWeAre: {
    heading: string;
    body: string;
    cta: LinkField;
    pillars: Pillar[];
    /** Image shown alongside the "Read more" CTA on the homepage Champions
     *  of Child Safety section. */
    image?: WPImage;
    /** Member organizations shown as a logo + country grid. */
    members?: Member[];
  };
  whyAcosa: {
    body: string;
    ctaText: string;
  };
  aboutTeaser: {
    heading: string;
    visionHeading: string;
    visionText: string;
    missionHeading: string;
    missionText: string;
    cta: LinkField;
    image: WPImage;
  };
  storyTeaser: {
    heading: string;
    subheading: string;
    body: string;
    cta: LinkField;
  };
  futureCards: {
    heading: string;
    cards: Pillar[];
    /** Background photo behind the dark navy 4-card section. */
    backgroundImage?: WPImage;
  };
  testimonials: {
    heading: string;
    items: Testimonial[];
  };
  blog: {
    heading: string;
    posts: BlogTeaser[];
  };
  contactCta: {
    heading: string;
    subheading: string;
    tagline: string;
    cta: LinkField;
  };
}

export interface CoreValue {
  title: string;
  text: string;
}

/** About Us page — combines Our Story / Who We Are / Vision & Mission */
export interface AboutPage {
  intro: {
    heading: string;
    missionHeading: string;
    missionText: string;
    visionHeading: string;
    visionText: string;
    image: WPImage;
  };
  story: {
    heading: string;
    subheading: string;
    body: string;
    memberCountries: string[];
    members?: Member[];
    pillars: Pillar[];
    cta: LinkField;
    /** Image shown on the right of the Our Story section. */
    image?: WPImage;
  };
  whoWeAre: {
    heading: string;
    body: string;
    image: WPImage;
    pillars: Pillar[];
    whyBody: string;
    /** Background photo behind the dark navy pillar-card section. */
    pillarsBackgroundImage?: WPImage;
  };
  coreValues: {
    heading: string;
    values: CoreValue[];
    image: WPImage;
  };
}

export interface FocusArea {
  icon: string;
  title: string;
  text: string;
}

/** What We Do page */
export interface WhatWeDoPage {
  heading: string;
  intro?: string;
  focusAreas: FocusArea[];
  cta: LinkField;
}

/** ACOSA Summit page */
export interface SummitPage {
  heading: string;
  edition: string;
  theme: string;
  dates: string;
  location: string;
  images: WPImage[];
  about: string;
  legacyNote: string;
  objectives: string[];
  audience: string[];
  activities: { icon: string; text: string }[];
  /** The "2nd Africa Child Online Safety Summit 2025" promotional poster
   *  section — retained from the live site design: orange background,
   *  three photo cutouts, and the list of supporting/partner organizations. */
  poster: {
    eyebrow: string;
    heading: string;
    body: string;
    images: WPImage[];
    supportedByLabel: string;
    partners: string[];
  };
  contact: {
    name: string;
    email: string;
    ccEmail?: string;
    website: string;
    address: string;
    phone: string;
  };
  cta: LinkField;
  /** When true, `cta` renders everywhere on this summit's page as a static
   *  (non-clickable) button showing `ctaEmail` instead of linking anywhere
   *  — matches the disabled "Partner With Us" hero-slide treatment, used
   *  while partnership enquiries for this (upcoming) edition aren't open
   *  yet. */
  ctaStatic?: boolean;
  /** Email line shown inside the static cta button, under the label. */
  ctaEmail?: string;
}

/** Contact page */
export interface ContactPage {
  heading: string;
  subheading: string;
  intro: string;
  methods: {
    callLabel: string;
    phone: string;
    emailLabel: string;
    email: string;
    addressLabel: string;
    address: string;
  };
  map: {
    lat: number;
    lng: number;
    zoom: number;
    label: string;
  };
  formHeading: string;
}
