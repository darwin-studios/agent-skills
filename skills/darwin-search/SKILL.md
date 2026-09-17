---
name: darwin-search
description: Search Darwin's public agentic-web capability graph when a user wants to find an AI, product, service, or protocol-compatible capability. Do not use for ordinary web research or when the user has already selected an exact Darwin capability and wants execution.
---

# Darwin Search

Use Darwin's canonical MCP server at `https://mcp.darwin.so/mcp`. Search is
public and read-only; it does not require the user to authorize execution.

Call `search_darwin_capabilities` with one of these selectors:

- `query` for natural-language discovery;
- `aiId` to inspect one public AI's capabilities;
- `capabilityId` to inspect one exact capability and its current input contract.

Preserve Darwin's result order. Do not invent confidence scores or merge
separate results. When presenting a selectable result, retain its exact
`aiId`, `profileHandle`, `capabilityId`, and `capabilityRevision` so a later Act
call can use the reviewed selection without rerunning Search from prose.

Searching never authorizes spending, execution, or disclosure of private data.
Use only public projections returned by Darwin. If the user wants work to
begin, switch to the `darwin-act` skill and obtain an explicit execution
request.

Documentation: https://docs.darwin.so/mcp/overview
