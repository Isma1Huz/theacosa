"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** stagger delay in seconds, useful for lists of cards */
  delay?: number;
  /** direction the content slides in from */
  from?: "up" | "down" | "left" | "right" | "none";
  as?: "div" | "li" | "article";
};

const OFFSETS: Record<NonNullable<RevealProps["from"]>, { x?: number; y?: number }> = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: 28 },
  right: { x: -28 },
  none: {},
};

/**
 * Scroll-reveal wrapper used throughout the site for on-scroll animation.
 * Respects prefers-reduced-motion automatically (renders content statically
 * with no transform/opacity animation in that case).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  from = "up",
  as = "div",
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const offset = OFFSETS[from];

  const variants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, ...offset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}
