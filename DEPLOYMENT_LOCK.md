# LUMIO Deployment Lock

This repository is the source of record for the LUMIO Coordia Intelligence website.

Live site:

- https://lumio-coordia-intelligence.pages.dev/

- Cloudflare Pages project:

- - `lumio-coordia-intelligence`
 
  - ## Required Order
 
  - 1. Start from the latest `origin/main`.
    2. 2. Apply changes on a branch.
       3. 3. Open a GitHub PR.
          4. 4. Merge the PR into `main`.
             5. 5. Deploy the merged `dist` folder to Cloudflare Pages.
                6. 6. Verify GitHub, Cloudflare preview, and the public live URL before reporting done.
                  
                   7. Do not deploy from an old local worktree, backup folder, detached test folder, or previous branch unless it has first been compared with `origin/main` and merged through GitHub.
                  
                   8. ## Current Baseline Markers
                  
                   9. _Last verified: 2026-07-29, against the live site directly (not from a stale local copy)._
                  
                   10. The current approved LUMIO website baseline must include these markers in `dist/index.html` unless Charles explicitly approves replacing the portfolio system:
                  
                   11. - `lumio-portfolio-hero-video-cards-20260630`
                       - - `StayFix Dispatch`
                         - - `Paybit Tech`
                           - - `Bunnytales`
                             - - `Aunt.Li`
                               - - `stayfix-dispatch-intake.pages.dev`
                                 - - `paybittech.pages.dev`
                                   - - `bunnytales.vercel.app`
                                     - - `auntli-aged-citrus-peel-tea.pages.dev`
                                       - - `HOTFIX 2026-07-03`
                                        
                                         - Expected structure:
                                        
                                         - - **7 portfolio cards** (updated from 5 — Bunnytales and Aunt.Li were added since the marker list was last written).
                                           - - 4 portfolio video preview elements (Long Ieng, Macau World Travel, Stayflow Homestay, Paybit Tech). StayFix Dispatch, Bunnytales, and Aunt.Li use static image previews, not video.
                                             - - Case order: 01 Long Ieng, 02 Macau World Travel, 03 Stayflow Homestay, 04 Paybit Tech, 05 StayFix Dispatch, 06 Bunnytales, 07 Aunt.Li.
                                               - - Mobile hero fit hotfix active.
                                                 - - Pricing: 4 tiers — Starter RM 1,500+, Growth RM 4,000+ ("Most Popular"), Premium RM 8,000+, Custom (Quote).
                                                   - - Contact: WhatsApp +60 17 720 9159, email lumiocoordia@gmail.com, address Level 28, GTower, Jln Tun Razak, Kuala Lumpur, 50450 Kuala Lumpur.
                                                    
                                                     - ## Alignment Check
                                                    
                                                     - Before reporting completion, verify all three nodes contain the same baseline markers:
                                                    
                                                     - 1. GitHub `origin/main:dist/index.html`
                                                       2. 2. Latest Cloudflare deployment preview URL
                                                          3. 3. Public live URL: `https://lumio-coordia-intelligence.pages.dev/`
                                                            
                                                             4. If any node differs, stop and reconcile before making new design changes.
                                                            
                                                             5. ---
                                                            
                                                             6. ## What changed in this update (2026-07-29)
                                                            
                                                             7. - Portfolio card count corrected from 5 → 7 (Bunnytales, Aunt.Li added, not previously reflected in this file).
                                                                - - Added domain markers for the two new cases.
                                                                  - - Added the actual current pricing tiers and contact details as baseline markers, since those weren't captured here before and are easy to drift silently.
                                                                    - - Verified against the live site directly, not a local/cached copy — per the "no deploy from unverified local copy" rule above.
                                                                      - 
