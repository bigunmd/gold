# Skill mechanics

The skill-specific branch of [`writing-for-agents`](SKILL.md): what changes when the document is a skill (frontmatter, the invocation choice, and router skills). Everything else about writing it is the universal reference in `SKILL.md`.

## Invocation

Two choices, trading discovery and human recall. These are canonical intent; catalog visibility, context loading and metadata enforcement depend on the host and adapter, not on Markdown alone.

- A **model-invoked** skill keeps a model-facing `description` carrying its trigger branches, so a supporting host can discover it autonomously and other skills can reach it. Humans can still request it by name through the available interface. Mechanics: omit `disable-model-invocation`. Such a skill can house shared reference that multiple skills need. Hosts may load descriptions into a catalog or use other discovery mechanisms; do not promise an always-loaded description or a fixed context cost.
- A **user-invoked** skill requires the human to request it. Mechanics: set `disable-model-invocation: true` in the canonical source and keep a human-facing one-line `description`. Do not auto-load it from another skill; suggest it instead. A host may hide its description, expose it in a catalog, or lack native flag support: visibility never grants invocation permission, and zero context load is not portable. Adapters must preserve this boundary, including conservatively omitting unsupported user-only skills rather than silently making them model-invoked.

Pick model-invocation only when the agent must reach the skill on its own, or another skill must. If it only ever fires by hand, make it user-invoked and accept the human recall cost without promising a particular runtime context saving.

Shared reference that two user-invoked skills both need should not require one to invoke the other. Put it in a plain supporting file that either can read after the human invokes them, or in a genuinely reusable model-invoked reference skill.

## Splitting by invocation

The invocation cut of splitting (the sequence cut lives in `SKILL.md`): split off a model-invoked skill when you have a distinct leading word that should trigger it on its own (a trigger word you actually use in your prompts), or another skill must reach it. Extra discovery/catalog overhead depends on the host, so that independent reach still has to be worth it.

## Router skills

When user-invoked skills multiply past what you can remember, that piled-up cognitive load is cured by a **router skill**: one user-invoked skill that names the others and when to reach for each, so the human has one skill to remember instead of many. It can suggest user-only skills, never auto-load them, regardless of whether the host exposes their descriptions.
