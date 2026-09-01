import { fetchWithTimeout } from '../client';

// Mock global fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('fetchWithTimeout', () => {
  beforeEach(() => {
    mockFetch.mockReset();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should resolve when fetch completes before timeout', async () => {
    const mockResponse = new Response('ok');
    mockFetch.mockResolvedValue(mockResponse);

    const promise = fetchWithTimeout('https://example.com', { timeout: 1000 });
    
    // Fetch resolves immediately in this mock, so no timer advancement needed
    const result = await promise;
    
    expect(result).toBe(mockResponse);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://example.com',
      expect.objectContaining({ signal: expect.any(AbortSignal) })
    );
  });

  it('should abort when timeout elapses before fetch completes', async () => {
    let capturedSignal: AbortSignal | null = null;
    mockFetch.mockImplementation((_url: string, init?: RequestInit) => {
      capturedSignal = init?.signal as AbortSignal;
      return new Promise(() => {}); // Never resolves
    });

    const promise = fetchWithTimeout('https://example.com', { timeout: 500 });
    
    // Advance timers past the timeout
    jest.advanceTimersByTime(600);
    
    await expect(promise).rejects.toThrow();
    expect(capturedSignal?.aborted).toBe(true);
  });

  it('should compose caller-provided signal with internal timeout', async () => {
    const callerController = new AbortController();
    let capturedSignal: AbortSignal | null = null;
    
    mockFetch.mockImplementation((_url: string, init?: RequestInit) => {
      capturedSignal = init?.signal as AbortSignal;
      return new Promise(() => {});
    });

    const promise = fetchWithTimeout('https://example.com', { 
      timeout: 5000,
      signal: callerController.signal 
    });
    
    // Caller cancels before timeout
    callerController.abort();
    
    await expect(promise).rejects.toThrow();
    expect(capturedSignal?.aborted).toBe(true);
  });

  it('should use default timeout of 10s when not specified', async () => {
    mockFetch.mockImplementation(() => new Promise(() => {}));

    const promise = fetchWithTimeout('https://example.com');
    
    // Should not abort before 10s
    jest.advanceTimersByTime(9999);
    // Still pending
    
    jest.advanceTimersByTime(2);
    
    await expect(promise).rejects.toThrow();
  });
});
