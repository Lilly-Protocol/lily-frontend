# Security headers bounty #109

## Request

Implement the open `$35` security-headers bounty for `Lilly-Protocol/lily-frontend`, validate the change, and prepare a pull request while keeping GitHub and payment information private.

## Scope and decision

- Target: `Lilly-Protocol/lily-frontend#109`.
- Scope was limited to the issue's requested response headers and documentation.
- The CSP allows the current Next.js shell's inline scripts/styles, keeps production free of `unsafe-eval`, and permits only same-origin resources plus `data:`/`blob:` assets needed by the current app.
- No third-party hosts, payment details, credentials, or private messages were added to the repository.

## Changes

- Added a `headers()` rule in `next.config.ts` for `/:path*`.
- Added `Content-Security-Policy`, `Referrer-Policy`, `X-Content-Type-Options`, and `X-Frame-Options`.
- Added a unit test covering the route matcher and required directives.
- Documented the policy and future third-party integration considerations in `README.md`.

## Verification

- `npm ci` completed on Node `v24.14.0` / npm `11.9.0`.
- `npm run lint` passed.
- `npm run typecheck` passed.
- `npm run test:run` passed: 6 files, 10 tests; coverage 96.29% statements, 90% branches, 100% functions, 96% lines.
- `npm run build` passed with Next.js `16.2.6`; 28 routes generated.
- `npm run check` passed.
- Production server response checks passed for `/`, `/signin`, `/app`, `/security`, and `/robots.txt`; all four required headers and the CSP were present.
- `git diff --check` passed.

## Open risks and follow-up

- `npm ci` reported 9 dependency audit findings (1 low, 8 high) from the existing dependency graph; these were not changed because they are outside issue #109.
- If a future feature adds analytics, APIs, remote fonts, embeds, or external images, the CSP must be reviewed and narrowed to the exact required hosts.
- GitHub maintainer review, merge, bounty approval, and payment are external gates and remain pending.

## Useful paths and commands

- Branch: `security-headers-109`
- Config: `next.config.ts`
- Test: `src/config/security-headers.test.ts`
- Docs: `README.md`
- Quality record: `.planning/security-headers-109/quality-gates.json`
- Verify locally: `npm run check`
