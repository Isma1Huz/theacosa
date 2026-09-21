"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { Button } from "@/components/ui/button";
import type { SiteSettings } from "@/lib/cms/types";
import { clsx } from "clsx";

export function Header({
  settings,
}: {
  settings: SiteSettings;
  locale: "en" | "fr";
}) {
  const t = useTranslations("ui");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Close the mobile menu on route change. Intentional synchronous
    // setState here — this only resets local UI state in response to a
    // pathname change and doesn't read/depend on the state it's setting,
    // so it doesn't cascade.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur shadow-sm"
          : "bg-white"
      )}
    >
      <Container className="flex items-center justify-between py-4 sm:py-5">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src={settings.logo.url}
            alt={settings.logo.alt}
            width={190}
            height={64}
            className="h-14 w-auto sm:h-16"
            priority
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {settings.primaryNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "text-sm font-semibold uppercase tracking-wide transition-colors",
                  active
                    ? "text-[var(--color-gold-dark)]"
                    : "text-[var(--color-navy)] hover:text-[var(--color-gold-dark)]"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <LanguageSwitcher className="text-[var(--color-navy)]" />
          <Button href="/contact" variant="primary">
            {t("getInTouch")}
          </Button>
        </div>

        <button
          className="lg:hidden inline-flex flex-col justify-center gap-1.5 w-10 h-10 items-center"
          aria-label={open ? t("closeMenu") : t("openMenu")}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={clsx(
              "block h-0.5 w-6 bg-[var(--color-navy)] transition-transform",
              open && "translate-y-2 rotate-45"
            )}
          />
          <span
            className={clsx(
              "block h-0.5 w-6 bg-[var(--color-navy)] transition-opacity",
              open && "opacity-0"
            )}
          />
          <span
            className={clsx(
              "block h-0.5 w-6 bg-[var(--color-navy)] transition-transform",
              open && "-translate-y-2 -rotate-45"
            )}
          />
        </button>
      </Container>

      {/* Mobile nav panel */}
      <div
        className={clsx(
          "lg:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out border-t border-black/5",
          open ? "max-h-[28rem]" : "max-h-0"
        )}
      >
        <Container className="flex flex-col gap-1 py-4">
          {settings.primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="py-2.5 text-base font-semibold text-[var(--color-navy)] border-b border-black/5 last:border-none"
            >
              {item.label}
            </Link>
          ))}
          <div className="flex items-center justify-between pt-4">
            <LanguageSwitcher className="text-[var(--color-navy)]" />
            <Button href="/contact" variant="primary">
              {t("getInTouch")}
            </Button>
          </div>
        </Container>
      </div>
    </header>
  );
}
