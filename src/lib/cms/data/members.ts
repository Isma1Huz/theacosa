import type { Member } from "../types";

// Shared "Members" list — the coalition's partner organizations across
// Africa, shown as a logo + country grid on the homepage and About Us page.
// Locale-independent (organization names and country names are proper
// nouns/kept in English on both locales, matching the client's originals).
export const members: Member[] = [
  { name: "Polaris Asso", country: "Senegal", logo: { url: "/images/members/polaris.png", alt: "Polaris Asso logo" } },
  { name: "Action Against Child Sexual Abuse Initiative", country: "Nigeria", logo: { url: "/images/members/acsai.png", alt: "ACSAI logo" } },
  { name: "Emmanuel Development Association", country: "Ethiopia", logo: { url: "/images/members/emmanuel-dev-assoc.png", alt: "Emmanuel Development Association logo" } },
  { name: "LifeLine / ChildLine Namibia", country: "Namibia", logo: { url: "/images/members/lifeline-childline.png", alt: "LifeLine / ChildLine Namibia logo" } },
  { name: "Sema", country: "Kenya", logo: { url: "/images/members/sema.png", alt: "Sema logo" } },
  { name: "Watoto Watch Network", country: "Kenya", logo: { url: "/images/members/watoto-watch.png", alt: "Watoto Watch Network logo" } },
  { name: "Jelly Beanz", country: "South Africa", logo: { url: "/images/members/jelly-beanz.png", alt: "Jelly Beanz logo" } },
  { name: "Ghana Internet Safety Foundation", country: "Ghana", logo: { url: "/images/members/ghana-internet-safety.png", alt: "Ghana Internet Safety Foundation logo" } },
  { name: "SUSTAIN Cameroon", country: "Cameroon", logo: { url: "/images/members/sustain-cameroon.png", alt: "SUSTAIN Cameroon logo" } },
  { name: "Halley Movement", country: "Mauritius", logo: { url: "/images/members/halley-movement.png", alt: "Halley Movement logo" } },
];
