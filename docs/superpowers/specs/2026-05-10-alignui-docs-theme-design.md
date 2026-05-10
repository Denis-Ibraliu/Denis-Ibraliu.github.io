# AlignUI Docs Theme Surface Refresh

## Summary

Apply a lightweight AlignUI-inspired design theme to the docs site without changing the underlying Fumadocs structure. The goal is to move from the current warm/editorial styling toward a cleaner product-docs look using a cool neutral palette, a blue primary accent, and a more deliberate typographic rhythm.

This is intentionally a surface refresh, not a docs shell redesign. The implementation should preserve existing routing, layout composition, and MDX rendering behavior.

## Goals

- Refresh the visual theme of the docs site to feel closer to polished SaaS documentation
- Reuse the AlignUI token system where it meaningfully improves consistency
- Keep the implementation low-risk by concentrating changes in global theming and minimal layout touch points
- Preserve compatibility with Fumadocs navigation, MDX content, TOC, and default layout behavior
- Maintain both light and dark theme support through the existing `prefers-color-scheme` approach

## Non-Goals

- Rebuilding the docs shell layout or replacing Fumadocs components
- Redesigning the landing page as a separate marketing surface
- Implementing every AlignUI token verbatim when it provides no value to this codebase
- Introducing new interactive components, animations, or information architecture changes

## Scope

The work should focus on the current docs experience and only touch adjacent files when needed to support the theme cleanly.

Primary scope:

- Define a practical subset of AlignUI-inspired CSS custom properties in `src/app/globals.css`
- Map those properties into Tailwind v4 `@theme inline`
- Replace the current warm semantic palette with cool neutrals and blue-primary accents
- Improve typography scaling and line height for docs titles, labels, paragraphs, and supporting UI text
- Refresh global surfaces such as page background, cards, borders, links, selection state, and subtle shadows
- Ensure dark mode mirrors the same semantic structure with slate-like dark surfaces and readable contrast

Out of scope unless a minor fix is necessary to support the theme:

- Structural changes in `src/app/docs/layout.tsx`
- Structural changes in `src/app/docs/[[...slug]]/page.tsx`
- A broader redesign of `src/app/page.tsx`

## Design Direction

### Visual tone

The target is a crisp product-docs presentation:

- bright, quiet backgrounds
- near-white elevated surfaces
- restrained borders
- soft but purposeful shadows
- blue used as the primary emphasis color
- typography that feels measured and readable instead of expressive or editorial

The docs should feel more like product documentation for a modern developer tool and less like a branded landing page.

### Color system

Use AlignUI’s semantic color model as the reference shape for the local theme. The implementation does not need the full matrix of tokens, but it should preserve the semantic intent:

- background layers for page, soft surfaces, and elevated cards
- text tiers for primary, secondary, muted, and inverted copy
- stroke tiers for subtle and default borders
- primary color family centered on blue
- utility semantic colors only if existing components already consume them

Recommended color character:

- Light mode: cool off-white page background, white content surfaces, slate text, pale blue-gray borders, medium blue primary accents
- Dark mode: deep slate background, slightly raised charcoal surfaces, desaturated cool borders, bright but controlled blue accents

### Typography

Keep the existing Next font loading approach. This refresh should express AlignUI through scale and rhythm rather than a font swap unless implementation reveals a concrete readability problem.

Apply the token system selectively:

- use title sizing ideas for page titles and major headings
- use paragraph sizing ideas for docs body text and descriptions
- use label and subheading sizing ideas for smaller interface text such as nav labels, badges, and metadata

The result should improve scanability and reading comfort without fighting Fumadocs’ underlying component structure.

## File-Level Plan

### `src/app/globals.css`

This file becomes the source of truth for the refresh.

Planned changes:

- replace current theme variables with AlignUI-inspired semantic variables
- add a practical subset of token aliases for color, radius, shadow, and type scale
- map those values through `@theme inline` for Tailwind consumption
- update global `html`, `body`, `a`, and `::selection` styling to match the new palette
- add low-risk overrides for docs-oriented elements if needed, such as content surfaces or typographic rhythm

This file should carry most of the implementation weight.

### `src/app/layout.tsx`

Only change this file if the font setup needs minor adjustment. If the current `next/font` usage remains suitable, leave it untouched.

### `src/app/docs/layout.tsx`

No structural redesign is planned. Only make small, additive changes if a class hook or configuration tweak is necessary to help the refreshed theme read correctly.

### `src/app/docs/[[...slug]]/page.tsx`

No structural redesign is planned. Only make small, additive changes if content presentation needs a minimal enhancement that cannot be achieved globally.

### `src/app/page.tsx`

The landing page is outside the main scope. Only adjust it if the new global tokens create an obvious mismatch that can be corrected with a minimal change.

## Token Selection Strategy

Not all AlignUI tokens should be copied in full. Use only the subset that provides clear value in this codebase.

Prioritize:

- semantic background, text, and stroke tokens
- primary blue token family
- a small radius scale
- a small shadow scale
- the docs-relevant typography tokens

Deprioritize or omit unless a real use emerges:

- broad status palettes not used by the current UI
- social brand colors
- specialized button focus shadows that do not map cleanly to the existing docs experience
- animation tokens not currently needed by the docs site

This keeps the theme maintainable and prevents token bloat.

## Constraints

- Respect the repo instruction that this Next.js version may differ from familiar conventions
- Follow the existing Tailwind v4 + global CSS setup already in use
- Avoid rewiring Fumadocs internals or adding brittle selector hacks where possible
- Preserve accessibility through sufficient contrast in both light and dark modes
- Prefer additive theming over component rewrites

## Risks

### Over-theming third-party UI

Fumadocs ships its own visual defaults. Heavy overrides may create fragility or visual inconsistencies across future upgrades.

Mitigation:

- keep overrides targeted and semantic
- prefer global tokens over deep component-specific overrides
- avoid large layout rewrites

### Incomplete token mapping

Trying to mirror the entire AlignUI token catalog may increase complexity without visible benefit.

Mitigation:

- implement only the subset used by the docs site
- preserve semantic naming so the system can expand later if needed

### Dark mode regressions

A new light theme can look polished while dark mode quietly becomes low-contrast or muddy.

Mitigation:

- define dark-mode semantic values intentionally, not by simple inversion
- verify page title, body copy, links, borders, and elevated surfaces in dark mode

## Verification

Before calling the work complete:

- run lint and build checks
- visually inspect the docs route and at least one content page
- confirm title, paragraph, and small text hierarchy feels intentional
- confirm links, borders, and selection states look consistent
- confirm Fumadocs nav, sidebar, TOC, and MDX rendering still behave normally
- confirm dark mode remains readable and visually coherent

## Success Criteria

The refresh is successful if:

- the docs visibly shift from warm/editorial to cool product-docs styling
- the theme feels more polished without changing how the docs site works
- most styling changes are centralized in `src/app/globals.css`
- the implementation remains small enough to be maintained alongside Fumadocs updates
