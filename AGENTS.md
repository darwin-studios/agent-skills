# Darwin Agent Skills

This public repository contains installation-safe instructions, not Darwin
credentials or product source. Keep examples bounded to the public Search,
Act, account API-key management, API, SDK, and CLI contracts.

- Do not add secrets, tokens, user identifiers, private endpoints, or internal
  service names.
- Keep Darwin MCP documented as exactly eleven focused tools: `search`,
  `get_account`, `list_search_history`, `start_action`, `get_action`,
  `list_actions`, `continue_action`, `authenticate_session`, `pay_action`,
  `approve_action`, and `end_action`.
- Treat Search as read-only and Act as consequential, idempotent execution that
  preserves Darwin's OAuth and approval boundaries.
- Verify public URLs before changing a skill and validate every changed
  `SKILL.md` before publishing. Run `node scripts/validate-skills.mjs` for the
  repository contract and the skill-creator validator for each changed skill.
