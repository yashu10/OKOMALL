// End-to-end smoke test: browses the real site in Chromium and checks the main flows.
import { chromium } from 'playwright';
import { serve } from './serve.mjs';

const PORT = 4173;
const BASE = `http://localhost:${PORT}/`;
let failed = 0;
const check = (name, ok, extra = '') => {
  console.log(`${ok ? '✓' : '✗'} ${name}${ok ? '' : ' ' + extra}`);
  if (!ok) failed++;
};

const server = await serve(PORT);
const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
try {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const p = await ctx.newPage();
  const errors = [];
  p.on('pageerror', (e) => errors.push(e.message));
  p.on('console', (m) => {
    if (m.type() === 'error' && !/fonts\.(googleapis|gstatic)|net::ERR/.test(m.text())) errors.push(m.text());
  });
  const hash = () => p.evaluate(() => location.hash);
  const submit = (form) => p.click(`form[data-form=${form}] button[type=submit]`);

  // Home
  await p.goto(BASE);
  await p.waitForSelector('.hero h1');
  check('home renders hero + sections', (await p.locator('section.section').count()) >= 8);
  check('home has FAQ, reviews and app section', (await p.locator('#faq, #rvs, #app-promo').count()) === 3);
  for (let y = 0; y < 6000; y += 700) {
    await p.evaluate((v) => scrollTo(0, v), y);
    await p.waitForTimeout(80);
  }
  await p.waitForTimeout(400);
  const broken = await p.evaluate(() => [...document.images].filter((i) => i.complete && i.naturalWidth === 0).length);
  check('no broken images on home', broken === 0, `(${broken})`);

  // Guest guards
  await p.goto(BASE + '#/bookings');
  await p.waitForSelector('.auth-card');
  check('guest is sent to login for My appointments', (await hash()).startsWith('#/login'));

  // Login errors + success
  await p.fill('#auth-in', '9000000000');
  await submit('auth');
  check('unknown number shows error', /No account/.test(await p.textContent('#auth-err')));
  await p.fill('#auth-in', '9898011223');
  await submit('auth');
  await p.fill('#auth-in', '0000');
  await submit('auth');
  check('wrong code shows error', /not right/.test(await p.textContent('#auth-err')));
  await p.fill('#auth-in', '1234');
  await submit('auth');
  await p.waitForSelector('.bcard');
  check('login redirects back to appointments', (await hash()) === '#/bookings');

  // Area picker
  await p.click('.loc');
  await p.click('[data-act=setarea][data-v="Koramangala"]');
  await p.goto(BASE + '#/search');
  await p.waitForSelector('.rcard');
  check('area picker puts local salon first', /Kaya|Glow/.test(await p.textContent('.rcard h3')));

  // Booking flow
  await p.goto(BASE + '#/salon/glow');
  await p.waitForSelector('[data-act=svc]');
  await p.locator('[data-act=svc]').first().click();
  await p.locator('#sumcard [data-act=start]').click();
  await p.locator('[data-act=bknext]').first().click();
  await p.locator('[data-act=bknext]').first().click();
  await p.locator('.slotgrid button:not([disabled])').first().click();
  await p.locator('[data-act=bknext]').first().click();
  check('booking reaches review step', /Step 4 of 4/.test(await p.textContent('.bk-top')));
  await p.locator('[data-act=bknext]').first().click();
  await p.waitForSelector('.success');
  check('booking confirmation shown', /Request sent|confirmed/i.test(await p.textContent('.success')));
  await p.goto(BASE + '#/bookings');
  await p.waitForSelector('.bcard');
  check('new booking appears in My appointments', (await p.locator('.bcard').count()) >= 2);

  // Logout
  await p.click('[data-act=umenu]');
  await p.click('#umenu [data-act=logout]');
  await p.click('[data-act=dologout]');
  await p.waitForSelector('a[href="#/signup"]');
  check('logout returns to guest header', (await p.locator('a[href="#/signup"]').count()) > 0);

  // Signup
  await p.goto(BASE + '#/signup');
  await p.waitForSelector('[name=name]');
  await p.fill('[name=name]', 'Test User');
  await p.fill('#auth-in', '9812300001');
  await p.check('[name=terms]');
  await submit('auth');
  await p.fill('#auth-in', '1234');
  await submit('auth');
  await p.waitForSelector('.umenu-wrap');
  check('signup creates and logs in a new account', (await p.evaluate(() => JSON.parse(localStorage.getItem('maison.web.v2')).cur)) === '9812300001');

  // Partner form
  await p.goto(BASE + '#/partner');
  await p.waitForSelector('form[data-form=partner]');
  await submit('partner');
  check('partner form validates', /salon name/i.test(await p.textContent('#pf-err')));
  await p.fill('[name=salon]', 'Smoke Salon');
  await p.fill('[name=owner]', 'Owner');
  await p.fill('[name=ph]', '9812345678');
  await p.fill('[name=email]', 'o@s.com');
  await p.check('[name=cat][value=Hair]');
  await p.check('[name=terms]');
  await submit('partner');
  await p.waitForSelector('.success');
  check('partner application accepted', (await p.evaluate(() => JSON.parse(localStorage.getItem('okomall.leads')).length)) === 1);

  // Static pages
  for (const r of ['offers', 'help', 'terms', 'privacy']) {
    await p.goto(BASE + '#/' + r);
    await p.waitForSelector('#app h1, #app h2');
  }
  check('offers/help/terms/privacy render', true);

  // Mobile: no horizontal overflow
  const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
  for (const r of ['', 'search', 'salon/luma', 'help', 'partner']) {
    await m.goto(BASE + '#/' + r);
    await m.waitForTimeout(350);
    const w = await m.evaluate(() => document.documentElement.scrollWidth);
    check(`mobile #/${r} fits 390px`, w <= 391, `(width ${w})`);
  }

  check('no console/page errors', errors.length === 0, JSON.stringify(errors.slice(0, 3)));
} finally {
  await browser.close();
  server.close();
}
console.log(failed ? `\n${failed} check(s) failed` : '\nAll checks passed');
process.exit(failed ? 1 : 0);
