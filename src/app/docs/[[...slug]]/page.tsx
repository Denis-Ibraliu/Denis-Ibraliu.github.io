import { redirect } from "next/navigation";
import { getLegacyDocsRedirectPath } from "@/lib/docs-routing";

type PageProps = {
  params: Promise<{
    slug?: string[];
  }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  redirect(getLegacyDocsRedirectPath(slug));
}
