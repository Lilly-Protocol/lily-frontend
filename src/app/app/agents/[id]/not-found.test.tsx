import { render, screen } from '@testing-library/react';

import AgentNotFound from './not-found';

describe('AgentNotFound', () => {
  it('renders the agent directory recovery action with design tokens', () => {
    const { container } = render(<AgentNotFound />);

    expect(screen.getByRole('main')).toHaveClass('bg-(--color-surface)', 'text-(--color-ink)');
    expect(screen.getByRole('heading', { level: 1, name: /agent not found/i })).toBeInTheDocument();
    expect(screen.getByText('404')).toHaveClass('text-(--color-accent)');
    expect(screen.getByText(/agent ID you requested/i)).toHaveClass('text-(--color-muted)');

    const directoryLink = screen.getByRole('link', {
      name: /browse all agents/i,
    });
    expect(directoryLink).toHaveAttribute('href', '/app/agents');
    expect(directoryLink).toHaveClass(
      'border-(--color-line)',
      'bg-(--color-panel-muted)',
      'hover:border-(--color-accent)',
    );

    expect(container.innerHTML).not.toMatch(/(?:slate-|dark:)/);
  });
});
