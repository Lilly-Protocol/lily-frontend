import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { PageScaffold } from './page-scaffold';

describe('PageScaffold at 320px viewport', () => {
  const originalInnerWidth = window.innerWidth;

  beforeAll(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 320,
    });
    window.dispatchEvent(new Event('resize'));
  });

  afterAll(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
    window.dispatchEvent(new Event('resize'));
  });

  it('does not produce horizontal overflow with long path', () => {
    const longPath = '/very/long/nested/route/that/would/normally/cause/overflow/at/narrow/viewports';
    const { container } = render(
      <PageScaffold title="Test Page" path={longPath}>
        <div>Content</div>
      </PageScaffold>
    );

    expect(container.scrollWidth).toBeLessThanOrEqual(container.clientWidth);
    expect(screen.getByText(longPath)).toBeInTheDocument();
  });

  it('truncates or wraps the path badge gracefully', () => {
    const longPath = '/another/extremely/long/path/for/testing/truncation/behavior';
    render(
      <PageScaffold title="Narrow Test" path={longPath}>
        <div>Body</div>
      </PageScaffold>
    );

    const badge = screen.getByText(longPath);
    const styles = window.getComputedStyle(badge);
    const hasTruncation =
      styles.textOverflow === 'ellipsis' ||
      styles.overflow === 'hidden' ||
      styles.whiteSpace === 'normal';
    expect(hasTruncation).toBe(true);
  });
});
