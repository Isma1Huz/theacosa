"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import type { HeroSlide } from "@/lib/cms/types";
import { Icon } from "@/components/ui/icon";
import { clsx } from "clsx";

/**
 * Homepage hero — a real slider (auto-advancing, arrows, dots), matching
 * the Slider Revolution hero already on the live theacosa.com. Every
 * heading/subheading/body/CTA below is plain text/links coming from
 * `home.hero.slides` (see lib/cms/types.ts) — nothing here is baked into
 * an image, so it's fully editable from WordPress once that's wired up,
 * and every button is a real, keyboard-focusable, clickable link.
 */
export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((i: number) => {
    setIndex(((i % slides.length) + slides.length) % slides.length);
  }, [slides.length]);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    timerRef.current = setInterval(() => setIndex((i) => (i + 1) % slides.length), 7000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, slides.length]);

  if (slides.length === 0) return null;
  const slide = slides[index];

  return (
    <section
      className="relative overflow-hidden bg-[var(--color-navy)] min-h-[calc(100svh-6.5rem)] flex items-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      {/* Full-bleed slide images, cropped to the right like the reference
          design — girl/photo visible on the right, dark navy gradient over
          the left where the text sits. */}
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        >
          <Image
            src={slide.image.url}
            alt={slide.image.alt}
            fill
            sizes="100vw"
            priority={index === 0}
            className="object-cover object-center"
          />
          {/* Navy on the left fading to clear over the image on the right —
              skipped entirely for an image-only slide, which has no text
              needing a legibility gradient and should read as a clean photo. */}
          {!slide.imageOnly && (
            <>
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, var(--color-navy) 0%, var(--color-navy) 28%, rgba(11,35,64,0.88) 45%, rgba(11,35,64,0.35) 65%, rgba(11,35,64,0.05) 85%)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)]/50 via-transparent to-transparent" />
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      {!slide.imageOnly && (
      <div className="relative w-full mx-auto px-5 sm:px-8 lg:px-10" style={{ maxWidth: "var(--max-width)" }}>
        <div className="max-w-xl py-16 sm:py-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {slide.subheading && (
                <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">
                  {slide.subheading}
                </span>
              )}
              <h1 className={clsx("text-4xl sm:text-5xl lg:text-[3.3rem] font-extrabold leading-[1.05] text-white", slide.subheading ? "mt-5" : "")}>
                {slide.heading}
                {slide.headingHighlight && (
                  <span className="text-[var(--color-gold)]"> {slide.headingHighlight}</span>
                )}
              </h1>
              {slide.tagline && (
                <p className="mt-3 text-lg sm:text-xl text-white/90 font-medium leading-snug">{slide.tagline}</p>
              )}
              {(slide.dateLabel || slide.locationLabel) && (
                <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold text-white">
                  {slide.dateLabel && (
                    <span className="inline-flex items-center gap-2">
                      <Icon name="calendar" className="w-4 h-4 text-[var(--color-gold)]" />
                      {slide.dateLabel}
                    </span>
                  )}
                  {slide.locationLabel && (
                    <span className="inline-flex items-center gap-2">
                      <Icon name="pin" className="w-4 h-4 text-[var(--color-gold)]" />
                      {slide.locationLabel}
                    </span>
                  )}
                </div>
              )}
              <p className="mt-5 text-white/80 leading-relaxed">{slide.body}</p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                {slide.cta && (
                  slide.ctaStatic ? (
                    <div
                      role="note"
                      aria-label={`${slide.cta.label}${slide.ctaEmail ? `: ${slide.ctaEmail}` : ""}`}
                      className="inline-flex flex-col items-start justify-center gap-0.5 rounded-2xl bg-[var(--color-gold)] px-6 py-3 text-[var(--color-navy)] cursor-default select-text"
                    >
                      <span className="text-sm font-semibold leading-tight">{slide.cta.label}</span>
                      {slide.ctaEmail && (
                        <span className="text-xs font-medium leading-tight text-[var(--color-navy)]/80">{slide.ctaEmail}</span>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={slide.cta.href}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-gold)] px-6 py-3 text-sm font-semibold text-[var(--color-navy)] transition-colors hover:bg-[var(--color-gold-dark)]"
                    >
                      {slide.cta.label}
                    </Link>
                  )
                )}
                {slide.secondaryCta && (
                  <Link
                    href={slide.secondaryCta.href}
                    className={clsx(
                      "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors",
                      slide.cta
                        ? "border border-white/70 text-white hover:bg-white hover:text-[var(--color-navy)]"
                        : "bg-[var(--color-gold)] text-[var(--color-navy)] hover:bg-[var(--color-gold-dark)]"
                    )}
                  >
                    {slide.secondaryCta.label}
                  </Link>
                )}
              </div>
              {slide.organizedBy || slide.hostedBy ? (
                <div className="mt-6 inline-flex items-center gap-4 sm:gap-6 rounded-full bg-white px-6 sm:px-8 py-2.5 sm:py-3 shadow-lg">
                  {slide.organizedBy && (
                    <div className="flex items-center gap-3">
                      <span className="text-sm sm:text-base font-bold text-[var(--color-navy)] whitespace-nowrap">
                        {slide.organizedBy.label}
                      </span>
                      <span className="relative h-12 w-20 sm:h-14 sm:w-24 shrink-0">
                        <Image
                          src={slide.organizedBy.logo.url}
                          alt={slide.organizedBy.logo.alt}
                          fill
                          sizes="96px"
                          className="object-contain"
                        />
                      </span>
                    </div>
                  )}
                  {slide.organizedBy && slide.hostedBy && (
                    <span className="h-7 sm:h-9 w-px shrink-0 bg-black/15" aria-hidden="true" />
                  )}
                  {slide.hostedBy && (
                    <div className="flex items-center gap-3">
                      <span className="text-sm sm:text-base font-bold text-[var(--color-navy)] whitespace-nowrap">
                        {slide.hostedBy.label}
                      </span>
                      <span className="relative h-9 w-24 sm:h-11 sm:w-28 shrink-0">
                        <Image
                          src={slide.hostedBy.logo.url}
                          alt={slide.hostedBy.logo.alt}
                          fill
                          sizes="112px"
                          className="object-contain"
                        />
                      </span>
                    </div>
                  )}
                </div>
              ) : slide.partnersBadge ? (
                <div className="relative mt-6 inline-flex h-16 sm:h-[4.5rem] w-[210px] sm:w-[240px] items-center rounded-2xl bg-white px-4 py-2 shadow-lg">
                  <Image
                    src={slide.partnersBadge.url}
                    alt={slide.partnersBadge.alt}
                    fill
                    sizes="240px"
                    className="object-contain p-2"
                  />
                </div>
              ) : (
                slide.partnersLine && (
                  <div className="mt-7 inline-flex items-center rounded-full bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-[var(--color-navy)] shadow-lg">
                    {slide.partnersLine}
                  </div>
                )
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      )}

      {/* Slider controls */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 sm:bottom-8 left-0 right-0">
          <div className="mx-auto flex items-center justify-center gap-6 px-5" style={{ maxWidth: "var(--max-width)" }}>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous slide"
              className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white hover:bg-white/10 transition-colors"
            >
              ‹
            </button>
            <div className="flex items-center gap-2.5">
              {slides.map((s, i) => (
                <button
                  key={s.heading}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}: ${s.heading}`}
                  aria-current={i === index}
                  className={clsx(
                    "h-2 rounded-full transition-all",
                    i === index ? "w-8 bg-[var(--color-gold)]" : "w-2 bg-white/40 hover:bg-white/60"
                  )}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              aria-label="Next slide"
              className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white hover:bg-white/10 transition-colors"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
