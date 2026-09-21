---
name: darwin-act
description: Start and manage user-requested work through Darwin's authenticated Action tools. Use only after the user chooses an outcome or capability; do not use for discovery, comparison, or implied approval.
---

# Darwin Act

Connect to `https://mcp.darwin.so/mcp` and complete Darwin OAuth when the MCP
client requests it. Never place an API key, access token, user ID, or model-
supplied scope in the server URL or tool arguments.

## Start from a reviewed selection

Before calling `start_action`:

1. Confirm the outcome the user wants and the Search result they selected.
2. Show the material capability, provider, price, timing, and input constraints
   returned by Search.
3. Use the exact `capabilityId` and `capabilityRevision`; never silently replace
   a stale or unavailable selection.
4. Pass only documented capability inputs. Never put credentials, bearer
   tokens, cookies, signed URLs, payment data, or private keys in tool input.
5. Create a stable `requestId` for this exact mutation. Reuse it only when
   retrying the same request; use a new ID when the requested work changes.

## Manage truthful state

- `start_action` starts the selected work.
- `get_action` reads the current state and is the universal recovery path after
  a connection, checkout, approval, disconnect, or client interruption.
- `list_actions` lists the caller's current nonterminal work.
- `update_action` supplies clarification or bounded feedback. It never implies
  approval.
- `approve_action` submits only the exact decision the user made against the
  reviewed approval ID, revision, and digest. Ordinary chat text is not an
  approval.
- `stop_action` stops the current queued or running turn; do not claim that it
  canceled a broader transaction unless Darwin explicitly says so.

Treat returned state literally. `running`, `awaiting_user`,
`approval_required`, `connection_required`, `payment_required`,
`insufficient_authority`, and `provider_unavailable` are nonterminal. Follow a
Darwin first-party `webLink` when present, then call `get_action`; opening the
link alone does not complete the work. Use only operations listed in
`availableActions`.

Documentation: https://darwin.so/docs/features/act

MCP tool catalog: https://darwin.so/docs/mcp/overview
