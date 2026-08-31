import { render, screen } from '@testing-library/react';

import { getSectionRoutes } from '@/config/routes';

import { SectionLayout } from './section-layout';

describe('SectionLayout', () => {
  it('renders the shared shell, global nav, and section route links', () => {
    render(
      <SectionLayout
        title="Public marketing"
        description="Public-facing route group."
        routes={getSectionRoutes('marketing')}
      >
        <div>Section content</div>
      </SectionLayout>,
    );

    expect(screen.getByRole('link', { name: /lily protocol/i })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /docs/i })).toHaveAttribute('href', '/docs');
    expect(screen.getByRole('link', { name: /landing page/i })).toHaveAttribute('href', '/');
    expect(screen.getByText('Section content')).toBeInTheDocument();
  });

  it('shows dynamic routes as non-clickable scaffold entries', () => {
    render(
      <SectionLayout
        title="Dashboard"
        description="Signed-in workspace."
        routes={getSectionRoutes('dashboard')}
      >
        <div>Dashboard section</div>
      </SectionLayout>,
    );

    expect(screen.getByText('/app/agents/[id]')).toBeInTheDocument();
  });
});
