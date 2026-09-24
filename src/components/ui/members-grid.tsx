import Image from "next/image";
import type { Member } from "@/lib/cms/types";
import { Reveal } from "@/components/motion/reveal";

function MemberCard({ m, dark }: { m: Member; dark: boolean }) {
  return (
    <div
      className={
        dark
          ? "flex h-full flex-col items-center gap-3 rounded-2xl bg-white/5 border border-white/10 p-5 text-center"
          : "flex h-full flex-col items-center gap-3 rounded-2xl bg-white border border-black/5 shadow-sm p-5 text-center"
      }
    >
      <div className="relative h-16 w-full">
        <Image src={m.logo.url} alt={m.logo.alt} fill sizes="140px" className="object-contain" />
      </div>
      <span
        className={
          dark
            ? "rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white"
            : "rounded-full bg-[var(--color-cream)] px-3 py-1 text-xs font-semibold text-[var(--color-navy)]"
        }
      >
        {m.country}
      </span>
    </div>
  );
}

/**
 * Coalition "Members" grid — organization logo above a country pill, per
 * the client's reference design. Used on the homepage (Who We Are) and the
 * About Us page (Our Story), both driven by the same shared member list.
 *
 * With `marquee`, renders as a continuously auto-scrolling horizontal strip
 * instead of a static grid (used on the About Us "Our Story" section, which
 * previously had a moving flag strip and should keep that motion).
 */
export function MembersGrid({
  members,
  dark = false,
  marquee = false,
}: {
  members: Member[];
  dark?: boolean;
  marquee?: boolean;
}) {
  if (marquee) {
    const loop = [...members, ...members];
    return (
      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
        <div className="flex w-max animate-[members-marquee_32s_linear_infinite] gap-5 hover:[animation-play-state:paused]">
          {loop.map((m, i) => (
            <div key={`${m.name}-${i}`} className="w-40 shrink-0">
              <MemberCard m={m} dark={dark} />
            </div>
          ))}
        </div>
        <style>{`
          @keyframes members-marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          @media (prefers-reduced-motion: reduce) {
            .animate-\\[members-marquee_32s_linear_infinite\\] { animation: none; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
      {members.map((m, i) => (
        <Reveal key={m.name} delay={i * 0.05}>
          <MemberCard m={m} dark={dark} />
        </Reveal>
      ))}
    </div>
  );
}
