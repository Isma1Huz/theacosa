"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { clsx } from "clsx";

const FLAGS: Record<string, string> = { en: "🇬🇧", fr: "🇫🇷" };
const LABELS: Record<string, string> = { en: "EN", fr: "FR" };

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchTo(next: string) {
    if (next === locale) return;
    // Persist the visitor's explicit choice so proxy.ts (auto geo
    // detection) never overrides it again. This runs inside a click
    // handler (not during render), writing to the browser's global
    // `document`, not a captured render variable.
    // eslint-disable-next-line react-hooks/immutability
    document.cookie = `ACOSA_LOCALE=${next}; path=/; max-age=${60 * 60 * 24 * 365}`;
    router.replace(pathname, { locale: next });
  }

  return (
    <div className={clsx("flex items-center gap-1", className)}>
      {routing.locales.map((code) => (
        <button
          key={code}
          onClick={() => switchTo(code)}
          aria-current={code === locale}
          className={clsx(
            "flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold transition-colors",
            code === locale
              ? "bg-[var(--color-gold)] text-[var(--color-navy)]"
              : "text-current opacity-70 hover:opacity-100"
          )}
        >
          <span aria-hidden="true">{FLAGS[code]}</span>
          {LABELS[code]}
        </button>
      ))}
    </div>
  );
}
