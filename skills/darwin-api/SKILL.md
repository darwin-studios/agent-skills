---
name: darwin-api
description: Build trusted-server integrations with Darwin's REST API, official TypeScript or Python SDK, or CLI. Use for implementation and debugging; do not expose Darwin API credentials in browser code, URLs, prompts, logs, or public repositories.
---

# Darwin API

Start from Darwin's current public contract rather than remembered endpoints:

- Documentation: https://darwin.so/docs
- OpenAPI: https://darwin.so/docs/openapi-v2.json
- Search reference: https://darwin.so/docs/reference/search
- Account API-key reference: https://darwin.so/docs/reference/account-api-key-create
- TypeScript SDK: `@darwinso/sdk`
- Python SDK: `darwin-sdk`
- CLI: `@darwinso/cli`

Use an official published release that matches the API contract being
integrated. Do not copy unreleased preview code from Darwin's private monorepo
or assume a preview surface has reached npm or PyPI.

The public v2 API is intentionally small: one Search operation, focused Action
operations, and bounded account, application, API-key, and Search-history
operations.
Use Search to obtain exact `capabilityId` and `capabilityRevision` values, then
pass those values to Action. Do not reconstruct an execution request from
display text or call private host, provider, or internal runtime routes.

Use the account endpoints only with an authenticated Darwin account session:

- `POST /account/api-keys` creates a scoped key and returns the plaintext
  `apiKey` once. Store it securely; it cannot be retrieved later.
- `GET /account/api-keys` lists non-secret metadata for active, expired, and
  revoked keys.
- `GET /account/api-keys/usage` reports lifetime authenticated-request counts,
  not Action spend, wallet activity, or invoices.
- `DELETE /account/api-keys/{apiKeyId}` immediately revokes a key by its
  non-secret ID, not by its secret value.

Do not send a bearer API key to these account endpoints or attempt to read the
HTTP-only session cookie from client code. Prefer Darwin's Developer settings
for interactive key management. When building a trusted first-party account
surface, follow the current `AccountSession` security scheme in OpenAPI and
protect every mutation against cross-site requests.

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
