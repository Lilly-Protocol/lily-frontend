import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SiteHeader } from './site-header';
import { routes } from '@/config/site';

describe('SiteHeader', () => {
  it('renders all expected navigation links from site config', () => {
    render(<SiteHeader />);

    const expectedLinks = [
      { href: routes.home, label: 'Lily Protocol' },
      { href: routes.docs, label: 'Docs' },
      { href: routes.signin, label: 'Sign in' },
      { href: routes.dashboard, label: 'Dashboard' },
    ];

    for (const link of expectedLinks) {
      const element = screen.getByRole('link', { name: link.label });
      expect(element).toBeInTheDocument();
      expect(element).toHaveAttribute('href', link.href);
    }
  });

  it('contains no dead links outside the known route registry', () => {
    render(<SiteHeader />);
    const links = screen.getAllByRole('link');
    const knownHrefs = Object.values(routes) as string[];

    for (const link of links) {
      const href = link.getAttribute('href');
      expect(knownHrefs).toContain(href);
    }
  });
});
