# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

IzbaVit / **Vitality Lab** — single-page marketing site for a holistic body & mind recovery practice. **All user-facing copy is Russian** (`lang="ru"`); the navigation labels and footer links are English as a stylistic choice from the source design. The narrative arc: Hero (промессе) → Founder (Ksenia Erofeeva / Ксения Ерофеева) → Formula (3-stage: gut → blood/lymph → spine) → Spine work (parallax) → Psychosomatics (Evgeniy Erofeev / Евгений Ерофеев) → Lead form → Footer.

Source of truth for visual design: Stitch project `projects/3202404983066293978`, screen `80ea4f40f9404ae28efb95bcd5d0f6bc` ("IzbaVit Parallax Landing"). When the user says "the design", they mean that screen.

## Commands

Node is required (`brew install node`, `volta install node`, or `nvm`). After that:

| Task | Command |
| --- | --- |
| Install deps | `npm install` |
| Dev server (port 4321) | `npm run dev` |
| Production build → `dist/` | `npm run build` |
| Preview production build | `npm run preview` |
| Astro / TS diagnostics | `npm run check` |

No tests yet. If you add any, document the command here.

## Architecture

**Astro 4, file-based routing.** `src/pages/index.astro` composes section components in narrative order. Adding a route = adding a file.

**Tailwind via CDN, not a build step.** `src/layouts/BaseLayout.astro` loads `https://cdn.tailwindcss.com?plugins=forms,container-queries` and inlines the full Vitality Flux theme (colors, font families, font sizes with line-height/weight, spacing, radii) under `tailwind.config = {...}`. This mirrors the Stitch HTML 1:1 so component markup can be copy-pasted from Stitch with zero translation. **Do not** install `tailwindcss` as an npm dep — it would conflict and produce no benefit at this scale.

**Layout.** `src/layouts/BaseLayout.astro` owns `<head>`, Google Fonts (Hanken Grotesk / Inter / JetBrains Mono / Material Symbols Outlined), the Tailwind config, and two inline scripts: a `.reveal` IntersectionObserver (auto-staggers siblings inside `.grid`, `.space-y-gutter`, `.space-y-12`) and the parallax scroll handler that drives `.parallax-bg[data-parallax-speed]`. Every page must render through this layout or those behaviors break.

**Section components.** `src/components/` — one `.astro` file per section. Most carry a small TypeScript data array at the top (e.g. `formula` in `Methodology.astro`, `regions` in `Spine.astro`). To change copy, edit the array — don't duplicate markup.

**Path alias.** `~/*` → `src/*` (`tsconfig.json`). Use `import X from "~/components/X.astro"`.

## Design system — Vitality Flux

All tokens live in **`BaseLayout.astro`** under `tailwind.config.theme.extend`. Components reference them via Tailwind classes (`bg-charcoal-deep`, `text-emerald-electric`, `font-display-lg`, `py-stack-lg`, `px-margin-desktop`). Never hardcode hex values in components; if you need a new shade, add it to the theme.

Critical rules:

- **Colors.** `emerald-electric` (#00D97E) — CTAs, accent words, progress, italic highlights inside headlines. `charcoal-deep` (#121813) — primary headings + the dark hero/spine/contact sections. `primary` (#006d3c) — darker emerald used for italic emphasis on light backgrounds. `accent-gold` (#B8894A) and `off-white` (#F8F9F8) are sparingly used (premium chips, light surface).
- **Dark/light section alternation.** Hero (dark) → Founder (light) → Formula (light `bg-surface`) → Spine (dark + parallax) → Psychosomatics (light) → Contact (dark + radial gradient) → Footer (light). Don't break this rhythm without a strong reason.
- **Typography.** `font-display-lg` = hero/contact H2. `font-headline-lg` = section H2. `font-headline-md` = card titles. `font-body-lg/md` = paragraphs. `font-label-sm` (JetBrains Mono, uppercase, wide tracking) = ALL kickers/eyebrows/metadata — never put it on body copy.
- **Buttons.** Primary CTAs are `rounded-full` pills with `bg-emerald-electric text-charcoal-deep`. The submit button on the lead form uses a heavier `hover:shadow-[0_0_40px_rgba(0,217,126,0.4)]` glow. Both should keep `.vibrating-button` (active-state scale) and `.transition-soft`.
- **Cards.** `rounded-xl` (= 0.75rem in this theme, not Tailwind's default 0.75rem either — confirm against the config), `border border-outline-variant/30`, `hover:border-emerald-electric/50` for interactive cards. Inside dark sections, use `.glass-nav` (frosted 80% white) instead of a plain dark card.
- **Italic accent.** Words rendered as `<span class="italic text-emerald-electric">` (dark bg) or `<span class="italic text-primary">` (light bg) — used once per headline for visual emphasis.

## Conventions

- Markup is copy-paste-compatible with Stitch's export. When refreshing a section from Stitch, paste the markup, swap any inline image URLs in component data, and add `class="reveal"` on the elements you want animating in.
- Section IDs `#recovery #formula #spine #psychosomatics #contact` are public — nav and CTAs link to them. Renaming = breaking those links.
- `.reveal` elements *don't* need `active` in source; the IO adds it. (Stitch's exports include `active` because their preview is static — strip it when porting.)
- The favicon (`public/favicon.svg`) is a placeholder mark. The real header logo is loaded from the Stitch CDN URL in `Header.astro`; replace with a local SVG once branding is finalized.
- Russian copy uses straight quotes only at the source-code level; in rendered text use «» guillemets to match the design.
