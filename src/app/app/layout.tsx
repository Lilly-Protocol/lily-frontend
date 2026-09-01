import { SectionLayout } from '@/components/scaffold/section-layout';
import { getSectionRoutes, sectionDefinitions } from '@/config/routes';

const dashboardSection = sectionDefinitions.find((section) => section.key === 'dashboard');

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!dashboardSection) {
    throw new Error('Missing dashboard section definition.');
  }

  return (
    <SectionLayout
      title={dashboardSection.label}
      description={dashboardSection.description}
      routes={getSectionRoutes('dashboard')}
    >
      {children}
    </SectionLayout>
  );
}
