type PublicEnvInput = {
  NEXT_PUBLIC_SITE_URL?: string | undefined;
  NEXT_PUBLIC_API_BASE_URL?: string | undefined;
};

export interface PublicEnv {
  siteUrl: string;
  apiBaseUrl: string | undefined;
}

function normalizeUrl(
  value: string | undefined,
  key: keyof PublicEnvInput,
  required: boolean,
): string | undefined {
  if (!value) {
    if (required) {
      throw new Error(
        `Missing required environment variable ${key}. Copy .env.example to .env.local and set it.`,
      );
    }
    return undefined;
  }

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`${key} must be an absolute http(s) URL`);
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error(`${key} must use http or https`);
  }

  return value.endsWith("/") ? value.slice(0, -1) : value;
}

export function parsePublicEnv(input: PublicEnvInput): PublicEnv {
  return {
    siteUrl: normalizeUrl(
      input.NEXT_PUBLIC_SITE_URL,
      "NEXT_PUBLIC_SITE_URL",
      true,
    ) as string,
    apiBaseUrl: normalizeUrl(
      input.NEXT_PUBLIC_API_BASE_URL,
      "NEXT_PUBLIC_API_BASE_URL",
      false,
    ),
  };
}
