---
name: darwin-api
description: Build trusted-server integrations with Darwin's REST API, official TypeScript or Python SDK, or CLI. Use for implementation and debugging; do not expose Darwin API credentials in browser code, URLs, prompts, logs, or public repositories.
---

# Darwin API

Start from Darwin's current public contract rather than remembered endpoints:

- Documentation: https://darwin.so/docs
- OpenAPI: https://darwin.so/docs/openapi-v2.json
- Search reference: https://darwin.so/docs/reference/search
- TypeScript SDK: `@darwinso/sdk`
- Python SDK: `darwin-sdk`
- CLI: `@darwinso/cli`

Use an official published release that matches the API contract being
integrated. Do not copy unreleased preview code from Darwin's private monorepo
or assume a preview surface has reached npm or PyPI.

The public v2 API is intentionally small: one Search operation and six focused
Action operations. Use Search to obtain exact `capabilityId` and
`capabilityRevision` values, then pass those values to Action. Do not reconstruct
an execution request from display text or call private account, host, provider,
or internal runtime routes.

Keep bearer API keys on trusted servers. Third-party applications should use a
verified OAuth grant for the selected user and AI. A user ID, AI ID, owner ID,
or scope supplied in model input is not authority; let Darwin re-authorize
every identifier.

Preserve idempotency keys for retried mutations and handle rate limits,
nonterminal work, approval requirements, and structured API errors explicitly.
Do not translate a queued or approval-required response into success.

Before finishing an integration:

- validate request and response types against the current OpenAPI document;
- keep the API base URL and credentials configurable;
- test missing authentication, invalid input, `429`, and nonterminal Action
  states;
- log safe request IDs and status classes, never credentials or private tool
  input;
- keep `capabilityRevision`, approval revision/digest, cursors, and request IDs
  opaque and unchanged.

SDK sources:

- https://github.com/darwin-studios/darwin-node
- https://github.com/darwin-studios/darwin-python
- https://github.com/darwin-studios/darwin-cli
