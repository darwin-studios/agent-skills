# Darwin Agent Skills

This public repository contains installation-safe instructions, not Darwin
credentials or product source. Keep examples bounded to the public Search,
Act, API, SDK, and CLI contracts.

- Do not add secrets, tokens, user identifiers, private endpoints, or internal
  service names.
- Keep Darwin MCP documented as exactly two tools: Search and Act.
- Treat Search as read-only and Act as consequential, idempotent execution that
  preserves Darwin's OAuth and approval boundaries.
- Verify public URLs before changing a skill and validate every changed
  `SKILL.md` before publishing.
