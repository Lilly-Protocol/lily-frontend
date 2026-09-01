import { SectionLayout } from "@/components/scaffold/section-layout";
import { SiteFooter } from "@/components/scaffold/site-footer";
import { getSectionRoutes, routeScaffolds, sectionDefinitions } from "@/config/routes";

const marketingSection = sectionDefinitions.find(
  (section) => section.key === "marketing",
);

const legalRoutes = routeScaffolds.filter((route) => route.section === "legal");
const supportRoutes = routeScaffolds.filter((route) => route.section === "docs");

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!marketingSection) {
    throw new Error("Missing marketing section definition.");
  }

  return (
    <>
      <SectionLayout
        title={marketingSection.label}
        description={marketingSection.description}
        routes={getSectionRoutes("marketing")}
      >
        {children}
      </SectionLayout>
      <SiteFooter legalRoutes={legalRoutes} supportRoutes={supportRoutes} />
    </>
  );
}
