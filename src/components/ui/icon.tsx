/**
 * Small inline-SVG icon set for the pillar/focus-area/activity cards across
 * the site. Kept as one file of simple line icons (no external icon font)
 * so the whole build stays dependency-light. `name` matches the `icon` key
 * stored on each CMS content item (see lib/cms/types.ts) — a client swap
 * of icon per item is just editing that field in WordPress later if we
 * wire icon-choice into ACF; for now the mapping below defines the look.
 */

export type IconName =
  | "collaboration"
  | "advocacy"
  | "education"
  | "research"
  | "partnership"
  | "empowering"
  | "innovation"
  | "determination"
  | "parent-control"
  | "empowerment"
  | "guarding"
  | "shield"
  | "raise-your-hands"
  | "build-1"
  | "monitor"
  | "launch"
  | "roundtable"
  | "panel"
  | "exhibition"
  | "phone"
  | "mail"
  | "pin"
  | "calendar";

const paths: Record<IconName, React.ReactNode> = {
  collaboration: (
    <>
      <circle cx="8" cy="9" r="3" />
      <circle cx="17" cy="9" r="3" />
      <path d="M3 20c0-3 2.5-5 5-5s5 2 5 5M11 20c0-3 2.5-5 5-5s5 2 5 5" />
    </>
  ),
  partnership: (
    <>
      <path d="M8 12l3 3 6-6" />
      <circle cx="12" cy="12" r="9" />
    </>
  ),
  advocacy: (
    <>
      <path d="M3 11l18-6-6 18-3-7-7-3z" />
    </>
  ),
  education: (
    <>
      <path d="M2 8l10-4 10 4-10 4-10-4z" />
      <path d="M6 10v5c0 1.5 2.5 3 6 3s6-1.5 6-3v-5" />
    </>
  ),
  "parent-control": (
    <>
      <circle cx="9" cy="7" r="2.5" />
      <circle cx="17" cy="8" r="2" />
      <path d="M4 20c0-3 2.2-5 5-5s5 2 5 5M14 20c0-2.2 1.6-4 4-4s4 1.8 4 4" />
    </>
  ),
  research: (
    <>
      <circle cx="10" cy="10" r="6" />
      <path d="M20 20l-5.5-5.5" />
    </>
  ),
  empowering: (
    <>
      <path d="M12 3v6M9 6l3 3 3-3" />
      <path d="M5 21c1.5-4 4.5-6 7-6s5.5 2 7 6" />
    </>
  ),
  empowerment: (
    <>
      <path d="M12 21c4-2 7-5.5 7-10a7 7 0 10-14 0c0 4.5 3 8 7 10z" />
      <path d="M12 8v5" />
    </>
  ),
  innovation: (
    <>
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a6 6 0 00-3.5 10.9c.4.3.5.7.5 1.1v1h6v-1c0-.4.1-.8.5-1.1A6 6 0 0012 3z" />
    </>
  ),
  determination: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.5" />
    </>
  ),
  guarding: (
    <>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path d="M9.5 12l2 2 3.5-3.5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
    </>
  ),
  "raise-your-hands": (
    <>
      <circle cx="12" cy="7" r="3" />
      <path d="M12 11v10M8 6l-3-3M16 6l3-3M6 21c0-2 1-3.5 2.5-4M18 21c0-2-1-3.5-2.5-4" />
    </>
  ),
  "build-1": (
    <>
      <path d="M3 21h18M5 21V10l7-6 7 6v11" />
      <path d="M9 21v-6h6v6" />
    </>
  ),
  monitor: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M8 20h8M12 16v4" />
      <path d="M7 12l3-3 2 2 4-5" />
    </>
  ),
  launch: (
    <>
      <path d="M12 2c2 2.5 3 5.5 3 8.5 0 2-1 4-3 5.5-2-1.5-3-3.5-3-5.5C9 7.5 10 4.5 12 2z" />
      <path d="M9 15l-3 5 4-1M15 15l3 5-4-1" />
    </>
  ),
  roundtable: (
    <>
      <circle cx="12" cy="12" r="4" />
      <circle cx="5" cy="12" r="1.5" />
      <circle cx="19" cy="12" r="1.5" />
      <circle cx="12" cy="5" r="1.5" />
      <circle cx="12" cy="19" r="1.5" />
    </>
  ),
  panel: (
    <>
      <circle cx="7" cy="9" r="2.5" />
      <circle cx="17" cy="9" r="2.5" />
      <circle cx="12" cy="7" r="2.5" />
      <path d="M2 20c0-2.8 2.2-5 5-5s5 2.2 5 5M12 20c0-2.5 2-4.5 4.5-4.5S21 17.5 21 20" />
    </>
  ),
  exhibition: (
    <>
      <path d="M4 21V9l8-6 8 6v12" />
      <path d="M9 21v-6h6v6M4 12h16" />
    </>
  ),
  phone: (
    <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 006 6l1.5-2 4 1.5v3a2 2 0 01-2.2 2A17 17 0 014.5 5.2 2 2 0 016.5 3z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
};

export function Icon({
  name,
  className = "w-6 h-6",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name] ?? paths.shield}
    </svg>
  );
}
