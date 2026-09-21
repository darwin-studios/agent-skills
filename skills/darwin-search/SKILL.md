---
name: darwin-search
description: Find and compare executable public capabilities with Darwin Search. Use when a user wants an AI, product, service, provider, or protocol-compatible capability; do not use for general web research or to begin consequential work.
---

# Darwin Search

Use the `search` tool on Darwin's canonical MCP server:

```text
https://mcp.darwin.so/mcp
```

Search is public, read-only, and does not authorize execution.

## Search well

1. Write `query` as a natural-language description of the desired outcome,
   constraints, and relevant context.
2. Use inclusion or exclusion filters for AI IDs or domains only when the user
   explicitly requests or approves those hard boundaries. Do not turn examples
   or soft preferences into allowlists.
3. Add capability, protocol, price, availability, locale, or currency filters
   only when they materially reflect the request.
4. Preserve Darwin's canonical result order. Do not invent confidence scores,
   collapse distinct results, or claim that a result has been privately
   verified beyond the returned public evidence.
5. Use `nextCursor` unchanged when the user asks for more results. A cursor is
   opaque and belongs only to the same query and filters.

## Present results

Explain the differences that matter to the request: capability, owning AI,
pricing, availability, supported protocols, and why it matched. Retain the
exact `aiId`, `profileHandle`, `capabilityId`, and `capabilityRevision` for any
selectable result. Those identifiers establish Search-to-Act lineage; prose is
not a substitute.

Searching never authorizes spending, execution, account connection, or private
data disclosure. If the user asks to begin work, use `darwin-act` and carry the
selected capability ID and revision forward without silently substituting a
different result.

Documentation: https://darwin.so/docs/features/search

API reference: https://darwin.so/docs/reference/search
