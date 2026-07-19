# SwimTG — Design System

**Version:** 2.0
**Status:** Draft
**Owner:** Design
**Supersedes:** v1.0 ("SwimForge" pool-deck theme) — fully replaced, not extended.

---

## 1. Design Personality

SwimTG's UI takes its cues from calm, content-first productivity tools rather than a "sports app" look: a fixed left sidebar for primary navigation, a sticky page header carrying the current section's title, and an unadorned neutral canvas for content. The interface should stay out of the way of the data (workouts, sets, messages) it's displaying.

**Personality in three words:** Calm. Neutral. Direct.

- **Calm** — a restrained near-white/grey palette with a single blue accent, used sparingly (links, active nav state, focus rings).
- **Neutral** — no illustrative color story; every token is a functional surface, text, or state color, not a metaphor.
- **Direct** — content sits in a fixed-width column under a plain header; no decorative chrome competes with it.

**What we are not:** we are not the previous "pool deck instrumentation" concept (no navy/teal/yellow palette, no condensed display type, no pace-clock motif) — none of that is portable to this system's premise.

---

## 2. Color System

### 2.1 Core & semantic palette

| Token | Hex / value | Primary use |
|---|---|---|
| `$color-bg-primary` | `#F9F9F9` | App background |
| `$color-bg-surface` | `#FFFFFF` | Cards, list surfaces |
| `$color-bg-secondary` | `#EFEFEF` | Secondary surfaces |
| `$color-bg-hover` | `#F0F0F0` | Hover state background |
| `$color-bg-selected` | `#EFEFEF` | Selected-row background |
| `$color-sidebar-bg` | `#FFFFFF` | Sidebar background |
| `$color-sidebar-active-bg` | `#E8F0FE` | Active nav-link background |
| `$color-header-bg` | `#FFFFFF` | Page header background |
| `$color-notification-bg` | `#2F2F2F` | Notification/toast surface |
| `$color-overlay` | `rgba(0,0,0,.5)` | Mobile menu backdrop |
| `$color-text-primary` | `#37352F` | Primary text |
| `$color-text-secondary` | `#787774` | Secondary text, icons |
| `$color-text-muted` | `#9B9A97` | Muted/placeholder text |
| `$color-text-inverse` | `#FFFFFF` | Text on dark/accent surfaces |
| `$color-border` | `#E3E3E3` | Default hairline border |
| `$color-border-light` | `#EDEDED` | Lighter hairline border |
| `$color-accent` | `#007AFF` | Links, active state, focus |
| `$color-accent-hover` | `#0056B3` | Accent hover |
| `$color-focus-ring` | `rgba(0,122,255,.2)` | Focus ring halo |
| `$color-error` / `$color-error-bg` | `#B91C1C` / `#FEF2F2` | Error text / surface |
| `$color-destructive` / `-hover` | `#DC2626` / `#B91C1C` | Destructive actions |
| `$color-success` / `-hover` | `#16A34A` / `#15803D` | Success state |
| `$color-info` / `-hover` | `#0B7DDA` / `#0967B8` | Informational state |
| `$color-neutral` / `-hover` | `#757575` / `#616161` | Neutral state |
| `$color-purple`, `$color-emerald` | `#7C3AED`, `#10B981` | Extended accents (stat icons) |

### 2.2 Status badge colors

| Status | Background | Text |
|---|---|---|
| Completed | `#DCFCE7` | `#16A34A` |
| Processing | `#DBEAFE` | `#2563EB` |
| Pending | `#FEF3C7` | `#D97706` |
| Failed | `#FEE2E2` | `#B91C1C` |
| Cancelled | `#F3F4F6` | `#6B7280` |

### 2.3 Dark mode

Not implemented. Open question — see §8.

---

## 3. Typography

No custom webfonts. Body/UI text uses the OS system font stack:

```
-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu,
Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif
```

### 3.1 Type scale

| Token | Size | Use |
|---|---|---|
| `$font-size-xs` | 12px | Secondary/meta text (e.g. list-item subtitle) |
| `$font-size-sm` | 14px | Small UI text |
| `$font-size-base` | 15px | Default body text (`<body>`) |
| `$font-size-md` | 16px | Nav links, page content |
| `$font-size-lg` | 18px | Sidebar brand mark |
| `$font-size-xl` | 20px | Section subheadings |
| `$font-size-2xl` | 24px | Page title (mobile) |
| `$font-size-3xl` | 32px | Page title (desktop, `.page-title`) |
| `$font-size-display` | 40px | Reserved for hero/display numbers |

Line heights: `$line-height-tight` 1.35, `$line-height-body` 1.6 (default), `$line-height-relaxed` 1.7.
Weights: `$font-weight-normal` 400, `$font-weight-medium` 500, `$font-weight-semibold` 600, `$font-weight-bold` 700.

---

## 4. Layout & Spacing

### 4.1 Spacing scale (8px-adjacent, px values)

`$space-xs` 4 · `$space-sm` 8 · `$space-md` 12 · `$space-lg` 16 · `$space-xl` 20 · `$space-2xl` 24 · `$space-3xl` 32 · `$space-4xl` 40 · `$space-5xl` 48 · `$space-6xl` 60 · `$space-8xl` 80.

### 4.2 Layout constants

| Token | Value |
|---|---|
| `$sidebar-width` | 260px |
| `$sidebar-width-mobile` | 280px |
| `$content-max-width` | 720px |
| `$content-max-width-wide` | 800px |
| `$breakpoint-mobile` | 768px |
| `$breakpoint-narrow` | 600px |

### 4.3 Shell layout — sidebar on the left (LTR)

