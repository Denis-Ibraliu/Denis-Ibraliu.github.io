# Conditional Docsite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Fumadocs-powered `/docs` experience plus a simple landing page for the `util-libs` docs hub, seeded with docs for `@commonkit/conditional`.

**Architecture:** Keep one Next.js 16 app and one Fumadocs docs tree. Use Fumadocs MDX as the local content source, put package docs under `content/docs/packages/conditional`, and keep the homepage custom while the docs shell stays close to Fumadocs defaults.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind CSS 4, Fumadocs UI, Fumadocs MDX, Biome, TypeScript

---

### Task 1: Install and configure Fumadocs

**Files:**
- Modify: `package.json`
- Modify: `tsconfig.json`
- Replace: `next.config.ts`
- Create: `source.config.ts`

- [ ] **Step 1: Add the required dependencies to `package.json`**

```json
{
  "dependencies": {
    "fumadocs-core": "latest",
    "fumadocs-mdx": "latest",
    "fumadocs-ui": "latest"
  },
  "devDependencies": {
    "@types/mdx": "latest"
  }
}
```

- [ ] **Step 2: Convert Next config to the Fumadocs-compatible ESM setup**

```js
import { createMDX } from "fumadocs-mdx/next";

const config = {
  reactCompiler: true,
};

const withMDX = createMDX();

export default withMDX(config);
```

- [ ] **Step 3: Add the generated collections alias in `tsconfig.json`**

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "collections/*": ["./.source/*"]
    }
  }
}
```

- [ ] **Step 4: Create `source.config.ts` for the local docs tree**

```ts
import { defineConfig, defineDocs } from "fumadocs-mdx/config";

export const docs = defineDocs({
  dir: "content/docs",
});

export default defineConfig();
```

- [ ] **Step 5: Install dependencies and generate the updated lockfile**

Run: `bun install`  
Expected: install succeeds and `bun.lock` updates with Fumadocs packages

### Task 2: Wire the app shell and docs source

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`
- Create: `src/lib/source.ts`
- Create: `src/lib/layout.shared.tsx`
- Create: `mdx-components.tsx`

- [ ] **Step 1: Update the root layout to use `RootProvider`**

```tsx
import { RootProvider } from "fumadocs-ui/provider/next";

<html lang="en" suppressHydrationWarning>
  <body className="flex min-h-screen flex-col">
    <RootProvider>{children}</RootProvider>
  </body>
</html>
```

- [ ] **Step 2: Import the required Fumadocs CSS and define the site theme tokens**

```css
@import "tailwindcss";
@import "fumadocs-ui/css/neutral.css";
@import "fumadocs-ui/css/preset.css";
```

- [ ] **Step 3: Create the shared docs source loader**

```ts
import { loader } from "fumadocs-core/source";
import { docs } from "collections/server";

export const source = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
});
```

- [ ] **Step 4: Create shared layout options for the docs UI**

```tsx
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: "Util Libs",
    },
  };
}
```

- [ ] **Step 5: Create the root MDX components entrypoint**

```tsx
import defaultMdxComponents from "fumadocs-ui/mdx";

export function getMDXComponents(components) {
  return {
    ...defaultMdxComponents,
    ...components,
  };
}
```

### Task 3: Add the docs routes and search endpoint

**Files:**
- Create: `src/app/docs/layout.tsx`
- Create: `src/app/docs/[[...slug]]/page.tsx`
- Create: `src/app/api/search/route.ts`

- [ ] **Step 1: Create the docs layout route**

```tsx
import { DocsLayout } from "fumadocs-ui/layouts/docs";

export default function Layout({ children }) {
  return <DocsLayout tree={source.pageTree} {...baseOptions()}>{children}</DocsLayout>;
}
```

- [ ] **Step 2: Create the catch-all docs page route**

```tsx
const page = source.getPage(slug);
if (!page) notFound();
```

- [ ] **Step 3: Render the MDX page with the Fumadocs page layout**

```tsx
import { DocsPage, DocsBody, DocsTitle, DocsDescription } from "fumadocs-ui/page";
```

- [ ] **Step 4: Add the search endpoint**

```ts
import { createFromSource } from "fumadocs-core/search/server";

export const GET = createFromSource(source);
```

- [ ] **Step 5: Run a build to confirm source generation and route wiring**

Run: `bun run build`  
Expected: `.source` generates and the docs app compiles

### Task 4: Replace the starter homepage and author initial docs

**Files:**
- Modify: `src/app/page.tsx`
- Create: `content/docs/index.mdx`
- Create: `content/docs/packages/conditional/overview.mdx`
- Create: `content/docs/packages/conditional/if.mdx`
- Create: `content/docs/packages/conditional/switch.mdx`
- Create: `content/docs/packages/conditional/rules-and-notes.mdx`

- [ ] **Step 1: Replace the default starter homepage with the docs-hub landing page**

```tsx
<a href="/docs">Open Docs</a>
```

- [ ] **Step 2: Create a short docs home page**

```mdx
---
title: Introduction
---
```

- [ ] **Step 3: Split `@commonkit/conditional` docs into focused MDX pages**

```mdx
---
title: Overview
---
```

- [ ] **Step 4: Include npm install/import snippets and the `If` / `Switch` examples from the package README**

```tsx
import { If, Switch } from "@commonkit/conditional";
```

- [ ] **Step 5: Add package rules and behavior notes**

```mdx
- `Switch` must contain at least one `Switch.Case`
- `Switch` must contain exactly one `Switch.Default`
```

### Task 5: Format and verify

**Files:**
- Verify the full modified tree

- [ ] **Step 1: Run the formatter**

Run: `bunx biome format --write .`  
Expected: files format cleanly

- [ ] **Step 2: Run lint checks**

Run: `bun run lint`  
Expected: no Biome diagnostics

- [ ] **Step 3: Run a fresh production build**

Run: `bun run build`  
Expected: successful Next.js production build

- [ ] **Step 4: Review the diff for accidental changes**

Run: `git diff --stat`  
Expected: only the intended docsite/setup files changed

- [ ] **Step 5: Report results with verification evidence**

Include the commands run, whether they passed, and any remaining follow-up items.
