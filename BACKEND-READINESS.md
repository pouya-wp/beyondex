# Pre-deployment review

Live sales are intentionally blocked with HTTP 503 at create, verify and crypto webhook routes. Do not remove this guard merely by setting an environment variable.

## Confirmed blockers
- Orders use a process-local Map in `src/lib/payments/orders.ts`: not durable and not shared across instances.
- No authenticated user session or ownership binding exists for orders.
- No subscription-management API exists yet (confirmed by product owner).
- No verified provisioning, renewal, revocation or short-lived launch session exists for external agent panels.
- Contact form is a preview; no mail delivery integration.
- Dashboard favorites are browser-local preferences, never entitlements.

## Integration contract
`src/lib/access/contract.ts` defines the boundary for provisioning, access lookup and launch sessions. The external service must enforce authorization as well; a hidden URL is not access control.

Before enabling sales: persistent transactions + unique provider reference; authenticated owner; provider verification matched to order/amount/currency; idempotent provisioning with retry; subscription expiry and revocation; server-validated launch URLs from an allowlist; signed, short-lived, single-use launch sessions. Exercise duplicate callbacks, cross-user access, expired subscriptions and failed provisioning in sandbox.

Visual preview may be deployed separately. Production commerce is not ready. No live gateway credentials or funds were used in this review.
