## Learned User Preferences

- Prefers Thai for conversational product and UI requests; English remains acceptable for code and technical identifiers when clearer.
- Prefers Lucide React icons over text-only affordances for actions such as external links.
- When Pencil MCP is unavailable, accepts implementing UI from the checked-in `design/amiearth.pen` file instead of blocking on MCP.
- Frequently provides DOM-path snippets from the inspector and prefers precise, incremental UI edits mapped to those targets.

## Learned Workspace Facts

- The home route uses a bespoke layout in `src/app/page.tsx` aligned to `design/amiearth.pen` tokens (`--am-*` variables in `src/app/globals.css`) and intentionally avoids the shared `Header`/`Footer` components used on other routes.
- The Wonderful Webring badge (`webring.wonderful.software` SVG) appears next to Earth branding on the home page.
- Blog workflow Cursor subagents live under `.cursor/agents/`: `article-researcher.md`, `article-writer.md`, and `article-reviewer.md`.
- Third-party scripts in the App Router root layout use `next/script` with `afterInteractive` where raw `<script>` tags risk hydration mismatches.
- Blog route navigation is centralized in `src/app/blog/BlogNav.tsx`, including a mobile `Menu` toggle that reveals `Blog`, `Projects`, and `About` links.
