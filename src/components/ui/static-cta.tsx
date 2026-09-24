import { clsx } from "clsx";

type Variant = "primary" | "outline";

const variants: Record<Variant, string> = {
  primary: "bg-[var(--color-gold)] text-[var(--color-navy)]",
  outline: "border border-[var(--color-navy)] text-[var(--color-navy)]",
};

/**
 * Non-clickable stand-in for a `Button`/`Link` CTA — used wherever a
 * "Partner With Us" (or similar) action isn't open yet. Keeps the same
 * pill shape and variant coloring as a real button so the layout doesn't
 * shift, but renders as an inert note with the contact email shown
 * underneath instead of linking anywhere (matches the homepage hero's
 * first-slide treatment).
 */
export function StaticCta({
  label,
  email,
  variant = "primary",
  className,
}: {
  label: string;
  email?: string;
  variant?: Variant;
  className?: string;
}) {
  return (
    <div
      role="note"
      aria-label={`${label}${email ? `: ${email}` : ""}`}
      className={clsx(
        "inline-flex flex-col items-start justify-center gap-0.5 rounded-2xl px-6 py-3 cursor-default select-text",
        variants[variant],
        className
      )}
    >
      <span className="text-sm font-semibold leading-tight">{label}</span>
      {email && (
        <span
          className={clsx(
            "text-xs font-medium leading-tight",
            variant === "primary" ? "text-[var(--color-navy)]/80" : "text-[var(--color-navy)]/70"
          )}
        >
          {email}
        </span>
      )}
    </div>
  );
}
