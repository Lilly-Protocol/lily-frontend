// src/mocks/browser.ts
import { setupWorker, rest } from 'msw';
import { environment } from '../environments/environment';

// Define mock handlers for API endpoints
const handlers = [
  rest.get('/api/*', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ message: 'Mocked response', timestamp: Date.now() })
    );
  }),
  rest.post('/api/*', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({ message: 'Created', id: Math.random().toString(36).substr(2, 9) })
    );
  }),
  rest.put('/api/*', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: 'Updated' }));
  }),
  rest.delete('/api/*', (req, res, ctx) => {
    return res(ctx.status(204));
  }),
];

// Create and export worker (browser-only)
export const worker = setupWorker(...handlers);

// Start worker in development/test environments
if (environment.name === 'development' || environment.name === 'test') {
  worker.start({
    serviceWorker: {
      url: environment.mockServiceWorkerUrl || '/mockServiceWorker.js',
    },
  });
}