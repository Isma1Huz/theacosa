"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import type { SiteSettings } from "@/lib/cms/types";

/**
 * Real brand glyphs for the footer's social row (filled icons, unlike the
 * stroke-based set in ui/icon.tsx which doesn't cover these). Falls back to
 * the network's initials for anything not in this map, so adding a new
 * platform to socialLinks never breaks the render.
 */
const SOCIAL_ICON_PATHS: Record<string, string> = {
  tiktok:
    "M16.6 5.82a4.28 4.28 0 01-3.15-1.4V15.3a5.7 5.7 0 11-4.93-5.65v2.6a3.1 3.1 0 103.13 3.09V2h2.66a4.28 4.28 0 004.29 4.23v2.6a6.9 6.9 0 01-1.99-.3v-2.7z",
  twitter:
    "M18.9 2H22l-7.2 8.24L23 22h-6.6l-5.17-6.76L5.3 22H2.17l7.7-8.8L1 2h6.77l4.67 6.19zm-1.15 18.2h1.72L6.35 3.7H4.5z",
  x: "M18.9 2H22l-7.2 8.24L23 22h-6.6l-5.17-6.76L5.3 22H2.17l7.7-8.8L1 2h6.77l4.67 6.19zm-1.15 18.2h1.72L6.35 3.7H4.5z",
  instagram:
    "M12 2.2c2.72 0 3.04.01 4.12.06 1.07.05 1.8.22 2.43.47.66.26 1.22.6 1.77 1.15.55.55.9 1.11 1.15 1.77.25.64.42 1.36.47 2.43.05 1.08.06 1.4.06 4.12s-.01 3.04-.06 4.12c-.05 1.07-.22 1.8-.47 2.43a4.9 4.9 0 01-1.15 1.77 4.9 4.9 0 01-1.77 1.15c-.64.25-1.36.42-2.43.47-1.08.05-1.4.06-4.12.06s-3.04-.01-4.12-.06c-1.07-.05-1.8-.22-2.43-.47a4.9 4.9 0 01-1.77-1.15 4.9 4.9 0 01-1.15-1.77c-.25-.64-.42-1.36-.47-2.43C2.01 15.04 2 14.72 2 12s.01-3.04.06-4.12c.05-1.07.22-1.8.47-2.43.26-.66.6-1.22 1.15-1.77a4.9 4.9 0 011.77-1.15c.64-.25 1.36-.42 2.43-.47C8.96 2.21 9.28 2.2 12 2.2zm0 1.8c-2.67 0-2.99.01-4.04.06-.87.04-1.34.18-1.66.3-.42.16-.72.36-1.03.67-.31.31-.51.61-.67 1.03-.12.32-.26.79-.3 1.66C4.25 9.01 4.24 9.33 4.24 12s.01 2.99.06 4.04c.04.87.18 1.34.3 1.66.16.42.36.72.67 1.03.31.31.61.51 1.03.67.32.12.79.26 1.66.3 1.05.05 1.37.06 4.04.06s2.99-.01 4.04-.06c.87-.04 1.34-.18 1.66-.3.42-.16.72-.36 1.03-.67.31-.31.51-.61.67-1.03.12-.32.26-.79.3-1.66.05-1.05.06-1.37.06-4.04s-.01-2.99-.06-4.04c-.04-.87-.18-1.34-.3-1.66a2.76 2.76 0 00-.67-1.03 2.76 2.76 0 00-1.03-.67c-.32-.12-.79-.26-1.66-.3C14.99 4.01 14.67 4 12 4zm0 3.05a4.95 4.95 0 110 9.9 4.95 4.95 0 010-9.9zm0 1.8a3.15 3.15 0 100 6.3 3.15 3.15 0 000-6.3zm5.15-1.98a1.16 1.16 0 11-2.31 0 1.16 1.16 0 012.31 0z",
  facebook:
    "M13.5 22v-8.5H16l.5-3.5h-3V7.8c0-1 .28-1.7 1.72-1.7H16.6V3.1C16.3 3.06 15.3 3 14.1 3c-2.4 0-4.05 1.47-4.05 4.16v2.34H7.5V13H10v9z",
  linkedin:
    "M4.98 3.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5zM3 9h4v12H3zM9.5 9H13v1.64h.05c.5-.94 1.7-1.94 3.5-1.94 3.75 0 4.45 2.47 4.45 5.68V21h-4v-5.6c0-1.34-.03-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V21h-4z",
  youtube:
    "M22.5 7.2s-.22-1.55-.9-2.24c-.86-.9-1.83-.9-2.27-.96C16.2 3.75 12 3.75 12 3.75h-.01s-4.2 0-7.33.25c-.44.06-1.4.06-2.27.96-.68.69-.9 2.24-.9 2.24S1.25 9 1.25 10.8v1.68c0 1.8.24 3.6.24 3.6s.22 1.55.9 2.24c.86.9 1.99.87 2.5.97 1.8.17 7.11.25 7.11.25s4.2-.01 7.33-.26c.44-.06 1.4-.06 2.27-.96.68-.69.9-2.24.9-2.24s.24-1.8.24-3.6V10.8c0-1.8-.24-3.6-.24-3.6zM9.8 14.9V8.7l6 3.1z",
};

