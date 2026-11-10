# Capability-aware UI verification

## Establish the target and permission
Resolve the exact source, route/URL, component states and approved effects before testing. Tool availability does not grant permission. Browser clicks can submit forms, change accounts or mutate shared systems; use approved test accounts/fixtures, not real purchases or destructive actions. Do not start a replacement server to imply the current app changed. Do not download browsers, extensions, scanners or dependencies without installation scope.

Inventory actual capabilities: source/file tools; project build/unit/component tests; a usable browser automation or browser tool; screenshots; accessibility scanner; keyboard and assistive technology. A shell or an image-generation tool is not automatically a browser or a screen-reader. Discover the project's existing test setup and inspect script effects. If a tool is absent, choose the strongest available safe check and report the gap.

## Evidence ladder (record each independently)
| Layer | Evidence to record | What it cannot establish |
|---|---|---|
| Source-only | Files/lines, framework patterns, semantic/ARIA/focus/motion inspection, findings and reasoning | Runtime layout, actual focus behavior or computed contrast |
| Build and automated tests | Exact commands, content identity, exits, assertions and tested states | Untested user flows or subjective visual quality |
| Browser execution | Browser/version, target URL/build, viewport/input, exercised flow, console/network failures | All devices, all users or assistive-technology support |
| Rendered visual review | Actual screenshots tied to build/route/viewport/state and inspected images | Keyboard operation, screen-reader semantics or unseen responsive states |
| Automated accessibility | Scanner/version, target/states, rules/results and triaged false positives | Full WCAG conformance or manual coverage |
| Manual interaction/AT | Actual keyboard walkthrough and screen-reader/browser combination, observations and tester | Other combinations or criteria not exercised |

**No browser available:** report a source-only review and any executed build/tests; identify visual, focus and interaction checks as pending. Offer a small human checklist or request approved browser access if essential to acceptance. Do not substitute generated mockups for rendered screenshots. No screenshots means visual rendering remains unverified, not implicitly passed.

For rendered validation use representative mobile/intermediate/desktop widths and content extremes, zoom/reflow, supported themes, reduced motion and the complete primary flow. Keyboard: tab/shift-tab order, enter/space activation, escape/close, focus visibility/restoration and no traps. Manually check names/roles/states and announcements with an actual screen-reader when available; reading ARIA source is not that test.

Automated scans and clean screenshots are **not proof of WCAG conformance**. Name evaluated criteria/scope and unresolved manual checks rather than announcing a numerical accessibility score or certification. Performance claims require measurements on a named environment; source heuristics are hypotheses.

## Report and retain
Group findings by impact with file/line or observed state, evidence type, consequence and smallest recommended fix. Distinguish confirmed defects from suspected risks and optional aesthetic suggestions. A review does not perform repairs. Authorized local captures go to ignored `.gold/`; redact private content/tokens and do not upload screenshots to third parties without scope. Do not silently create PRODUCT.md, DESIGN.md, upstream report directories or new tracked artifacts.

Delivery reports tie checks to current content and list limitations. Ask for acceptance of reduced verification when the planned capabilities are unavailable. A successful static contract test of these skills proves routing text and packaging only, not that a future model followed them or that any product UI is accessible.
