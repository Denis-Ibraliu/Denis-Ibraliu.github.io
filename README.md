# Commonkit Docs

Documentation site for the Commonkit open-source monorepo, starting with [`@commonkit/conditional`](https://www.npmjs.com/package/@commonkit/conditional).

This app is built with Next.js 16, React 19, and Fumadocs, and is configured for static export so it can be deployed to GitHub Pages.

## Stack

- Next.js 16
- React 19
- Fumadocs
- MDX content
- Biome for linting and formatting

## Local Development

Install dependencies with your preferred package manager, then start the dev server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run format
```

## Project Structure

```text
content/docs/                  MDX documentation content
content/docs/packages/         Package-specific docs
src/app/(docs)/                Fumadocs layout and page routes
src/app/api/search.json/       Static search index route
src/lib/site.ts                Site metadata and package links
src/lib/source.ts              Fumadocs source loader
source.config.ts               MDX content source definition
```

## Content Model

Docs content lives in `content/docs` and is loaded through `fumadocs-mdx`.

- `content/docs/index.mdx` is the docs landing page
- `content/docs/packages/conditional/index.mdx` documents `@commonkit/conditional`

Generated source artifacts are resolved through the `.source` alias configured in `tsconfig.json`.

## Deployment Notes

The app is configured with:

- `output: "export"` for static site generation
- a dynamic `basePath` for GitHub Pages project sites
- a static search index at `/api/search.json`

When `GITHUB_REPOSITORY` and `GITHUB_REPOSITORY_OWNER` are available, the app automatically adjusts its base path for project-site deployments.

## Published Package

- Package: [`@commonkit/conditional`](https://www.npmjs.com/package/@commonkit/conditional)
- Repository: [Denis-Ibraliu/util-libs](https://github.com/Denis-Ibraliu/util-libs)

## License

See the root monorepo for package licensing and contribution details.
