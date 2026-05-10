import { redirect } from "next/navigation";
import { getLegacyDocsRedirectPath } from "@/lib/docs-routing";
import { source } from "@/lib/source";

type PageProps = {
  params: Promise<{
    slug?: string[];
  }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  redirect(getLegacyDocsRedirectPath(slug));
}

export async function generateStaticParams() {
  const params = source.generateParams();
  const hasRootParam = params.some(
    (param) => !param.slug || param.slug.length === 0,
  );

  return hasRootParam ? params : [{ slug: [] }, ...params];
}
