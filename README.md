# OKOMALL

Salon & beauty booking website — find salons, compare prices, pick a professional and a time, and book in under a minute.

**Live:** https://yashu10.github.io/OKOMALL/

Static site (HTML, CSS, vanilla JS, hash router). No build step.

## Features
- Home: search, categories, free-today salons, offers, reviews, neighbourhoods, app promo, FAQ
- Search with filters, sorting, map pins and an **area picker** (salons in your area first)
- Salon page: services, team, reviews, hours, similar salons
- 4-step booking flow with offers applied automatically
- Log in / Sign up (demo OTP `1234`), My appointments (reschedule, cancel, rate), Saved salons
- **List your salon** partner application, Terms and Privacy pages
- Responsive (mobile-first), accessible (skip link, focus states, reduced motion), installable (web manifest)

## Run locally
```bash
npm install        # only needed for tests
npm start          # http://localhost:4173
```
or just open `index.html` in a browser.

## Tests
End-to-end smoke test with Playwright (login, signup, booking, partner form, mobile layout, broken images):
```bash
npx playwright install chromium
npm test
```
The same test runs in GitHub Actions on every push (`.github/workflows/ci.yml`).

## Demo account
Mobile `98980 11223`, code `1234`.

## Notes
- This is a front-end prototype: accounts, bookings, saved salons and partner applications are stored in the browser (`localStorage`). A real launch needs a backend (auth/SMS OTP, database, salon dashboard).
- Photos are CC0 images from StockSnap.
- Deployed with GitHub Pages (Settings → Pages → Deploy from branch `main`).
