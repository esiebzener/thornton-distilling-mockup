# Thornton Distilling — Sitemap Audit & Recommendation

Walked both sites. Findings + recommended new architecture below.

---

## Current production site (`thorntondistilling.com`)

25 distinct pages, on Avada theme. Bloated, redundant, with several broken sections.

```
/                          Home (carousel + 9-tile grid)
/spirits/                  Our Spirits hub
/find-your-spirit/         Find Dead Drop
/bourbon-whiskey/          Bourbon SKU
/american-pecan-bourbon/   Pecan Bourbon SKU
/old-fashioned/            Old Fashioned RTD SKU
/gin/                      Gin SKU
/louchifer-absinthe-blanche/  Absinthe SKU
/vodka/                    Vodka SKU
/dark-rum/                 Dark Rum SKU
/silver-rum/               Silver Rum SKU
/private-labeling/         Private labeling
/barrels/                  Custom barrel program
/our-story/                Story
/history/                  History          ← DUPLICATES /our-story/
/news/                     News             ← currently broken (Instagram plugin)
/private-events/           Host an Event
/weddings-2/               Weddings
/visit/                    Visit
/tours/                    Tours
/restaurant-menu/          Restaurant Menu  ← currently broken (Instagram plugin)
/gift-card/                Gift Cards
/contact/                  Contact
/faq/                      FAQs (consolidated)
/media-kit/                Media Kit
DINE button                External Toast reservation link
```

**Problems:**
- `/our-story/` and `/history/` overlap heavily — should be one page.
- `/news/` and `/restaurant-menu/` are broken (Instagram-feed dependency).
- Per-SKU pages exist but are inconsistent with how Dead Drop is currently marketed (staging dropped them all into one `/spirits/` page).
- 9-tile category grid on the homepage is the opposite of the "three doors" model you actually want.

---

## Current staging site (`z2o.327.myftpupload.com`)

12 pages. Major consolidation from production — closer to right scope, but missing the new ASM brand entirely.

```
/                          Home (hero + 3-card funnel) ← 3-door pattern, but cards are below a hero
/our-story/                Story + timeline (good)
/spirits/                  Dead Drop Spirits landing (age-gated)
/find-dead-drop/           Where to buy
/barrels/                  Custom barrels
/distribution/             Retail partners
/private-labeling/         Co-packing
/media-kit/                Media kit
/restaurant/               Restaurant landing
/events/                   Events landing
/tours/                    Tours
/contact/                  Contact + Gift Cards combined (Hours & Directions in nav points here)
```

**Problems:**
- **No Thornton Single Malt presence anywhere.** That's the biggest gap — the new ASM brand needs its own landing + per-SKU pages.
- **No per-SKU pages for Dead Drop either.** All Dead Drop SKUs collapsed into one age-gated page. That works for browsing but loses SEO + makes shareable-link marketing harder.
- **Spirits "door" currently points to Dead Drop only.** Once Thornton Single Malt joins, the door needs to land on a Spirits *hub* that splits Dead Drop vs. Thornton Single Malt.
- **Contact page does double-duty as Gift Cards AND Hours & Directions.** Should be split.
- **Homepage still leads with a hero, not the three doors as you described.** This is what we're fixing in the redesign.

---

## Recommended new architecture (Phase 1 — for launch)

Multi-page, no long-scroll. Homepage IS the three-door choice (no hero above it).

```
/                          THREE-DOOR LANDING (the new homepage — see Variant C)

─── SPIRITS DOOR ───────────────────────────
/spirits/                  Spirits hub — split into:
  /spirits/dead-drop/        Dead Drop landing (= today's /spirits/ on staging)
  /spirits/single-malt/      Thornton Single Malt landing (Variant B hero)  ← NEW
/spirits/barrels/          Custom barrel program
/spirits/find/             Find Dead Drop (was /find-dead-drop/)
/spirits/distribution/     Retail partners
/spirits/private-labeling/ Co-packing
/spirits/media-kit/        Media kit (could be footer-only)

─── RESTAURANT DOOR ────────────────────────
/restaurant/               Restaurant landing
/restaurant/menu/          Menu page (fix the broken Instagram approach)
                           Reserve → external Toast

─── EVENTS DOOR ────────────────────────────
/events/                   Events landing
/events/weddings/          Weddings
/events/inquire/           Inquiry form

─── SHARED / TOP-LEVEL ─────────────────────
/our-story/                Heritage + founders + timeline (kill /history/ duplicate)
/tours/                    Tour & taste
/visit/                    Directions / hours / parking / what to expect  ← SPLIT from contact
/contact/                  Just contact form + info        ← SPLIT
/gift-cards/               Just gift cards                  ← SPLIT
/faq/                      Optional — or keep per-page FAQs (which staging does well)
```

**Three doors at the top stay persistent.** On every subpage of an experience, a small "I. SPIRITS · II. RESTAURANT · III. EVENTS" toggle stays in the header so users can horizontally jump between worlds (this exists on staging already — keep it, refine it).

## Phase 2 (post-launch)

- Per-SKU pages for Dead Drop (Bourbon, Pecan Bourbon, Old Fashioned RTD, Gin, Absinthe, Vodka, Dark Rum, Silver Rum) — for SEO + shareable shop links.
- Per-SKU pages for Thornton Single Malt (Signature Malt, Prairie Peat, Single Cask).
- Heritage micro-pages (The Well · The Building · 1857) — small, ornate, almanac-style.
- News / press feed (replace broken Instagram dependency with a proper WP posts feed or a curated press list).
- Shop / e-commerce if you sell direct.

---

## Photography audit

Did not pull from WP media library yet — that's the next ask. Two paths:
1. I can navigate `wp-admin/upload.php` in this session and inventory what's there.
2. You can drop usable photos from `Weiss Properties/Company Folders/Blackstone/pics/` into `Thornton Distilling/website-mockups/photos/`.

For both Variant A and Variant B mockups, the single biggest quality jump comes from real photography of: the brewery exterior, the limestone vault interior, the artesian well, the copper still, the barrel room, and event-space dressing.
