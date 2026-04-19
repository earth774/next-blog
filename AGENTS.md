## Learned User Preferences

- When the topic is Anthropic's visual/UI design product, use the product name **Claude Design** rather than referring to it only as "Claude."
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
- Blog posts are Markdown files at `src/content/posts/<slug>/<slug>.md` and are loaded via `getAllPosts` in `src/lib/posts.ts`.
- Repo-root `BLOG_TECH_TASK_LIST.md` holds the tech blog editorial backlog and per-article task checklists.
- Substantial new posts often follow a draft-then-polish flow: article-writer (or equivalent) first, then article-reviewer for accuracy and wording.
- The blog index uses client-side pagination in `src/app/blog/BlogClient.tsx` (a fixed posts-per-page constant).
