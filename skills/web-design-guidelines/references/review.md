# Pinned web-interface review checklist

Modified from Vercel Web Interface Guidelines: requirements are contextualized; source findings are separated from browser evidence. Use the [shared baseline](../../gold-web-ui/references/foundations.md) for WCAG details. This is not an exhaustive accessibility audit.

## Semantics and focus
- Native buttons for actions, links for navigation; accessible names on icon buttons and form controls; useful image alternatives and hidden decorative icons. Native buttons already support keyboard activation: do not require redundant custom key handlers.
- Logical headings/landmarks and skip navigation where appropriate. Meaningful media has required alternatives. Live announcements for relevant asynchronous status, not every update.
- Visible focus, no outline removal without replacement, sensible focus-within for compound controls. Sticky headers/overlays must not obscure focused content; anchor targets may need scroll margin.
- Dialog focus, escape, restoration and keyboard order need actual interaction checks. A source pattern alone cannot certify them.

## Forms and state
- Associated clickable labels, meaningful name/type/inputmode and appropriate autocomplete; do not globally disable autocomplete. Keep paste/password-manager support. Match spellcheck to content.
- Checkboxes/radios have usable shared label hit areas. Explain disabled states; show pending feedback without duplicate submissions. Errors identify the field and recovery, with an accessible focus/announcement strategy.
- Preserve user input and handle unsaved changes when the flow warrants it. Destructive operations need proportionate confirmation or undo. Test loading/empty/error/success and permission states.

## Responsive content and interaction
- Long text/URLs, empty arrays, localization and flexible children must not clip or overflow unexpectedly. Use wrapping/truncation intentionally with access to essential full content; `min-width: 0` can help flex items. Do not hide overflow to conceal defects.
- Preserve zoom; check reflow, target size, touch/keyboard alternatives for drag/swipe and hover-only affordances. Autofocus needs justification and testing, particularly on mobile.
- Safe-area padding for relevant full-bleed layouts; flex/grid before JS measurements. Scroll containment and touch-action are contextual: preserve page scrolling, pinch zoom and browser gestures; test hybrid input devices.

## Motion and media
- Respect reduced motion, explicit transition properties, interruptibility, and pause/stop/hide for applicable autoplay. Prefer transform/opacity when suitable, but evaluate actual performance rather than banning every other property.
- Images reserve space via dimensions/aspect ratio, use responsive sources, defer noncritical content and prioritize genuinely critical assets. Do not lazy-load the main hero by habit.
- Video can outperform animated GIF, but requires compatible formats, controls/alternatives and bandwidth consideration. No asset downloads or new codecs/libraries merely from review.

## Performance and navigation
- Identify layout thrashing, expensive effects, unnecessary imports and slow per-keystroke work. Measure before prescribing optimization. Virtualization is not mandatory at 50 items: account for cost, accessibility, find-in-page, focus and actual list sizes.
- Preload/preconnect/fonts only when useful to the measured critical path; avoid warming unrelated origins. Honor content-security/privacy constraints.
- Links retain standard navigation semantics and open-in-new-tab behavior. URL state is useful for meaningful shareable filters/pagination, not every ephemeral toggle; never expose secrets/private inputs in URLs.

## Themes, locale and hydration
- Verify supported themes including native controls and focus/contrast states; use color-scheme appropriately, not as a mandate to add dark mode.
- Locale-aware dates/numbers/currency; support known language/RTL requirements. Avoid IP-based language guesses. Keep server/client rendering deterministic, handle controlled/uncontrolled inputs correctly, and do not silence hydration warnings without cause.
- Clear action labels, actionable error messages and consistent terminology. Vercel's Title Case and Anthropic's sentence-case defaults conflict: follow the project's voice. Curly quotes, ellipses and numeral conventions are editorial choices, not universal defects.

## Findings format
For each actionable issue: location, severity/impact, observed evidence and smallest recommendation. Explicitly mark source-only risks awaiting browser confirmation. Keep optional aesthetic advice separate. Prioritize inaccessible/blocked tasks and data loss over typography preferences. Do not claim no issues in files/states not inspected or make repairs during an audit-only request.
