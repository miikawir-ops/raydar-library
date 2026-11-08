// Table-of-contents check for book pages: the active TOC item (aria-current) must follow the scroll
// position in both directions and after jumps.
//
// Scrolls each book page in 250 px steps down to the bottom and back up, then jumps (bottom -> top,
// bottom -> middle, top -> middle), and at every point compares the active item with the expected one:
//   - above the first section: none or the first item
//   - otherwise: the last section whose top has passed 25 % of the viewport height
//   - at the very bottom of the page: the last section
// Runs at 1440 and 390 px. Exits with code 1 if any check fails.
//
// Usage: npm run build, then npm run preview (in another terminal), then npm run check:toc.
// Another base URL can be given as an argument, e.g. npm run check:toc -- https://library.raydar.fi
// Needs Playwright's Chromium once per machine: npx playwright install chromium
import { chromium } from 'playwright';

const base = (process.argv[2] || 'http://localhost:4321').replace(/\/$/, '');
const slugs = ['kahneman-thinking-fast-and-slow', 'taleb-the-black-swan'];
const viewports = [[1440, 900], [390, 844]];

try {
  await fetch(base + '/');
} catch {
  console.error(`check:toc: ${base} is not reachable. Run "npm run build" and "npm run preview" first.`);
  process.exit(1);
}

const browser = await chromium.launch();
let failures = 0;
let checks = 0;
for (const [w, h] of viewports) {
  for (const slug of slugs) {
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    await page.goto(`${base}/${slug}/`, { waitUntil: 'load' });
    const state = () => page.evaluate(() => {
      const secs = [...document.querySelectorAll('.book-text > section[id]')];
      const line = innerHeight * 0.25;
      let expected = null;
      for (const s of secs) if (s.getBoundingClientRect().top <= line) expected = s.id;
      const atBottom = innerHeight + scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) expected = secs[secs.length - 1].id;
      const cur = document.querySelector('.toc a[aria-current="true"]');
      return { y: Math.round(scrollY), expected, actual: cur ? cur.getAttribute('href').slice(1) : null, first: secs[0].id };
    });
    const go = (y) => page.evaluate((t) => window.scrollTo({ top: t, behavior: 'instant' }), y);
    const bad = [];
    const verify = async (label) => {
      // The page updates the TOC in requestAnimationFrame; wait for two frames so a busy machine
      // that delays rendering cannot produce a false failure.
      await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
      const s = await state();
      const ok = s.expected === null ? s.actual === null || s.actual === s.first : s.actual === s.expected;
      checks++;
      if (!ok) {
        failures++;
        bad.push(`${label} y${s.y}: expected ${s.expected ?? 'none/first'}, got ${s.actual}`);
      }
    };
    const max = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
    const ys = [];
    for (let y = 0; y <= max; y += 250) ys.push(y);
    ys.push(max);
    // 650 ms per step lets the section fade-in (0.5 s, slides 10 px) finish before checking.
    for (const y of ys) { await go(y); await page.waitForTimeout(650); await verify('down'); }
    for (const y of ys.slice().reverse()) { await go(y); await page.waitForTimeout(650); await verify('up'); }
    for (const [label, from, to] of [['jump bottom->top', max, 0], ['jump bottom->middle', max, Math.round(max / 2)], ['jump top->middle', 0, Math.round(max / 2)]]) {
      await go(from); await page.waitForTimeout(300);
      await go(to); await page.waitForTimeout(300);
      await verify(label);
    }
    console.log(`${bad.length ? 'FAIL' : 'PASS'} ${w}px ${slug}${bad.length ? ` (${bad.length})` : ''}`);
    for (const b of bad.slice(0, 8)) console.log('   ' + b);
    await page.close();
  }
}
await browser.close();
console.log(`\ncheck:toc: ${failures} failed of ${checks} checks`);
if (failures) process.exitCode = 1;
