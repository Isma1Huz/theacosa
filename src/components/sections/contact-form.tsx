"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export function ContactForm() {
  const t = useTranslations("ui");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const fieldClass =
    "w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)] outline-none focus:ring-2 focus:ring-[var(--color-gold)] transition-shadow";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input required name="name" type="text" placeholder={t("yourName")} className={fieldClass} />
        <input required name="email" type="email" placeholder={t("yourEmail")} className={fieldClass} />
      </div>
      <input name="subject" type="text" placeholder={t("subject")} className={fieldClass} />
      <textarea required name="message" rows={5} placeholder={t("yourMessage")} className={fieldClass} />

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-[var(--color-gold)] px-7 py-3 text-sm font-semibold text-[var(--color-navy)] hover:bg-[var(--color-gold-dark)] transition-colors disabled:opacity-60"
      >
        {status === "sending" ? t("sending") : t("submitMessage")}
      </button>

      {status === "done" && <p className="text-sm font-medium text-[var(--color-green)]">{t("sentSuccess")}</p>}
      {status === "error" && <p className="text-sm font-medium text-red-600">{t("sentError")}</p>}
    </form>
  );
}
