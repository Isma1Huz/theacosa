import { clsx } from "clsx";

/**
 * Global max-width wrapper. Every section on every page uses this so the
 * site-wide content width only ever needs changing in one place
 * (change --max-width in globals.css).
 */
export function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  return (
    <Tag
      className={clsx("mx-auto w-full px-5 sm:px-8 lg:px-10", className)}
      style={{ maxWidth: "var(--max-width)" }}
    >
      {children}
    </Tag>
  );
}
