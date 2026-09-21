/**
 * Continuously auto-scrolling horizontal marquee of member-country flags,
 * replacing the plain text pill badges. Flag glyphs are rendered as
 * Unicode regional-indicator emoji — no external logo assets required, so
 * it works even where outbound network access is restricted, and each
 * flag is paired with the country name underneath.
 *
 * The country list is plain data (see lib/cms/data), so adding/removing a
 * member country from WordPress just adds/removes a name from that list;
 * the flag is derived automatically from a name → ISO code lookup.
 */
const COUNTRY_CODES: Record<string, string> = {
  Kenya: "KE",
  Namibia: "NA",
  Tanzania: "TZ",
  Cameroon: "CM",
  Mauritius: "MU",
  Ghana: "GH",
  "South Africa": "ZA",
  Senegal: "SN",
  Ethiopia: "ET",
  Nigeria: "NG",
  Uganda: "UG",
  Rwanda: "RW",
  Zambia: "ZM",
  Zimbabwe: "ZW",
  Malawi: "MW",
  Botswana: "BW",
  "Côte d'Ivoire": "CI",
  Egypt: "EG",
  Morocco: "MA",
  Sénégal: "SN",
};

function flagEmoji(code: string) {
  return code
    .toUpperCase()
    .replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));
}

export function FlagMarquee({ countries }: { countries: string[] }) {
  // Duplicate the list so the CSS marquee can loop seamlessly.
  const loop = [...countries, ...countries];

  return (
    <div
      className="relative mt-6 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]"
      aria-hidden={false}
    >
      <div className="flex w-max animate-[flag-marquee_28s_linear_infinite] gap-3 hover:[animation-play-state:paused]">
        {loop.map((country, i) => {
          const code = COUNTRY_CODES[country];
          return (
            <div
              key={`${country}-${i}`}
              className="flex shrink-0 flex-col items-center gap-1.5 rounded-2xl bg-white px-5 py-3 shadow-sm"
            >
              <span className="text-2xl leading-none" role="img" aria-label={`${country} flag`}>
                {code ? flagEmoji(code) : "🌍"}
              </span>
              <span className="text-xs font-semibold text-[var(--color-navy)] whitespace-nowrap">
                {country}
              </span>
            </div>
          );
        })}
      </div>
      <style>{`
        @keyframes flag-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[flag-marquee_28s_linear_infinite\\] { animation: none; }
        }
      `}</style>
    </div>
  );
}
