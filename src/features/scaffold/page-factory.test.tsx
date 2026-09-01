import { render, screen } from '@testing-library/react';

import { createScaffoldPage } from './page-factory';

describe('createScaffoldPage', () => {
  it('creates a route-specific scaffold component', () => {
    const DocsPage = createScaffoldPage('docs');

    render(<DocsPage />);

    expect(screen.getByRole('heading', { level: 1, name: /documentation/i })).toBeInTheDocument();
  });

  it.each(routeScaffolds)("renders one h1 for $id", (route) => {
    const ScaffoldPage = createScaffoldPage(route.id);

    render(<ScaffoldPage />);

    expectSingleHeading(route.title);
  });
});
