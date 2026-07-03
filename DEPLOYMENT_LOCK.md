# LUMIO Deployment Lock

This repository is the source of record for the LUMIO Coordia Intelligence website.

Live site:

- https://lumio-coordia-intelligence.pages.dev/

Cloudflare Pages project:

- `lumio-coordia-intelligence`

## Required Order

1. Start from the latest `origin/main`.
2. Apply changes on a branch.
3. Open a GitHub PR.
4. Merge the PR into `main`.
5. Deploy the merged `dist` folder to Cloudflare Pages.
6. Verify GitHub, Cloudflare preview, and the public live URL before reporting done.

Do not deploy from an old local worktree, backup folder, detached test folder, or previous branch unless it has first been compared with `origin/main` and merged through GitHub.

## Current Baseline Markers

The current approved LUMIO website baseline must include these markers in `dist/index.html` unless Charles explicitly approves replacing the portfolio system:

- `lumio-portfolio-hero-video-cards-20260630`
- `StayFix Dispatch`
- `Paybit Tech`
- `stayfix-dispatch-intake.pages.dev`
- `paybittech.pages.dev`
- `HOTFIX 2026-07-03`

Expected structure:

- 5 portfolio cards.
- 4 portfolio video preview elements.
- StayFix Dispatch as the fourth case.
- Paybit Tech as the fifth Singapore case.
- Mobile hero fit hotfix active.

## Alignment Check

Before reporting completion, verify all three nodes contain the same baseline markers:

1. GitHub `origin/main:dist/index.html`
2. Latest Cloudflare deployment preview URL
3. Public live URL: `https://lumio-coordia-intelligence.pages.dev/`

If any node differs, stop and reconcile before making new design changes.
