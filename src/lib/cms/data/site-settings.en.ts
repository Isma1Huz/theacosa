import type { SiteSettings } from "../types";

// Seed data shaped exactly like the ACF Options Page response documented in
// /docs/wordpress-editing-guide.md. Replace with a live WP fetch later.
export const siteSettingsEn: SiteSettings = {
  siteName: "ACOSA — African Child Online Safety Alliance",
  logo: {
    url: "https://theacosa.com/wp-content/uploads/2025/01/ACOSA-logo-1-4-1.png",
    alt: "ACOSA logo",
  },
  logoFooter: {
    url: "/images/brand/acosa-logo-footer-white.png",
    alt: "ACOSA — Africa Child Online Safety Alliance logo",
  },
  phone: "+254 701 077955",
  email: "info@theacosa.com",
  address: "The ACOSA Secretariat, Ngong Hills Business Center, P.O Box 535-00517, Nairobi, Kenya",
  socialLinks: [
    { network: "tiktok", url: "https://www.tiktok.com/@acosa.lliance" },
    { network: "twitter", url: "https://twitter.com/acosa_alliance" },
    { network: "instagram", url: "https://www.instagram.com/acosa.lliance/" },
  ],
  primaryNav: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about-us" },
    { label: "What We Do", href: "/what-we-do" },
    { label: "ACOSA Summit", href: "/acosa-summit" },
    { label: "Contact", href: "/contact" },
  ],
  footer: {
    tagline: "Best way to make a difference in the lives of others",
    about:
      "ACOSA was officially launched at the conclusion of the Africa Child Online Protection Summit. The alliance brings together organizations from across Africa to share resources, expertise, and coordinated action for children's digital safety.",
    quickLinks: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about-us" },
      { label: "What We Do", href: "/what-we-do" },
      { label: "ACOSA Summit", href: "/acosa-summit" },
      { label: "Contact Us", href: "/contact" },
    ],
    copyright: `© ${new Date().getFullYear()} All Rights Reserved By ACOSA`,
  },
};
