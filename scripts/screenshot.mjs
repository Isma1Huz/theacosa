import { chromium } from "playwright";
import fs from "node:fs";

const pages = [
  { path: "/en", name: "home" },
  { path: "/en/about-us", name: "about" },
  { path: "/en/what-we-do", name: "what-we-do" },
  { path: "/en/acosa-summit", name: "summit" },
  { path: "/en/contact", name: "contact" },
];

const viewports = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
};

fs.mkdirSync("/tmp/shots", { recursive: true });

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });

for (const [vpName, vp] of Object.entries(viewports)) {
  const context = await browser.newContext({ viewport: vp });
  const page = await context.newPage();
  for (const p of pages) {
    await page.goto(`http://localhost:3000${p.path}`, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(300);
    // Scroll incrementally so framer-motion's whileInView (IntersectionObserver)
    // actually fires for every section before the full-page screenshot.
    const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
    const step = vp.height * 0.8;
    for (let y = 0; y < scrollHeight; y += step) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      await page.waitForTimeout(180);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    await page.screenshot({ path: `/tmp/shots/${p.name}-${vpName}.png`, fullPage: true });
    console.log(`shot: ${p.name}-${vpName}`);
  }
  await context.close();
}

await browser.close();
