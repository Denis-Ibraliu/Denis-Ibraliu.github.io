const repository = process.env.GITHUB_REPOSITORY?.split("/")[1];
const repositoryOwner = process.env.GITHUB_REPOSITORY_OWNER;

export function getBasePath() {
  if (!repository || !repositoryOwner) {
    return "";
  }

  const isUserSiteRepository =
    repository.toLowerCase() === `${repositoryOwner.toLowerCase()}.github.io`;

  return isUserSiteRepository ? "" : `/${repository}`;
}

export function getSearchIndexPath() {
  return `${getBasePath()}/api/search.json`;
}
