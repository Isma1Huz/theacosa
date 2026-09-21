import { clsx } from "clsx";
import { Link } from "@/i18n/navigation";

type Variant = "primary" | "outline" | "outline-light" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-gold)] text-[var(--color-navy)] hover:bg-[var(--color-gold-dark)]",
  outline:
    "border border-[var(--color-navy)] text-[var(--color-navy)] hover:bg-[var(--color-navy)] hover:text-white",
  "outline-light":
    "border border-white/70 text-white hover:bg-white hover:text-[var(--color-navy)]",
  ghost: "text-[var(--color-navy)] hover:text-[var(--color-gold-dark)]",
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  external,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
}) {
  const classes = clsx(
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-colors duration-200",
    variants[variant],
    className
  );

  if (external || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a href={href} className={classes} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
