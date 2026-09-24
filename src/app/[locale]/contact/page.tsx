import { getContactPage } from "@/lib/cms/fetch";
import type { AppLocale } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/sections/page-hero";
import { ContactForm } from "@/components/sections/contact-form";
import { AfricanBlobAccent } from "@/components/ui/african-pattern";

export async function generateMetadata() {
  return { title: "Contact" };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const contact = await getContactPage(locale as AppLocale);

  return (
    <>
      <PageHero
        eyebrow={contact.heading}
        title={contact.subheading}
        subtitle={contact.intro}
        image={{ url: "/images/summit/registration-desk.jpg", alt: "ACOSA event registration" }}
      />

      <section className="section-y bg-white relative overflow-hidden">
        <AfricanBlobAccent className="absolute -right-16 -bottom-16 w-64 h-64 pointer-events-none" />
        <Container className="relative grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <Reveal className="flex items-start gap-4 rounded-2xl bg-[var(--color-cream)] p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-navy)] text-[var(--color-gold)]">
                <Icon name="mail" className="w-5 h-5" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-[var(--color-muted)]">{contact.methods.emailLabel}</p>
                <a href={`mailto:${contact.methods.email}`} className="font-semibold text-[var(--color-navy)]">
                  {contact.methods.email}
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.16} className="flex items-start gap-4 rounded-2xl bg-[var(--color-cream)] p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-navy)] text-[var(--color-gold)]">
                <Icon name="pin" className="w-5 h-5" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-[var(--color-muted)]">{contact.methods.addressLabel}</p>
                <p className="font-semibold text-[var(--color-navy)]">{contact.methods.address}</p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="lg:col-span-3 rounded-3xl bg-[var(--color-cream)] p-7 sm:p-10">
            <h2 className="text-2xl font-extrabold text-[var(--color-navy)] mb-6">{contact.formHeading}</h2>
            <ContactForm />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
