# Web UI foundations

Apply within the approved task, not as a mandate to redesign an existing system. Preserve real brand assets, tokens, components, content and language conventions. Treat style catalogs as candidate ideas, not product facts. Do not invent testimonials, legal claims, prices or metrics; clearly label prototype content.

## Typography, color and layout
- Establish readable body type, clear heading hierarchy and consistent role-based scale/weight/line-height. Check actual fonts, fallbacks and loading; use licensed assets. Prefer comfortable reading measure (often 45–80 characters) without making a universal width rule.
- Use semantic color tokens and deliberate contrast across default, focus, selected, disabled and error states and supported themes. Color is not the only state signal. Preserve recognizable links and error cues.
- Group related content with spacing, align to a coherent grid and make the primary action obvious. Whitespace and hierarchy are functional, not decoration quotas. Avoid making everything a card or everything equally prominent; use tables/lists where information warrants them.
- Use fluid layout and content-driven breakpoints. Check narrow, intermediate and wide sizes, long words, missing content, localization and right-to-left layouts when supported. Do not hide overflow to conceal clipped controls; avoid fixed-height text sections that break at zoom.

## Accessibility target
Propose **WCAG 2.2 AA** unless the project specifies another target; applicability and actual evaluation matter. These are checks, not a complete conformance method. Primary standard: [WCAG 2.2](https://www.w3.org/TR/WCAG22/).

- Semantic landmarks/headings; native links for navigation, buttons for actions. Native controls already implement keyboard behavior; avoid redundant key handlers. Provide accessible names, associated labels, instructions and errors; prefer native semantics before ARIA.
- Keyboard access, logical focus order, visible focus, no traps, and focused controls not fully obscured by sticky UI. Dialog focus management, escape/close and restoration must match the widget pattern. Do not remove outlines without an equivalent visible indicator.
- Text contrast: at least 4.5:1 for ordinary text, 3:1 for large text (18pt regular or 14pt bold). Required non-text control/state graphics generally need 3:1 against adjacent colors; account for applicable exceptions rather than testing disabled controls as ordinary text.
- Reflow at 320 CSS px equivalent (typically 400% zoom from 1280px) without loss or two-dimensional scrolling except essential layouts; text resize to 200%. Preserve browser zoom and support text-spacing changes. An attractive mobile screenshot is not a reflow test.
- WCAG 2.2 AA target-size minimum is 24×24 CSS px or an applicable spacing/other exception; aim for comfortable larger touch areas (often 44×44) rather than mislabeling the recommendation as AA's universal minimum. Provide non-drag and keyboard alternatives to gestures.
- Meaningful images need useful alternatives; decorative images use empty alternatives. Media needs captions/transcripts/descriptions as applicable. Status messages should be programmatically available without disruptive announcements; live regions are not needed on every change.
- Forms support autocomplete as applicable, password managers, paste, clear validation/recovery, and accessible authentication. Prevent repeat data entry where required. Do not put secrets into URL state.

## Responsive behavior and states
Trace the complete primary task: loading, empty, error, success, disabled, permission-limited and long-content states. Include touch and keyboard, not hover alone. Ensure navigation, tables, dialogs and controls remain usable at constrained widths; preserve semantic relationships when adapting layout. Test supported themes, font failure and slow/offline states where relevant.

## Interactions and motion
Use motion to explain state, continuity or feedback, not to prove polish. Start with CSS transitions/keyframes and explicit properties; transform/opacity are often cheaper than layout animation, but measure actual effects. Use GSAP only for a justified complex sequence that existing capabilities cannot reasonably serve, with approved dependency scope and cleanup/performance checks.

Honor `prefers-reduced-motion`: remove nonessential travel/parallax/loops, retain understandable state feedback. Avoid flashing; provide pause/stop/hide controls for applicable autoplay movement. Make effects interruptible; preserve reading, keyboard focus, touch scrolling and browser navigation. No compulsory hero animation, screen-height sections or hover-only functionality.

## Performance and content
Use responsive images with dimensions/aspect ratio, appropriate compression and intentional loading priority; do not lazy-load critical above-fold content. Budget fonts and scripts. Avoid layout thrashing and unbounded effects; measure before adding virtualization or memoization. Virtualization must preserve accessibility, focus, search and content discoverability. Use locale-aware formats. Match UI terminology and casing to the project's voice, not conflicting upstream style absolutes.
