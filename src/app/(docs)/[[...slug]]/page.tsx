import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/layouts/docs/page";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/components/mdx";
import { source } from "@/lib/source";

type PageProps = {
  params: Promise<{
    slug?: string[];
  }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const page = source.getPage(slug);

  if (!page) {
    notFound();
  }

  const MDX = page.data.body;

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      tableOfContent={{ style: "clerk" }}
    >
      <DocsTitle className="max-w-4xl text-[var(--text-title-h4)] leading-[var(--text-title-h4-line-height)] tracking-[var(--text-title-h4-letter-spacing)] font-medium text-balance sm:text-[var(--text-title-h2)] sm:leading-[var(--text-title-h2-line-height)]">
        {page.data.title}
      </DocsTitle>
      <DocsDescription className="max-w-3xl text-[var(--text-doc-label)] leading-[var(--text-doc-label-line-height)] tracking-[var(--text-doc-label-letter-spacing)] text-fd-muted-foreground">
        {page.data.description}
      </DocsDescription>
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = source.getPage(slug);

  if (!page) {
    notFound();
  }

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
