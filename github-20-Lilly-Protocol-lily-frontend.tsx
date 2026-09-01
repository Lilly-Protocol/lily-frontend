import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PageScaffold from './PageScaffold';

describe('PageScaffold', () => {
  describe('dynamicLabel', () => {
    it('renders default label when dynamicLabel is not provided', () => {
      render(<PageScaffold>Content</PageScaffold>);
      expect(screen.getByText('Page')).toBeInTheDocument();
    });

    it('renders custom dynamicLabel when provided', () => {
      render(<PageScaffold dynamicLabel="Custom Label">Content</PageScaffold>);
      expect(screen.getByText('Custom Label')).toBeInTheDocument();
    });

    it('does not render label when dynamicLabel is null', () => {
      render(<PageScaffold dynamicLabel={null}>Content</PageScaffold>);
      expect(screen.queryByText('Page')).not.toBeInTheDocument();
    });
  });

  describe('sectionEyebrow', () => {
    it('renders section eyebrow when provided', () => {
      render(<PageScaffold sectionEyebrow="New Feature">Content</PageScaffold>);
      expect(screen.getByText('New Feature')).toBeInTheDocument();
    });

    it('does not render section eyebrow when not provided', () => {
      render(<PageScaffold>Content</PageScaffold>);
      expect(screen.queryByText(/New Feature|Section/i)).not.toBeInTheDocument();
    });
  });
});