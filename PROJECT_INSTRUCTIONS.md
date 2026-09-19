# Paste this into Project settings > Memory > Project instructions

Not read by anything automatically. It lives here so it is version controlled
with the site it describes, and so a thread that clones this repo can see the
rules it was started with. Keep it in step with CLAUDE.md in the parent folder.

Limit is 16,000 characters. This is about 2,400.

---

This project is the SondarLogic marketing site at sondarlogic.com, in the
sondarlogic-site repository. The site sells a receipt validation engine that
pays consumer rebate claims the same day instead of the usual 6 to 8 weeks.

## How the site is built

React, Vite, prerendered. Read `scripts/prerender.mjs` before changing routing.

Pure inline styles only. Never introduce Tailwind, CSS modules or an external
stylesheet. Tailwind is still in package.json from an old scaffold and is not
used. Leave it alone and do not start using it.

Content pages are data in `src/pages.js`, drawn by one ContentPage renderer in
`src/App.jsx`. Adding a page is one edit to `src/pages.js`. The prerender step
picks routes up from the same export, so titles and canonicals stay in step on
their own.

Every page must end up with exactly one h1, a unique title and description, a
correct canonical, and FAQ plus breadcrumb schema.

## Writing rules, which matter more than the code

Short sentences. If a sentence needs a comma to hold it together, split it.
Well under 16 words.

Digits for every quantity. 10 seconds, 6 to 8 weeks, 15 minutes, 10 business
days. Never spelled out.

Name the thing. Never open a sentence on a bare "this", "that" or "it". Say
"the validation engine", "the receipt", "the demo".

It is a validation engine. Never "checking". Never a bare "the engine".

Be specific enough to picture. Not "the data" but store name, city, date,
total spend, product lines, competitor brands in the basket.

No em dashes. No semicolons. No hyphens in compound modifiers.

Nothing clever. No setup lines before the point, no phrases that sound pleased
with themselves. Polish reads as sales pressure here.

## Hard limits on what the site may say

Never describe SondarLogic as an artificial intelligence company or a
financial services company. It is a marketing automation and fulfillment
business. This is deliberate and regulatory, not stylistic.

Never publish a per claim rate, a tier breakpoint or a volume discount. Use
model language and a quote CTA.

Say what the validation engine catches. Never how it decides. A published
method is a method somebody works around.

Never claim SondarLogic holds a SOC 2 report. The infrastructure is SOC 2 Type
II certified and the company is not. Attribute it to the hosting layer, as
/security already does, and do not drift from that wording.

Lead with speed as the differentiator. Fraud detection is a by product.

## How to work

Branch from main and open one pull request per thread. Say in your first
message what you changed and why.

Before calling work done: `npm run build`, then confirm every route landed in
`dist/` and that each new page has one h1 and valid JSON-LD. Do not trust the
build log alone.

Never verify a route with `vite preview`. It has an SPA fallback that serves
index.html for any unknown path, so it returns a green result for a page that
does not exist. Serve `dist/` with a plain static server instead.

If you cannot reach something you need, a repository, a credential, an API,
say exactly what is missing in your first message and stop. Do not substitute,
mock or guess.

Do not change the pricing section, the FAQ answers or the hero copy without
asking me in the thread first. Those were tuned deliberately.

Do not merge, force push or change the Vercel config without asking.
