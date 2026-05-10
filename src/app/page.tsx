import Link from "next/link";
import { siteConfig } from "@/lib/site";

const packageLinks = [
  {
    href: siteConfig.docsPath,
    label: "Open Docs",
  },
  {
    href: siteConfig.packageUrl,
    label: "View on npm",
  },
  {
    href: siteConfig.repoUrl,
    label: "Browse Repo",
  },
] as const;

export default function Home() {
  return (
    <main className="relative isolate overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(circle_at_top_left,rgba(189,91,48,0.22),transparent_34%),radial-gradient(circle_at_80%_18%,rgba(90,113,94,0.18),transparent_24%)]" />
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-20 sm:px-10">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-accent" />
              Multi-package docs hub for the `util-libs` monorepo
            </div>

            <div className="space-y-5">
              <p className="font-mono text-sm uppercase tracking-[0.28em] text-muted">
                Open Source Libraries
              </p>
              <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
                Documentation for the small libraries that grow out of real
                work.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted sm:text-xl">
                {siteConfig.appName} is the docs home for reusable utilities
                published from{" "}
                <span className="font-medium text-foreground">util-libs</span>.
                Today it starts with {siteConfig.packageName}; the structure is
                ready for more.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              {packageLinks.map((link) => {
                const isPrimary = link.href === siteConfig.docsPath;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={
                      isPrimary
                        ? "inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
                        : "inline-flex items-center justify-center rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-foreground backdrop-blur transition-transform hover:-translate-y-0.5"
                    }
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      link.href.startsWith("http") ? "noreferrer" : undefined
                    }
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <aside className="rounded-[2rem] border border-border bg-card p-6 shadow-[0_30px_80px_rgba(34,27,23,0.12)] backdrop-blur sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">
              Featured Package
            </p>
            <div className="mt-4 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground">
                    {siteConfig.packageName}
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-muted">
                    {siteConfig.packageDescription}
                  </p>
                </div>
                <span className="rounded-full border border-border bg-background/80 px-3 py-1 font-mono text-xs text-muted">
                  v{siteConfig.packageVersion}
                </span>
              </div>

              <dl className="grid gap-3 text-sm text-muted">
                <div className="flex items-center justify-between rounded-2xl border border-border bg-background/75 px-4 py-3">
                  <dt>Primary docs route</dt>
                  <dd className="font-mono text-foreground">
                    /docs/packages/conditional
                  </dd>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-border bg-background/75 px-4 py-3">
                  <dt>Patterns covered</dt>
                  <dd className="font-mono text-foreground">
                    If, Switch, Case, Default
                  </dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