function SocialIcon({ network, className = "w-4 h-4" }: { network: string; className?: string }) {
  const path = SOCIAL_ICON_PATHS[network.toLowerCase()];
  if (!path) {
    return <span className="text-[10px] font-bold">{network.slice(0, 2).toUpperCase()}</span>;
  }
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

export function Footer({ settings }: { settings: SiteSettings }) {
  const t = useTranslations("ui");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  async function onSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    // TODO(WordPress): point this at the WP newsletter endpoint, e.g.
    // POST /wp-json/theacosa/v1/newsletter  { name, email }
    // (see docs/wordpress-editing-guide.md — "Newsletter signup")
    await new Promise((r) => setTimeout(r, 600));
    setStatus("done");
    (e.target as HTMLFormElement).reset();
  }

  return (
    <footer className="bg-[var(--color-navy)] text-white/90">
      <Container className="section-y grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Image
            src={settings.logoFooter.url}
            alt={settings.logoFooter.alt}
            width={260}
            height={90}
            className="h-16 sm:h-20 w-auto mb-6"
          />
          <p className="text-sm leading-relaxed text-white/70">{settings.footer.about}</p>
          <div className="flex items-center gap-3 mt-6">
            {settings.socialLinks.map((s) => (
              <a
                key={s.network}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.network}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-[var(--color-gold)] hover:text-[var(--color-navy)] transition-colors"
              >
                <SocialIcon network={s.network} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-[var(--color-gold)] mb-4">
            {t("quickLinks")}
          </h3>
          <ul className="space-y-2.5">
            {settings.footer.quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-white/75 hover:text-white transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-[var(--color-gold)] mb-4">
            {t("findUs")}
          </h3>
          <ul className="space-y-3 text-sm text-white/75">
            <li className="flex items-start gap-2.5">
              <Icon name="phone" className="w-4 h-4 mt-0.5 text-[var(--color-gold)] shrink-0" />
              <a href={`tel:${settings.phone.replace(/\s+/g, "")}`} className="hover:text-white">
                {settings.phone}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Icon name="mail" className="w-4 h-4 mt-0.5 text-[var(--color-gold)] shrink-0" />
              <a href={`mailto:${settings.email}`} className="hover:text-white">
                {settings.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Icon name="pin" className="w-4 h-4 mt-0.5 text-[var(--color-gold)] shrink-0" />
              <span>{settings.address}</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-[var(--color-gold)] mb-4">
            {t("newsletter")}
          </h3>
          {status === "done" ? (
            <p className="text-sm text-white/80">{t("sentSuccess")}</p>
          ) : (
            <form onSubmit={onSubscribe} className="space-y-2.5">
              <input
                required
                name="name"
                type="text"
                placeholder={t("yourName")}
                className="w-full rounded-md bg-white/10 px-3.5 py-2.5 text-sm placeholder:text-white/50 outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
              />
              <input
                required
                name="email"
                type="email"
                placeholder={t("yourEmail")}
                className="w-full rounded-md bg-white/10 px-3.5 py-2.5 text-sm placeholder:text-white/50 outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-md bg-[var(--color-gold)] px-4 py-2.5 text-sm font-semibold text-[var(--color-navy)] hover:bg-[var(--color-gold-dark)] transition-colors disabled:opacity-60"
              >
                {status === "sending" ? t("sending") : t("subscribe")}
              </button>
            </form>
          )}
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-2 py-5 text-xs text-white/55">
          <p>{settings.footer.copyright}</p>
          <p>{settings.footer.tagline}</p>
        </Container>
      </div>
    </footer>
  );
}
