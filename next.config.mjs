import { createMDX } from "fumadocs-mdx/next";

const repository = process.env.GITHUB_REPOSITORY?.split("/")[1];
const repositoryOwner = process.env.GITHUB_REPOSITORY_OWNER;
const isUserSiteRepository =
  repository &&
  repositoryOwner &&
  repository.toLowerCase() === `${repositoryOwner.toLowerCase()}.github.io`;
const basePath =
  repository && !isUserSiteRepository ? `/${repository}` : undefined;

const config = {
  output: "export",
  trailingSlash: true,
  reactCompiler: true,
  basePath,
};

const withMDX = createMDX();

export default withMDX(config);
