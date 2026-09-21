import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Supported languages. Add more locale codes here later (e.g. "sw" for Swahili)
  // and drop a matching messages/<code>.json file — nothing else needs to change.
  locales: ["en", "fr"],
  defaultLocale: "en",
  // We manage the redirect ourselves in proxy.ts (geo + cookie + header),
  // so next-intl should not also try to auto-negotiate on top of that.
  localeDetection: false,
});

export type AppLocale = (typeof routing.locales)[number];
