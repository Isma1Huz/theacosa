"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import type { SiteSettings } from "@/lib/cms/types";

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
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-[var(--color-gold)] hover:text-[var(--color-navy)] transition-colors text-xs font-semibold"
              >
                {s.network.slice(0, 2).toUpperCase()}
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
