# Fumadocs Docsite for `util-libs`

## Summary

Build a Fumadocs-based documentation site in this Next.js 16 project for the `util-libs` monorepo.

The site should support multiple libraries over time, while initially shipping docs only for `@commonkit/conditional`.

## Goals

- Add a simple landing page at `/`
- Add a Fumadocs-powered docs experience at `/docs`
- Structure docs content around packages so future libraries can be added without changing the routing model
- Publish initial package docs for `@commonkit/conditional`
- Keep the implementation aligned with the current Fumadocs manual setup for Next.js 16

## Non-Goals

- Building a multi-collection or multi-app docs architecture now
- Generating docs automatically from package source
- Creating a separate packages index experience before a second package exists
- Pulling content dynamically from GitHub or npm at runtime

## Information Architecture

### Top-Level Routes

- `/`
  - lightweight marketing/landing page for the docs hub
  - introduces the monorepo and links users into the docs
  - highlights `@commonkit/conditional` as the first published package
- `/docs`
  - the documentation app shell
  - search-enabled Fumadocs experience
  - package-first sidebar structure

### Docs Content Structure

The content source should be organized by package rather than by one-off topics:

```text
content/docs/
  index.mdx
  packages/
    conditional/
      overview.mdx
      if.mdx
      switch.mdx
      rules-and-notes.mdx
```

This structure keeps the first package explicit while leaving a clean path for future packages under `content/docs/packages/<package-name>/...`.

## UX Design

### Landing Page

The homepage should stay intentionally simple:

- short explanation of what `util-libs` is
- clear CTA linking to `/docs`
- a featured package card for `@commonkit/conditional`
- direct links to npm and GitHub for the package/repository

The visual tone should feel more intentional than the default Next starter, but still lightweight and documentation-oriented.

### Docs Experience

The docs UI should:

- use Fumadocs default layouts
- brand the site as `Util Libs`
- keep navigation package-oriented
- make `@commonkit/conditional` feel like the first package in a growing docs hub, not a hardcoded one-off site

## Initial Package Content

The first package docs should be based on the existing README and npm metadata for `@commonkit/conditional`.

### Pages

#### `Overview`

Should include:

- what the package does
- why it is useful
- install commands
- import example
- quick usage introduction

#### `If`

Should include:

- purpose of `If`
- simple usage example
- prop API snippet

#### `Switch`

Should include:

- purpose of `Switch`
- first-match rendering behavior
- usage example with `Switch.Case` and `Switch.Default`
- API snippets for `Switch.Case` and `Switch.Default`

#### `Rules and Notes`

Should include:

- direct-child constraints
- exactly-one-default requirement
- at-least-one-case requirement
- note that the first matching case wins

## Technical Design

### Framework and Setup

This project already uses:

- Next.js `16.2.6`
- React `19.2.4`
- Tailwind CSS `4`

Implementation should follow the current Fumadocs manual installation guidance for Next.js 16:

- add Fumadocs UI and MDX packages
- add MDX source config
- wrap the root app with `RootProvider`
- import the required Fumadocs CSS
- add docs layout/page routes
- add search API route

### Routing

Use a standard Fumadocs route setup:

- `src/app/docs/layout.tsx`
- `src/app/docs/[[...slug]]/page.tsx`
- `src/app/api/search/route.ts`

### Shared Source and Layout

Add shared config/helpers for:

- docs source loading
- shared docs layout options
- MDX component mapping

These should be implemented in conventional project files such as:

- `source.config.ts`
- `src/lib/source.ts`
- `src/lib/layout.shared.tsx`
- `mdx-components.tsx`

Exact filenames can vary slightly if the current Fumadocs docs require a different convention, but the structure should remain conservative and close to the official setup.

### Next.js Config

Fumadocs MDX is ESM-only, so the project should use an ESM Next config file if required by the current setup. Since the repo currently has `next.config.ts`, this is the main compatibility point to verify during implementation.

The implementation should favor the official Fumadocs-compatible configuration over preserving the existing filename if they conflict.

### TypeScript Config

If Fumadocs recommends a path alias for generated collections, add it so the docs source resolves cleanly during dev/build.

## Content and Metadata Sources

Initial copy should come from:

- `packages/conditional/README.md` in `Denis-Ibraliu/util-libs`
- npm package metadata for `@commonkit/conditional`

At the time of planning, npm shows:

- package: `@commonkit/conditional`
- latest version: `0.0.2`
- published: `2026-05-10`

This data can be embedded statically in the initial landing page/package overview copy.

## Error Handling and Constraints

- If Fumadocs setup conflicts with the default Next starter structure, prefer the Fumadocs-compatible structure
- If the search route requires generated docs source output, ensure the source config path is correct before validating builds
- Avoid over-customizing the Fumadocs shell in the first pass; stability is more important than theme depth

## Verification

Before calling the work complete:

- install dependencies successfully
- run formatting/linting as appropriate for the repo
- run a production build
- confirm the generated source resolves during build
- verify the landing page and `/docs` route compile cleanly

## Open Decisions Resolved

- The site is a multi-package docs hub, not a one-package microsite
- The homepage remains a simple landing page
- Docs live under `/docs`
- Initial implementation uses a single shared Fumadocs site and single docs tree

## Implementation Recommendation

Proceed with a single Fumadocs site using package-oriented content under `content/docs/packages/conditional`.

This gives the cleanest path to future library docs while keeping the first release small, stable, and easy to understand.
