"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Testimonial } from "@/lib/cms/types";

export function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => setIndex((i) => (i + 1) % items.length), [items.length]);
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);

  useEffect(() => {
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next]);

  if (items.length === 0) return null;
  const item = items[index];

  return (
    <div className="relative mx-auto max-w-2xl text-center">
      <span className="text-6xl leading-none text-[var(--color-gold)]" aria-hidden="true">
        &ldquo;
      </span>
      <div className="min-h-[9rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-lg sm:text-xl text-white/90 leading-relaxed">{item.quote}</p>
            <p className="mt-5 font-bold text-white">{item.name}</p>
            <p className="text-sm text-[var(--color-gold)]">{item.role}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          onClick={prev}
          aria-label="Previous testimonial"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors"
        >
          ‹
        </button>
        <div className="flex items-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-[var(--color-gold)]" : "w-2 bg-white/30"
              }`}
            />
          ))}
        </div>
        <button
          onClick={next}
          aria-label="Next testimonial"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors"
        >
          ›
        </button>
      </div>
    </div>
  );
}
