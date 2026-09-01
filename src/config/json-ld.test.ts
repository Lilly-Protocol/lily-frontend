import { siteConfig } from "@/config/site";

import { createOrganizationJsonLd, serializeJsonLd } from "./json-ld";

describe("organization JSON-LD", () => {
  it("builds a Schema.org Organization from site config", () => {
    expect(createOrganizationJsonLd()).toEqual({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
    });
  });

  it("serializes JSON-LD safely for an inline script", () => {
    const serialized = serializeJsonLd({ name: "Lily <Protocol>" });

    expect(serialized).toBe('{"name":"Lily \\u003cProtocol>"}');
    expect(JSON.parse(serialized)).toEqual({ name: "Lily <Protocol>" });
  });
});
