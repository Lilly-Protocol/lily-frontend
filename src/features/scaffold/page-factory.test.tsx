import { render, screen } from '@testing-library/react';

import { createScaffoldPage } from './page-factory';

describe('createScaffoldPage', () => {
  it('creates a route-specific scaffold component', () => {
    const DocsPage = createScaffoldPage('docs');

    render(<DocsPage />);

    expect(screen.getByRole('heading', { level: 1, name: /documentation/i })).toBeInTheDocument();
  });
});
