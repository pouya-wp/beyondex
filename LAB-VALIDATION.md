# Interaction release checks

- Production build: `.next-lab-final`, Next.js build passed (56 static pages).
- Main local server: http://localhost:3001, production session 89547.
- `node scripts/check-lab.cjs`: passed. 60 unique studies, 10 original + 50 new, bilingual guides/source URLs, both lab routes, selected agent integration and sitemap.
- `node scripts/check-agent-pages.cjs`: passed. All 24 localized agent pages, listing links, unknown agent 404.
- `node scripts/check-pricing.cjs`: passed. Monthly, annual, free, custom quote and removed-product guards.
- Browser checks: Persian lab and 390px mobile composition, 50-study filter, comparison keyboard End reaches 100, local form validation and Escape closing, home accounting selection points to `/fa/agents/accounting`, English about accordion expands correctly. No console errors reported on the tested production about page.
- Browser traversal covered a subset of lab scenes, not exhaustive interaction testing of all 60. The full catalog was verified by HTTP and data checks.
- New selected designs: home access constellation, about process chapters, agent detail comparison + expandable access explanation.
- Lab scenes are original concept adaptations of listed Awwwards patterns. Forms/statistics are samples. Video popup uses a local motion concept; dimensional typography uses CSS, not WebGL.
- Subscription integration remains unavailable and live purchase gates remain closed. No deployment performed.
