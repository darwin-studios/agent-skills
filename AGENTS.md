# Darwin Agent Skills

This public repository contains installation-safe instructions, not Darwin
credentials or product source. Keep examples bounded to the public Search,
Act, API, SDK, and CLI contracts.

- Do not add secrets, tokens, user identifiers, private endpoints, or internal
  service names.
- Keep Darwin MCP documented as exactly seven focused tools: `search` plus
  `start_action`, `get_action`, `list_actions`, `update_action`,
  `approve_action`, and `stop_action`.
- Treat Search as read-only and Act as consequential, idempotent execution that
  preserves Darwin's OAuth and approval boundaries.
- Verify public URLs before changing a skill and validate every changed
  `SKILL.md` before publishing. Run `node scripts/validate-skills.mjs` for the
  repository contract and the skill-creator validator for each changed skill.
