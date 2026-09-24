import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Background photo for the banner — every non-homepage page header
   *  carries one, per the client's design. */
  image?: { url: string; alt: string };
}) {
  return (
    <section className="relative overflow-hidden bg-[var(--color-navy)] py-20 sm:py-28">
      {image && (
        <div className="absolute inset-0">
          <Image src={image.url} alt="" fill sizes="100vw" className="object-cover" priority />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, var(--color-navy) 0%, rgba(11,35,64,0.82) 26%, rgba(11,35,64,0.5) 46%, rgba(11,35,64,0.18) 68%, rgba(11,35,64,0.05) 100%)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)]/60 via-transparent to-transparent" />
        </div>
      )}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[var(--color-gold)]/10"
        aria-hidden="true"
      />
      <Container className="relative text-left">
        {eyebrow && (
          <Reveal>
            <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">
              {eyebrow}
            </span>
          </Reveal>
        )}
        <Reveal delay={0.08}>
          <h1 className="mt-5 max-w-2xl text-4xl sm:text-5xl font-extrabold text-white">{title}</h1>
        </Reveal>
        {subtitle && (
          <Reveal delay={0.16}>
            <p className="mt-4 max-w-2xl text-white/75 leading-relaxed">{subtitle}</p>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
