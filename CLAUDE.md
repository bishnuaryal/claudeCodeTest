# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an OpenAPI-driven Todo API project demonstrating contract-first API development. The project consists of:
- An Express.js server with OpenAPI validation using `express-openapi-validator`
- Auto-generated TypeScript client code from the OpenAPI specification
- Swagger UI documentation at `/docs`

## Architecture

### OpenAPI-First Workflow

The entire API is defined in `openapi.yaml` (OpenAPI 3.0.3 spec). This specification serves as the single source of truth for:
1. Server-side request/response validation (via `express-openapi-validator`)
2. Client SDK generation (TypeScript client in `client/` directory)
3. Interactive API documentation (Swagger UI)

### Server Implementation (`server.js`)

- Express.js server with CommonJS modules
- Uses `express-openapi-validator` middleware for automatic validation of requests and responses against the OpenAPI spec
- In-memory data store (simple array with auto-incrementing IDs)
- Error handler required for OpenAPI validation errors
- Swagger UI served at `/docs` endpoint

### Client Generation (`client/` directory)

Auto-generated TypeScript client using OpenAPI Generator (v7.16.0). The generator creates:
- `apis/DefaultApi.ts` - Main API client class with methods for all endpoints
- `models/` - TypeScript interfaces for Todo, TodoCreate, TodoUpdate
- `runtime.ts` - HTTP client runtime
- `index.ts` - Barrel exports

The client code is generated and should not be manually edited (see `.openapi-generator-ignore` for exceptions).

## Development Commands

### Running the Server

```bash
npm start              # Start server (node server.js)
npm run dev            # Start with watch mode (auto-restart on changes)
```

Server runs on port 3000 (configurable via `PORT` env var). Access Swagger UI at http://localhost:3000/docs

### Code Quality

```bash
npm run lint           # Check for linting errors
npm run lint:fix       # Auto-fix linting errors (including import ordering)
npm run format         # Format all code with Prettier
npm run format:check   # Check if code is properly formatted
```

### Client Generation

When `openapi.yaml` is modified, regenerate the TypeScript client:

```bash
npm run generate-client
```

This runs the OpenAPI Generator CLI configured in `openapitools.json` (v7.16.0).

### Testing the Client

```bash
npm run test-client
```

Requires the server to be running on localhost:3000.

## Key Files

- `openapi.yaml` - OpenAPI 3.0.3 specification (source of truth)
- `server.js` - Express server with OpenAPI validation middleware
- `testClient.ts` - Example usage of the generated TypeScript client
- `client/` - Auto-generated TypeScript client (do not edit manually)
- `tsconfig.json` - TypeScript configuration with strict mode enabled

## TypeScript Configuration

The project uses strict TypeScript settings including:
- `noUncheckedIndexedAccess: true`
- `exactOptionalPropertyTypes: true`
- `module: "nodenext"` and `target: "esnext"`
- `verbatimModuleSyntax: true`

## Coding Standards

### ESLint Configuration

This project uses ESLint with the following rules:
- **TypeScript**: TypeScript Recommended rules enabled
- **Import ordering**: Automatic sorting by group (builtin → external → internal → parent → sibling → index)
- **Naming conventions**:
  - Variables, functions, parameters: `camelCase`
  - Classes, interfaces, types, enums: `PascalCase`
  - Constants: `UPPER_CASE` allowed
- **Console**: `console.log` triggers warnings (use `console.warn` or `console.error`)
- **Variables**: Prefer `const`, no `var` allowed
- **Unused variables**: Error (use `_` prefix to ignore)

### Prettier Configuration

- **Print width**: 100 characters
- **Quotes**: Single quotes (`'`)
- **Semicolons**: Required
- **Trailing commas**: ES5 compatible
- **Tab width**: 2 spaces
- **End of line**: LF

### Important Notes

- Always run `npm run lint:fix` before committing to auto-fix issues
- The `client/` directory is auto-generated and excluded from linting
- Import statements are automatically organized by the linter

## Making API Changes

1. Modify `openapi.yaml` to add/change endpoints or schemas
2. Run `npm run generate-client` to regenerate the TypeScript client
3. Update `server.js` to implement the new/changed endpoints
4. Run `npm run lint:fix` to ensure code follows standards
5. The OpenAPI validator will automatically enforce the contract at runtime

## Git Workflow

This project uses a **branch-based workflow** with pull requests. See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

### Quick Start

```bash
# Create feature branch
git checkout -b feature/your-feature

# Make changes, commit, push
git add .
git commit -m "feat: your description"
git push -u origin feature/your-feature

# Create pull request
gh pr create
```

### Important Rules

- **Never push directly to main branch**
- Always create a feature branch for changes
- Run `npm run lint:fix` before committing
- Create pull requests for code review
- Delete feature branches after merging

## Known Limitations

- **In-memory storage**: Data is lost on server restart (suitable for demos only)
- **No authentication**: API endpoints are publicly accessible
- **DELETE behavior**: Returns 204 even if the todo doesn't exist (idempotent design)
