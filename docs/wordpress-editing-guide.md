# Making this site editable from WordPress

This Next.js site is built "headless-ready": every piece of text, every image,
and every link on the 5 pages we've built (Home, About Us, What We Do, ACOSA
Summit, Contact) — plus the header/footer/navigation — is already pulled from
one function per page in `src/lib/cms/fetch.ts`. Right now those functions
return local seed data (scraped from the live theacosa.com so the site ships
with real content). Pointing them at a real WordPress site is a **content
source swap only** — no component in `src/components` or `src/app` needs to
change, because they already consume the typed shapes in `src/lib/cms/types.ts`,
not the seed data directly.

This doc is the field-by-field build spec for whoever sets up that WordPress
backend.

## 1. Recommended WordPress plugin stack

| Purpose | Plugin | Why |
|---|---|---|
| Custom fields (images, text, repeaters, links) | **Advanced Custom Fields PRO (ACF Pro)** | Flexible Content + repeaters map directly to the sections below; ACF Pro also gives us the Options Page for site-wide settings |
| Expose ACF fields over the API | **ACF to REST API** (or WPGraphQL + WPGraphQL for ACF, if the dev team prefers GraphQL) | Needed so Next.js can fetch page content as JSON |
| Bilingual EN/FR content | **Polylang Pro** (or WPML if the client already owns a license) | Lets an editor duplicate a page into French and translate field-by-field in wp-admin; both plugins expose a `?lang=en` / `?lang=fr` REST parameter, which `fetch.ts` is already written to call |
| Contact form | **Contact Form 7** + the **CF7 to REST API** add-on, or **WPForms** | The frontend contact form (`src/components/sections/contact-form.tsx`) posts JSON to `/api/contact`; that Next.js route is a thin proxy stub — point it at whichever plugin's REST/webhook endpoint the client prefers (documented inline in `src/app/api/contact/route.ts`) |
| SEO fields (optional but recommended) | **Yoast SEO** or **Rank Math** | Gives editors title/description control per page without touching code |

## 2. Global "Site Settings" (ACF Options Page)

Create one ACF **Options Page** ("Site Settings", one instance per language
via Polylang) with these fields — this is the header, footer, and contact
details that appear on every page:

- `logo` (Image) — header logo
- `logo_footer` (Image) — footer logo (currently a white/reversed version)
- `phone` (Text)
- `email` (Text)
- `address` (Text)
- `social_links` (Repeater: `network` select [tiktok/twitter/instagram/facebook/linkedin/youtube], `url` Text)
- `primary_nav` (Repeater: `label` Text, `href` Text/Page Link) — powers the header menu
- `footer_about` (Textarea)
- `footer_tagline` (Text)
- `footer_quick_links` (Repeater: `label` Text, `href` Page Link)
- `footer_copyright` (Text)

→ maps to `SiteSettings` in `src/lib/cms/types.ts`.

## 3. Per-page field groups

Each page below is an ACF **Flexible Content** or plain field group attached
to that WordPress Page (by template or by page slug). Field names in
parentheses are suggested ACF field names; they don't have to match exactly —
whoever wires up `fetch.ts` just needs to map WP's JSON shape to the
TypeScript types once.

### Home (`home`)
- Hero: heading, subheading, body (textarea), image, CTA (link)
- Executive Secretary's Address: heading, body (WYSIWYG), established label, 2 images
- Who We Are: heading, body, CTA link, **pillars** repeater (icon picker, title, text) × 4
- Why ACOSA: body (textarea), CTA text
- About teaser: heading, vision heading/text, mission heading/text, CTA link, image
- Story teaser: heading, subheading, body, CTA link
- Future cards: heading, **cards** repeater (icon, title, text) × 4
- Testimonials: heading, **items** repeater (quote, name, role, avatar)
- Blog: heading — leave the posts themselves to WordPress's native Post type (see below), don't hardcode them in ACF
- Contact CTA: heading, subheading, tagline, CTA link

### About Us (`about-us`)
Combines what are currently three separate live pages (Our Story, Who We Are,
Vision & Mission) into one editable page with four Flexible Content blocks:
`intro` (mission/vision + image), `story` (heading, body, member-countries
repeater of plain text, pillars repeater, CTA), `who_we_are` (heading, body,
image, pillars repeater, "why" body), `core_values` (heading, values repeater
of title+text, image).

### What We Do (`what-we-do`)
- heading, intro (text)
- `focus_areas` repeater × 8: icon picker, title, text

### ACOSA Summit (`acosa-summit`)
- heading, edition, theme, dates, location, 2 images
- about (textarea), legacy_note (textarea)
- `objectives` repeater (plain text) × N
- `audience` repeater (plain text) × N
- `activities` repeater (icon, text) × N
- contact: name, email, cc_email, website, address, phone
- CTA link
- **Note:** this currently holds the *2025* summit content because that's
  all that exists on the live site. When the client has 2027 copy, either
  add year-versioned fields or (cleaner) make this an ACF Flexible Content
  block per edition so past summits stay archived.

### Contact (`contact`)
- heading, subheading, intro (textarea)
- methods: call label, phone, email label, email, address label, address
- map: lat (number), lng (number), zoom (number), label — **replace the
  placeholder coordinates in `src/lib/cms/data/contact.en.ts` with the real
  pin for Ngong Hills Business Center once confirmed**
- form heading

### Blog / News & Updates
Not part of this build phase, but noted for later: use WordPress's native
Posts (title, featured image, excerpt, content) rather than ACF — that's
what WordPress is already good at, and it's what the current blog teaser on
the homepage is designed to pull from (`/wp-json/wp/v2/posts`).

## 4. Wiring it up (for the developer)

1. Set `WP_API_URL` in the Next.js environment (e.g.
   `WP_API_URL=https://cms.theacosa.com`).
2. In `src/lib/cms/fetch.ts`, `USE_WORDPRESS` automatically flips to `true`
   once that env var is set, and every `get*Page()` function switches from
   local seed data to a real `fetch()` call.
3. Build one small custom WP REST route per page (`/wp-json/theacosa/v1/page/home`,
   `.../about-us`, etc.) that assembles the ACF fields into the exact JSON
   shape in `src/lib/cms/types.ts` — this is a ~20-line `register_rest_route()`
   callback per page in the theme's `functions.php`, and it means the
   frontend never has to know about ACF's raw field-group JSON shape.
4. Content is revalidated every 60 seconds (`next: { revalidate: 60 }`) —
   an editor's change in wp-admin appears on the live site within a minute,
   no redeploy needed.

## 5. What the client can edit day-to-day, once this is wired up

- **Every image** on every page (hero photo, section photos, pillar icons if
  swapped to an image field instead of the built-in icon set)
- **Every heading, paragraph, and button label**
- **Every link** (nav items, footer links, CTA buttons)
- **The navigation menu and footer** (site-wide, from the Options page)
- **Phone/email/address** (site-wide)
- **The French translation of every field above**, via Polylang's normal
  side-by-side translation screen
- **Blog posts**, using WordPress's ordinary post editor

No code changes or redeploys required for any of the above once the backend
is connected.
