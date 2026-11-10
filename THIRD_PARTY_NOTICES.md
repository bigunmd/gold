# Third-party notices

## Web UI integrations

These are pinned selective adaptations, not upstream endorsements or complete tool distributions. [Guidance manifest](skills/gold-web-ui/upstream-manifest.json) records exact source paths/hashes and adapted target hashes; [Pro Max manifest](skills/ui-ux-pro-max/upstream-manifest.json) records every vendored runtime file and modification. Complete licenses are included at the links below.

| Family/source | Revision | License and attribution |
|---|---|---|
| [Anthropic Frontend Design](https://github.com/anthropics/skills/tree/2c5958ecac7cee2b583967a2c4981d0f4a75c579/skills/frontend-design) | `2c5958ecac7cee2b583967a2c4981d0f4a75c579` | [Apache-2.0](skills/frontend-design/LICENSE.txt); Anthropic source attribution |
| [UI/UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/tree/6ae86f61f520d6ca229d2f40e070410638c908c5) | `6ae86f61f520d6ca229d2f40e070410638c908c5` | [MIT](skills/ui-ux-pro-max/LICENSE); Copyright (c) 2024 Next Level Builder |
| [Taste Skill](https://github.com/Leonxlnx/taste-skill/tree/f6b76575f949707b4e3c37cd86cb44b0b98643e8) | `f6b76575f949707b4e3c37cd86cb44b0b98643e8` | [MIT](skills/design-taste-frontend/LICENSE); Copyright (c) 2026 Leonxlnx |
| [Vercel Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines/tree/434b7f91364665f2f733b310ec54809bf8f37937) | `434b7f91364665f2f733b310ec54809bf8f37937` | [MIT](skills/web-design-guidelines/LICENSE); Copyright (c) 2025 Vercel Labs |
| [Impeccable](https://github.com/pbakaus/impeccable/tree/ebe9c265f416f7f9b83ed424ed5b9bd0d2684536) | `ebe9c265f416f7f9b83ed424ed5b9bd0d2684536` | [Apache-2.0](skills/impeccable/LICENSE); Copyright 2025 Paul Bakaus; builds on Anthropic Frontend Design |

GOLD modifications: condensed/reorganized guidance, explicit authorization and evidence contracts, existing-brand precedence, contextualized style/accessibility recommendations and capability-aware fallback. Taste and Impeccable scripts, hooks, engines, assets, detectors, telemetry and live editing are excluded. Vercel rules are adapted directly from the licensed rules repository, not the separately published agent-skills wrapper. Pro Max's local Python runtime/data are retained with persistence disabled and write helpers removed; no installer or refresh tooling ships. Third-party fonts/photos/icons suggested by data are not bundled and have independent rights/terms. No independent rights audit or accessibility certification is implied.

The eight resources under `skills/gold-standard-development/references/specialties/` selectively adapt techniques and structure from VoltAgent's awesome-claude-code-subagents repository, revision `82b73821baa7a911d5b14cfb6da238b7f0db6b42`:

https://github.com/VoltAgent/awesome-claude-code-subagents/tree/82b73821baa7a911d5b14cfb6da238b7f0db6b42

Upstream definitions: git-workflow-manager, security-auditor, api-designer, database-administrator, performance-engineer, documentation-engineer, accessibility-tester, incident-responder. GOLD replaces runtime-specific assumptions, numerical sample achievements and implicit mutations with scoped evidence-driven guidance. Repository provenance documentation records exact source paths. No upstream endorsement or independent authorship/rights audit is implied. This legal notice is separate from commit/model attribution.

## VoltAgent MIT License

Copyright (c) 2025 VoltAgent

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Ponytail

The six skills under skills/ponytail* adapt DietrichGebert/ponytail at revision 7801d061243d7b753bad0e0b3c057cd250b11755:
https://github.com/DietrichGebert/ponytail/tree/7801d061243d7b753bad0e0b3c057cd250b11755/skills

GOLD adds authorization and tool guidance, local-ledger defaults and benchmark attribution, and replaces host-specific help with DSH guidance. No upstream hooks are installed. No endorsement or independent reproduction of benchmarks is implied.

MIT License

Copyright (c) 2026 DietrichGebert

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Matt Pocock skills

27 active engineering/productivity skills and supporting resources adapt mattpocock/skills revision 4ae2317ddb22b046e26455e4f9c9b3aaaf62212d:
https://github.com/mattpocock/skills/tree/4ae2317ddb22b046e26455e4f9c9b3aaaf62212d/skills

GOLD adds DSH invocation/tool and authorization contracts, artifact policy, working-tree review coverage, optional disclosure handling, and disables unsafe wizard persistence/remote helpers. User-only invocation flags are retained. Foreign agent metadata and experimental/frozen collections are excluded. Per-file upstream paths and hashes ship in the setup skill upstream-manifest.json. No endorsement is implied.

MIT License

Copyright (c) 2026 Matt Pocock

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
