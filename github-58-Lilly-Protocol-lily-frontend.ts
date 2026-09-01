// lib/env.ts
import { z } from 'zod';

const EnvSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url().optional(),
  NEXT_PUBLIC_APP_NAME: z.string().min(1).default('Lily Protocol'),
  NEXT_PUBLIC_FEATURE_FLAGS: z.string().optional(),
  NEXT_PUBLIC_ANALYTICS_ID: z.string().optional(),
  NEXT_PUBLIC_SENTRY_DSN: z.string().optional(),
});

type Env = z.infer<typeof EnvSchema>;

let parsedEnv: Env | null = null;

export function getEnv(): Env {
  if (!parsedEnv) {
    const parsed = EnvSchema.safeParse(process.env);
    if (!parsed.success) {
      const errors = parsed.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join('\n  ');
      throw new Error(`Environment validation failed:\n  ${errors}`);
    }
    parsedEnv = parsed.data;
  }
  return parsedEnv;
}

// Example usage in components:
// const { NEXT_PUBLIC_API_URL } = getEnv();