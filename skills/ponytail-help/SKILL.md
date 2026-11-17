---
name: ponytail-help
description: Quick reference for Ponytail skills and conversation-local levels in GOLD. Use for "ponytail help", "how do I use ponytail", or /ponytail-help.
license: MIT
---

# Ponytail Help in GOLD

Display this reference when requested. Do not change mode or write files.

GOLD loads Ponytail on coding tasks, defaulting to full, unless the user disables it. GOLD remains responsible for scope, collaboration, approval, verification and C4 assessment.

| Skill | Purpose |
|---|---|
| ponytail | Smallest complete solution, retaining safety and tests. |
| ponytail-review | Review a change and its callers; report only. |
| ponytail-audit | Rank evidence-backed repository findings; report only. |
| ponytail-debt | Report shortcut comments; persist only with permission, locally under .gold/ by default. |
| ponytail-gain | Display upstream benchmarks, not measured GOLD integration savings. |
| ponytail-help | This reference. |

Invoke through the host's available skill interface or ask by name: "ponytail review my staged changes" or "ponytail audit this package". Slash forms are skill invocations, not separately installed native commands.

Levels are conversation-local:
- lite: implement requested scope and name the smaller option.
- full (default): choose the smallest complete change and verify risky logic.
- ultra: also challenge unjustified requirements before building.

Say "ponytail lite", "ponytail full", "ponytail ultra", or "ponytail off". "Stop ponytail" or "normal mode" disables Ponytail guidance, not GOLD requirements. Review, audit, debt, gain and help are one-shot and do not change level. No cross-session persistence, environment/config-file mode settings, lifecycle hooks or Claude/Codex management commands are installed.

Updates are explicit and host-specific: update the DSH bundle through its plugin manager, or regenerate/reinstall the Codex, Claude Code or OpenCode export using that adapter's documented process. Upstream is pinned, not auto-updated. Start a fresh session after updating so the host reloads the installed instructions; do not assume a running session has refreshed its cached guidance.

Adapted from https://github.com/DietrichGebert/ponytail at revision 7801d061243d7b753bad0e0b3c057cd250b11755 (v5.3.3). Upstream Claude band commands and session-history imports are not supported in this GOLD adaptation. The MIT license ships in the ponytail resource directory and THIRD_PARTY_NOTICES.md.
