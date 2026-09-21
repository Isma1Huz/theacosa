import type { SiteSettings } from "../types";

export const siteSettingsFr: SiteSettings = {
  siteName: "ACOSA — Alliance Africaine pour la Sécurité des Enfants en Ligne",
  logo: {
    url: "https://theacosa.com/wp-content/uploads/2025/01/ACOSA-logo-1-4-1.png",
    alt: "Logo ACOSA",
  },
  logoFooter: {
    url: "/images/brand/acosa-logo-footer-white.png",
    alt: "ACOSA — Alliance africaine pour la sécurité des enfants en ligne (logo)",
  },
  phone: "+254 701 077955",
  email: "info@theacosa.com",
  address: "Le Secrétariat de l'ACOSA, Ngong Hills Business Center, B.P. 535-00517, Nairobi, Kenya",
  socialLinks: [
    { network: "tiktok", url: "https://www.tiktok.com/@acosa.lliance" },
    { network: "twitter", url: "https://twitter.com/acosa_alliance" },
    { network: "instagram", url: "https://www.instagram.com/acosa.lliance/" },
  ],
  primaryNav: [
    { label: "Accueil", href: "/" },
    { label: "À propos", href: "/about-us" },
    { label: "Nos actions", href: "/what-we-do" },
    { label: "Sommet ACOSA", href: "/acosa-summit" },
    { label: "Contact", href: "/contact" },
  ],
  footer: {
    tagline: "La meilleure façon de changer la vie des autres",
    about:
      "L'ACOSA a été officiellement lancée à la clôture du Sommet africain sur la protection des enfants en ligne. L'alliance réunit des organisations de tout le continent pour partager ressources, expertise et actions coordonnées en faveur de la sécurité numérique des enfants.",
    quickLinks: [
      { label: "Accueil", href: "/" },
      { label: "À propos", href: "/about-us" },
      { label: "Nos actions", href: "/what-we-do" },
      { label: "Sommet ACOSA", href: "/acosa-summit" },
      { label: "Contact", href: "/contact" },
    ],
    copyright: `© ${new Date().getFullYear()} Tous droits réservés — ACOSA`,
  },
};
