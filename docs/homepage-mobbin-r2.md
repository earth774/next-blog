# Homepage polish, round 2

Branch: `feat/homepage-mobbin-polish`. Local changes only.

## Scope

- Masthead: Earth, full name Sutthiphong Nuanma, role and location; reuse `public/profile.jpg`.
- Featured Agent Skills article: generated editorial cover above the title.
- Excaflow, Lamoon and Color Picker: generated covers, responsive sizing and aligned card actions.
- Existing cream/forest-green visual system, post selection, links and project descriptions preserved.
- Homepage-only cover mapping in `src/app/page.tsx` prefers the featured post's existing image. Add a slug entry when future homepage content needs a generated cover.
- Optional shared PostMeta extraction deferred; its existing homepage and blog presentations differ.

## Assets

All four images were created with built-in Codex image generation, then converted with `cwebp -q 80`. No stock downloads. Original generated PNGs are outside the repository; the optimized WebP deliverables are committed.

| Asset | Dimensions | Bytes |
| --- | --- | ---: |
| `public/images/posts/claude-cursor-skills-skill-md.webp` | 1200 × 800 | 61,572 |
| `public/images/projects/excaflow.webp` | 960 × 640 | 60,026 |
| `public/images/projects/lamoon.webp` | 960 × 640 | 50,058 |
| `public/images/projects/color-picker.webp` | 960 × 640 | 57,726 |

Images use `next/image`, explicit dimensions, responsive `sizes`, and empty alt text because they are decorative within links already named by their headings. The existing avatar has a descriptive name. New hover scaling respects reduced motion.

## Generation prompts

### agent-skills

Create one wide landscape editorial cover illustration, 1536 by 1024 composition, for a software developer's refined personal portfolio. Art direction: tactile paper sculpture and matte clay still-life, warm ivory background (#f7f5f0), forest green (#2d5016), sage, charcoal and restrained terracotta. Soft natural side lighting, crisp crafted edges, sophisticated independent magazine photography, subtle tangible paper grain. Subject fills central 75 percent, generous breathing room, legible when cropped to 16:10 or 2:1. No typography, letters, numerals, logos, watermarks, UI screenshots, or people. Subject: reusable knowledge for AI coding agents. Three open paper file folders holding neatly layered instruction sheets and tabbed reference cards, linked by a few dark green threads to one small central sculptural hub. One sheet unfolds step by step like an accordion to suggest progressive disclosure. A terracotta card distinguishes one bundle. Editorial metaphor, precise and calm, no robots.

### excaflow

Create one wide landscape editorial cover illustration, 1536 by 1024 composition, for a software developer's refined personal portfolio. Art direction: tactile paper sculpture and matte clay still-life, warm ivory background (#f7f5f0), forest green (#2d5016), sage, charcoal and restrained terracotta. Soft natural side lighting, crisp crafted edges, sophisticated independent magazine photography, subtle tangible paper grain. Subject fills central 75 percent, generous breathing room, legible when cropped to 16:10 or 2:1. No typography, letters, numerals, logos, watermarks, UI screenshots, or people. Subject: a collaborative drawing whiteboard. A small cream drawing board lying at a slight angle, with a few confident forest-green hand drawn paths joining ochre and terracotta paper notes, a pencil and a green marker beside it. The board contains only abstract sketches, no text. Tangible workspace, focus on collaborative creativity and flowing ideas. Avoid generic office photography.

### lamoon

Create one wide landscape editorial cover illustration, 1536 by 1024 composition, for a software developer's refined personal portfolio. Art direction: tactile paper sculpture and matte clay still-life, warm ivory background (#f7f5f0), forest green (#2d5016), sage, charcoal and restrained terracotta. Soft natural side lighting, crisp crafted edges, sophisticated independent magazine photography, subtle tangible paper grain. Subject fills central 75 percent, generous breathing room, legible when cropped to 16:10 or 2:1. No typography, letters, numerals, logos, watermarks, UI screenshots, or people. Subject: personal income and expense tracking. An open cream ledger with rows of simple dark green strokes, a small arrangement of matte sage and terracotta coin-shaped discs without symbols, two neatly folded receipts without writing and a forest-green pencil. The paper and coins form an intimate, balanced still-life. Human, calm, approachable bookkeeping. No currency signs, numbers, or charts implying real data.

### color-picker

Create one wide landscape editorial cover illustration, 1536 by 1024 composition, for a software developer's refined personal portfolio. Art direction: tactile paper sculpture and matte clay still-life, warm ivory background (#f7f5f0), forest green (#2d5016), sage, charcoal and restrained terracotta. Soft natural side lighting, crisp crafted edges, sophisticated independent magazine photography, subtle tangible paper grain. Subject fills central 75 percent, generous breathing room, legible when cropped to 16:10 or 2:1. No typography, letters, numerals, logos, watermarks, UI screenshots, or people. Subject: a color picker tool. A beautifully fanned stack of physical color swatch cards in forest green, sage, butter yellow, dusty terracotta, muted sky blue and cream. One small matte eyedropper pipette lies diagonally beside them. Strong nuanced pigment colors with realistic paper texture, harmonious artistic studio still-life, centered broad fan composition, no printing or text.

## Preview

```sh
npm install
npm run build
npm run start -- --hostname 127.0.0.1 --port 3100
```

Open http://127.0.0.1:3100/. Alternatively, use `npm run dev -- --port 3100` for editing.

Check the masthead, featured cover/title and all three project covers at 390 px, 768 px and desktop widths, in light and dark appearance. Tab through the links and open the featured article, Blog, Projects and About. Project links retain their original destinations and open in a new tab.

## Validation

- `npx tsc --noEmit`: passed.
- `npm run lint`: passed.
- `npm run build`: passed (48 routes); existing advisory about outdated `baseline-browser-mapping` data.
- Impeccable detector on `src/app/page.tsx`: no findings.
- `git diff --check`: passed.
- Production HTML assertions: full name/role, all four covers, dimensions/sizes, featured and navigation destinations, and external-link protection passed.
- All four Next.js image optimizer requests: HTTP 200.
- Visual review in Safari responsive mode at 390 × 844, 768 × 1024 and 1440 × 900: masthead, featured cover and project layouts checked; mobile menu expanded and collapsed successfully. Physical-device and dark-appearance checks were not performed.

