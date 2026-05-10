import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { siteConfig } from "@/lib/site";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: siteConfig.appName,
    },
    githubUrl: siteConfig.repoUrl,
  };
}
