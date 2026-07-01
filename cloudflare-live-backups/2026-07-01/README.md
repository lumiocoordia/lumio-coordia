# Cloudflare Live Backup - 2026-07-01

This folder stores the static website files that were deployed live to Cloudflare Pages for LUMIO Coordia Intelligence.

## Live URL

https://lumio-coordia-intelligence.pages.dev/

## Backup Contents

- `site/` contains the deployable static Cloudflare Pages output.
- The equivalent Cloudflare Pages output directory is `site/`.
- Build command: none.

## Collaboration Rule

For LUMIO website changes, GitHub should be updated before Cloudflare live deployment.

If a direct Cloudflare update happens first, backfill that exact live version into GitHub before starting the next change. This keeps Charles, Vincent, Codex, Claude AI, and future agents aligned on the same source state.

## Deploy Command

```bash
wrangler pages deploy site --project-name lumio-coordia-intelligence --branch main
```
