import { NextResponse } from "next/server";

/**
 * Placeholder contact-form endpoint.
 *
 * TODO(WordPress): once the headless backend exists, proxy this to the
 * client's chosen WP form plugin instead of handling it here, e.g.:
 *   - Contact Form 7 (with the CF7 REST API add-on):
 *       POST {WP_API_URL}/wp-json/contact-form-7/v1/contact-forms/{id}/feedback
 *   - WPForms (with a webhook / the WPForms REST add-on)
 * Either way, keep this route's request shape ({ name, email, subject,
 * message }) so the ContactForm component on the frontend doesn't change.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body?.name || !body?.email || !body?.message) {
    return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
  }

  // No WordPress endpoint configured yet — accept and log server-side so
  // the flow is fully testable before the CMS backend is wired up.
  console.log("[contact] new message", {
    name: body.name,
    email: body.email,
    subject: body.subject,
    message: body.message,
  });

  return NextResponse.json({ ok: true });
}
