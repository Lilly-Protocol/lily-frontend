import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { request } from './client';

describe('request', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns parsed JSON on success', async () => {
    const data = { id: 1, name: 'test' };
    (global.fetch as any).mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => data,
    });

    const result = await request<typeof data>('/api/test');
    expect(result).toEqual(data);
    expect(global.fetch).toHaveBeenCalledWith('/api/test', expect.objectContaining({
      headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
    }));
  });

  it('throws ApiError on non-2xx response', async () => {
    (global.fetch as any).mockResolvedValue({
      ok: false,
      status: 404,
      json: async () => ({ message: 'Not found', code: 'NOT_FOUND' }),
    });

    await expect(request('/api/missing')).rejects.toMatchObject({
      message: 'Not found',
      status: 404,
      code: 'NOT_FOUND',
    });
  });

  it('handles 204 No Content', async () => {
    (global.fetch as any).mockResolvedValue({
      ok: true,
      status: 204,
      json: async () => undefined,
    });

    const result = await request('/api/delete');
    expect(result).toBeUndefined();
  });

  it('throws timeout error when request exceeds timeout', async () => {
    // Mock fetch to respect the abort signal so it rejects when aborted
    (global.fetch as any).mockImplementation((_url: string, opts: RequestInit) => {
      return new Promise((_, reject) => {
        if (opts.signal) {
          opts.signal.addEventListener('abort', () => {
            const err = new DOMException('The operation was aborted.', 'AbortError');
            reject(err);
          });
        }
      });
    });

    await expect(request('/api/slow', { timeout: 50 })).rejects.toMatchObject({
      message: expect.stringContaining('timed out'),
      status: 408,
      code: 'TIMEOUT',
    });
  }, 5000);
});
