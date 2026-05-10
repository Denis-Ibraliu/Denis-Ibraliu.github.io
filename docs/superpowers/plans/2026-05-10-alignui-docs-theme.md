# AlignUI Docs Theme Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refresh the docs site with an AlignUI-inspired cool-neutral theme while preserving the current Fumadocs structure and behavior.

**Architecture:** Centralize the theme in `src/app/globals.css` using a practical subset of semantic tokens that feed both local Tailwind utilities and Fumadocs `--color-fd-*` variables. Keep layout code stable and only make a minimal landing-page adjustment where hardcoded warm colors would otherwise clash.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, Fumadocs UI, global CSS custom properties

---

### Task 1: Establish the tokenized theme layer

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace the warm root tokens with a practical AlignUI-inspired semantic set**

Add root-level background, text, stroke, primary, radius, and shadow variables for light mode, then mirror them in the dark-mode block.

- [ ] **Step 2: Map the new semantic variables into Tailwind and Fumadocs**

Expose the tokens through `@theme inline` and connect them to the `--color-fd-*` variables that Fumadocs already consumes.

- [ ] **Step 3: Update the global surface styling**

Refresh `html`, `body`, links, and selection behavior to use the new cool-neutral palette and subtler blue accents.

- [ ] **Step 4: Add docs-oriented typography and content surface overrides**

Tune prose, code, blockquotes, tables, sidebar surfaces, and TOC-adjacent chrome with low-risk selectors so the docs feel more product-like without changing structure.

### Task 2: Clean up the landing-page mismatch

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace the warm decorative gradient with a cool-neutral / blue version**

Update the hero background effect so it aligns with the new docs palette.

- [ ] **Step 2: Refresh any hardcoded surface shadows that still feel warm**

Adjust the featured package card shadow so it matches the new tokenized theme more closely.

### Task 3: Verify the refresh

**Files:**
- Verify: `src/app/globals.css`
- Verify: `src/app/page.tsx`

- [ ] **Step 1: Run lint**

Run: `npm run lint`

- [ ] **Step 2: Run build**

Run: `npm run build`

- [ ] **Step 3: Review the changed files and summarize any residual risk**

Confirm the implementation stayed within the intended surface-refresh scope and note if any visual-only risk remains that build tooling cannot catch.
