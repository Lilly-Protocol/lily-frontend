export interface PublicEnv {
  siteUrl: string;
  apiBaseUrl: string;
}

function normalizeUrl(value: string): string {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

function validateUrl(key: string, value: string): string {
  let parsed: URL;
  try {
    parsed = new URL(value);
  } catch {
    throw new Error(`${key} must be an absolute http(s) URL`);
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new Error(`${key} must use http or https`);
  }

  return normalizeUrl(value);
}

export function parsePublicEnv(
  source: Record<string, string | undefined> = process.env,
): PublicEnv {
  const siteUrlRaw = source.NEXT_PUBLIC_SITE_URL;
  if (!siteUrlRaw) {
    throw new Error(
      "Missing required environment variable NEXT_PUBLIC_SITE_URL. Copy .env.example to .env.local and set it.",
    );
  }

  const apiBaseUrlRaw = source.NEXT_PUBLIC_API_BASE_URL;
  if (!apiBaseUrlRaw) {
    throw new Error(
      "Missing required environment variable NEXT_PUBLIC_API_BASE_URL. Copy .env.example to .env.local and set it.",
    );
  }

  return {
    siteUrl: validateUrl("NEXT_PUBLIC_SITE_URL", siteUrlRaw),
    apiBaseUrl: validateUrl("NEXT_PUBLIC_API_BASE_URL", apiBaseUrlRaw),
  };
}

export const env: PublicEnv = {
  get siteUrl(): string {
    return parsePublicEnv().siteUrl;
  },
  get apiBaseUrl(): string {
    return parsePublicEnv().apiBaseUrl;
  },
};

