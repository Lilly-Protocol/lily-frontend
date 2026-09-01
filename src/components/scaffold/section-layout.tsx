import { SectionNav } from "@/components/scaffold/section-nav";
import { SiteFooter } from "@/components/scaffold/site-footer";
import { SiteHeader } from "@/components/scaffold/site-header";

import type { RouteScaffold } from "@/types/site";

type SectionLayoutProps = {
  readonly title: string;
  readonly description: string;
  readonly routes: readonly RouteScaffold[];
  readonly children: React.ReactNode;
};

export function SectionLayout({
  title,
  description,
  routes,
  children,
}: SectionLayoutProps) {
  return (
    <>
      <SiteHeader />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:flex-row lg:px-8">
        <aside className="lg:w-80 lg:flex-none">
          <div className="surface rounded-3xl p-6">
            <p className="eyebrow text-(--color-accent)">{title}</p>
            <p className="mt-3 text-sm leading-7 text-(--color-muted)">
              {description}
            </p>
            <div className="mt-6">
              <SectionNav routes={routes} />
            </div>
          </div>
        </aside>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
      <SiteFooter />
    </>
  );
}
