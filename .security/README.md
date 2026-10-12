# Security checks

The Security workflow checks current files and Git history for secrets, scans
JavaScript/TypeScript/Python/HTML with a small original Semgrep policy, and
queries OSV for known dependency vulnerabilities. It never builds or runs
application source or installs application dependencies. Scan failures fail
the job. Semgrep metrics and version checks are disabled. OSV sends package
names and versions to advisory services; raw source is not uploaded by these
scanner steps. Normal GitHub checkout and logs remain on GitHub.

Native scanners and GitHub actions are pinned to versions/commits; release
downloads have fixed SHA256 checks. Semgrep is pinned in requirements.txt;
transitive tool dependencies are resolved from PyPI, rather than fully locked.
Dependabot proposes tool/action updates; it does not merge them automatically.

Only three exact historical fingerprints and one anchored exact public-key
value are excepted, for a Supabase
publishable key that is designed to be included in browser code. See
https://supabase.com/docs/guides/getting-started/api-keys . Live Row Level
Security settings were not inspected by this setup. Private service keys
must never be committed. Other keys, paths, and rules are not suppressed.

The small code policy covers specific injection patterns; a passing job is
not a complete audit. Broader local audit findings are reviewed separately.
Protect main with the `secrets-code-dependencies` status check after a
successful run. Until protection is configured, a failing job can be bypassed
by a direct push. Local hooks can also be bypassed by the local user.

This workflow uses standard runners in this public repository. GitHub's
current billing documentation describes those as free. Recheck costs before
moving this workflow to a private repository or changing runner type.
