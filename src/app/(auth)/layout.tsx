import { SectionLayout } from '@/components/scaffold/section-layout';
import { getSectionRoutes, sectionDefinitions } from '@/config/routes';

const authSection = sectionDefinitions.find(
  (section) => section.key === "auth",
);

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!authSection) {
    throw new Error('Missing auth section definition.');
  }

  return (
    <SectionLayout
      title={authSection.label}
      description={authSection.description}
      routes={getSectionRoutes('auth')}
    >
      {children}
    </SectionLayout>
  );
}
