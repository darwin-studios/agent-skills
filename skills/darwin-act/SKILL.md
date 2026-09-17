---
name: darwin-act
description: Execute a user-selected Darwin capability as durable work through the authenticated Darwin MCP. Use only when the user explicitly wants an outcome coordinated; do not use for discovery, comparison, or implied approval.
---

# Darwin Act

Connect to `https://mcp.darwin.so/mcp` and complete Darwin OAuth when the MCP
client requests it. Never place an API key, access token, user ID, or model-
supplied scope in the server URL or tool arguments.

Before calling `execute_darwin_capability`:

1. Make an exact `search_darwin_capabilities({ capabilityId })` lookup.
2. Show the user what will run, including the selected capability and relevant
   inputs or constraints.
3. Use the exact `capabilityId` and `capabilityRevision` from that lookup.
4. Pass only fields exposed by its current `inputContract` and use a stable
   `requestId` for the exact request.

Treat returned state literally. `running`, `awaiting_user`,
`approval_required`, `connection_required`, `insufficient_authority`, and
`provider_unavailable` are not completion. Follow the returned `webLink` for
clarification, connection, review, or approval. Ordinary chat text is not an
approval, and the skill must not bypass Darwin's first-party approval flow.

Documentation: https://docs.darwin.so/mcp/overview
