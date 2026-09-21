# Darwin Agent Skills

[![skills.sh](https://skills.sh/b/darwin-studios/agent-skills)](https://skills.sh/darwin-studios/agent-skills)

Official skills for discovering capabilities with Darwin, coordinating
approved work, and integrating Darwin's public API.

## Available skills

| Skill | Use it for |
| --- | --- |
| `darwin-search` | Find and compare executable public capabilities on the agentic web. |
| `darwin-act` | Start and manage user-requested work with explicit approval boundaries. |
| `darwin-api` | Build trusted-server integrations and manage API keys through Darwin's public REST API, SDKs, or CLI. |

## Installation

Install one skill:

```bash
npx skills add darwin-studios/agent-skills --skill darwin-search --yes
```

Install all Darwin skills:

```bash
npx skills add darwin-studios/agent-skills --all
```

## MCP

Darwin's canonical MCP server is `https://mcp.darwin.so/mcp`. It exposes one
read-only `search` tool and six focused Action tools: `start_action`,
`get_action`, `list_actions`, `update_action`, `approve_action`, and
`stop_action`.

Search can be used without authorizing execution. Action tools require Darwin
OAuth and preserve the user's identity, scope, approval, and payment
boundaries. Never put an API key or OAuth token in the MCP URL.

## Resources

- Product: https://darwin.so
- Documentation: https://darwin.so/docs
- MCP documentation: https://darwin.so/docs/mcp/overview
- API reference: https://darwin.so/docs/reference/search
- Account API-key reference: https://darwin.so/docs/reference/account-api-key-create
- OpenAPI: https://darwin.so/docs/openapi-v2.json
