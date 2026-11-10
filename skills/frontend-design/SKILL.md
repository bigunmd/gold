---
name: frontend-design
description: Design distinctive, intentional web UI or an approved visual redesign using subject-specific typography, color, content, hierarchy and layout. Default GOLD design lead for new pages/components; preserve an existing system unless redesign is approved.
license: Apache-2.0; see LICENSE.txt
---
# Frontend Design — GOLD adaptation

Modified from Anthropic's Frontend Design: condensed guidance, GOLD authorization/evidence boundaries, no implied fictional client brief. Source pin and modification provenance: [manifest](../gold-web-ui/upstream-manifest.json). [License](LICENSE.txt).

## GOLD / DSH integration contract
Use [gold-web-ui](../gold-web-ui/SKILL.md), its foundations and capability-aware verification. Choose this as the single design lead unless another lead was selected; Pro Max may support lookup, Vercel review and Impeccable targeted refinement. Approved scope, existing brand/design system, accessibility and GOLD gates win over stylistic preferences. Planning/review is not implementation permission. No automatic installs, Git actions or publication. Keep authorized local notes in ignored `.gold/`; do not create project design documents by default.

## Ground the direction
Understand the actual product, audience and primary task. If absent and material, propose a concise interpretation and confirm it; do not invent client preferences or treat memory as approval. Use real content and subject matter. Identify what deserves attention: a headline, product UI, image, demo or interaction, rather than reflexively adding a generic hero and card grid.

Before building, form a compact plan: palette and semantic roles, one or two type families with a readable scale, layout/alignment and a few principles specific to this brief. Reuse existing tokens when present. Sketch/compare only enough to resolve a real choice. Check the plan against the brief, revise generic choices, and implement only within approved scope.

## Make deliberate choices
- Typography carries personality. Give display and body content clear roles, intentional weight/width/spacing and comfortable line length (usually under 80 characters). A second family should add a useful distinction, not clutter.
- Structural devices carry information. Borders, labels, dividers and numbering should explain relationships; number only genuine sequences. Avoid decorative eyebrows and identical cards as automatic defaults.
- Spend boldness in one place; keep surrounding structure legible and disciplined. No palette, font or border radius is universally forbidden. Familiar styles are legitimate when the brief asks for them; distinctiveness is not an excuse to break brand consistency.
- Use motion sparingly and for attention or state feedback. Respect reduced motion; do not animate every section/card. Preserve responsive layout, visible focus and accessibility from the start.
- Keep CSS specificity and spacing ownership understandable. Prefer the existing component system over accumulating local overrides.

## Content is design
Use plain, audience-appropriate language, meaningful action labels and consistent terminology through the flow. Explain errors and recovery; make empty states actionable. Sentence case is a default suggestion, not a replacement for the project's established voice. Do not invent factual claims, testimonials or commercial details; mark prototype content.

## Critique the result
Compare against the brief and inspect the rendered UI when tools/permission allow. Check hierarchy, typography, color, alignment, content, states, responsive behavior and motion; remove decoration that does not help. Screenshots are useful only when actually captured and inspected. If rendering is unavailable, say what source/tests establish and what remains unverified. Aesthetic confidence is not evidence of functional or accessibility conformance.