The app shell (`AppLayout`) is a fixed-position left sidebar (`NavigationSidebar`, width `$sidebar-width`) plus a main content column offset by `margin-left: $sidebar-width`, containing a sticky `Header` and a scrollable content body. **This is a deliberate, permanent LTR layout** — the source this system was ported from was RTL (sidebar on the right); every positioning rule (`left`/`right`, `border-right`/`border-left`, off-canvas transform direction) was flipped for LTR and that flip is the intended, final state, not a temporary artifact.

Below `$breakpoint-mobile`, the sidebar goes off-canvas (`translateX(-100%)`), toggled open via a hamburger button in `Header` and closed via an X button in the sidebar's own header or by tapping the backdrop overlay; `.main-content` drops its `margin-left` to 0 in this state.

### 4.4 Radii & shadows

Radii: `$radius-sm` 4px, `$radius-md` 8px, `$radius-lg` 12px.
Shadows: `$shadow-sm` `0 2px 4px rgba(0,0,0,.06)`, `$shadow-md` `0 4px 6px rgba(0,0,0,.1)`, `$shadow-lg` `0 4px 12px rgba(0,0,0,.1)`, `$shadow-xl` `0 8px 32px rgba(0,0,0,.2)`. Not yet applied anywhere by default — surfaces are flat with hairline borders; reserve shadows for true overlays (mobile menu, future modals/dropdowns).

---

## 5. Components (key patterns)

### 5.1 `AppLayout` (`src/layout/app-layout/`)
The app shell: composes `NavigationSidebar` + `Header` + a `<router-outlet>`, owns the mobile menu open/closed signal, and derives the current page title from the active route's `data.title` (see §7) rather than each page managing its own title.

### 5.2 `Header` (`src/layout/header/`)
Sticky `.page-header` (padding `25.5px $space-3xl`, `$color-header-bg`, bottom hairline border) showing `.page-title` (`$font-size-3xl` / `$font-weight-semibold`) and, on mobile only, a hamburger button that opens the sidebar. Responsive: padding drops to `$space-lg $space-2xl` and title to `$font-size-2xl` at `$breakpoint-mobile`.

### 5.3 `NavigationSidebar` (`src/layout/navigation-sidebar/`)
Fixed sidebar with a brand mark ("SwimTG"), a `.nav-list` of icon + label + active-dot links (`routerLinkActive="active"` drives the accent background/dot/icon-color states), and a `.nav-auth` footer with static "Sign in" / "Sign up" links (no auth state — this app has no `AuthService` yet; these are placeholders, not wired to anything). On mobile, gains a close (X) button and slides in/out via `translateX`.

### 5.4 `list` / `list-item` (`src/shared/list/`)
Generic reusable list: `.app-list` (`$color-bg-surface` surface, `$radius-md` corners) of `.list-item` rows (44px min-height, circular avatar with fallback-image support, stacked title/subtitle using `$color-text-primary`/`$color-text-secondary`).

### 5.5 Empty/placeholder pages
`TrainingBuilder` and `Messages` (`src/pages/`) are minimal "coming soon" placeholders — single paragraph, `$color-text-secondary`, `$font-size-md` — until real content is built.

---

## 6. Accessibility

- `NavigationSidebar` renders as `role="dialog" aria-modal="true" aria-label="Navigation menu"`; its mobile close button and `Header`'s hamburger both carry explicit `aria-label`s ("Close menu" / "Open menu").
- Nav-link and list-item touch targets are ≥44px tall for comfortable tap targets.
- Focus states use `$color-accent` as a 2px outline (`outline-offset: -2px`), suppressed only for non-keyboard focus (`:focus:not(:focus-visible)`).
- Active nav state is never color-only: the active link also gets a background tint (`$color-sidebar-active-bg`), bold text weight, and a filled dot indicator.

---

## 7. Implementation Notes (Angular)

- All tokens live in a single Sass partial, `src/styles/_tokens.scss`, as pure `$variable` values (no CSS custom properties, no `:root` block, no per-component overrides) — component SCSS never hardcodes a color/spacing/radius value.
- Every component in this repo lives two levels below `src/` (`src/<category>/<name>/file.scss`), so **every component SCSS file** consumes tokens the same way:
  ```scss
  @use '../../styles/tokens' as *;
  ```
  The one exception is the top-level global stylesheet, `src/styles.scss` (a sibling of `src/styles/`), which uses:
  ```scss
  @use 'styles/tokens' as *;
  ```
- No global type-scale or spacing utility classes — components reference `$font-size-*`, `$space-*`, etc. directly in their own SCSS.
- Component file convention: `xxx.ts` / `xxx.html` / `xxx.scss`, PascalCase class with no `Component` suffix (e.g. `AppLayout`, `Header`, `NavigationSidebar`) for anything new. The pre-existing `list.component.ts`/`list-item.component.ts` pair keeps its original `.component.` naming — not retrofitted.
- Page titles flow one-way: a route sets `data: { title: '...' }` in `app.routes.ts`; `AppLayout` reads it (synchronously on init, then on every `NavigationEnd`) and passes it into `Header` as an input. Adding a new page only requires setting its route's `data.title` — no per-page title boilerplate.
- No CSS-in-JS, no CSS custom properties, no `data-theme` attribute — this system has no theming layer yet (see §8).

---

## 8. Open Questions

- Dark mode is not implemented in this system (the prior SwimForge system had one). Revisit if/when needed.
- Should "Sign in" / "Sign up" become real routed pages once auth exists, replacing the current inert placeholder links?
- `TrainingBuilder` and `Messages` are empty placeholders — define real content/scope for both.
- The app currently hand-authors every icon as inline SVG (wave-lines, pencil, chat-bubble, hamburger, close/X). Revisit adopting an icon library if this set keeps growing.
