import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[var(--color-navy)] py-20 sm:py-28">
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
      <Container className="relative text-center">
        {eyebrow && (
          <Reveal>
            <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">
              {eyebrow}
            </span>
          </Reveal>
        )}
        <Reveal delay={0.08}>
          <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold text-white">{title}</h1>
        </Reveal>
        {subtitle && (
          <Reveal delay={0.16}>
            <p className="mt-4 max-w-2xl mx-auto text-white/75 leading-relaxed">{subtitle}</p>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
