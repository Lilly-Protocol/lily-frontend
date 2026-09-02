// src/components/SiteHeader/SiteHeader.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SiteHeader from './SiteHeader';
import { routes } from '../routes'; // Adjust path as needed

describe('SiteHeader', () => {
  it('should have links matching all registered routes', () => {
    // Collect all route paths from the registry
    const routePaths = new Set<string>();
    const collectPaths = (route: any) => {
      if (route.path) routePaths.add(route.path);
      if (route.children) route.children.forEach(collectPaths);
    };
    routes.forEach(collectPaths);

    // Render SiteHeader within router
    render(
      <MemoryRouter>
        <SiteHeader />
      </MemoryRouter>
    );

    // Get all link elements
    const links = screen.getAllByRole('link');
    const linkPaths = links.map(link => link.getAttribute('href'));

    // Assert each route path has a corresponding link
    routePaths.forEach(path => {
      expect(linkPaths).toContain(path);
    });

    // Optional: Assert no extra links exist (if strictly required)
    // linkPaths.forEach(path => {
    //   expect(routePaths).toContain(path);
    // });
  });
});