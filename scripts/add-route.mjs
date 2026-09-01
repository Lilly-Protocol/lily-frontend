#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { createInterface } from "readline";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const VALID_SECTIONS = ["marketing", "auth", "legal", "docs", "dashboard"];

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

async function main() {
  console.log("🛣️  Lily Protocol Route Scaffolding Generator\n");

  const id = await ask("Route ID (kebab-case, e.g. 'pricing'): ");
  if (!id || !/^[a-z0-9-]+$/.test(id)) {
    console.error("❌ Invalid ID. Use lowercase kebab-case.");
    process.exit(1);
  }

  const title = await ask("Page Title (e.g. 'Pricing'): ");
  if (!title) {
    console.error("❌ Title is required.");
    process.exit(1);
  }

  const path = await ask("Route Path (e.g. '/pricing' or '/app/settings/billing'): ");
  if (!path || !path.startsWith("/")) {
    console.error("❌ Path must start with /.");
    process.exit(1);
  }

  console.log(`\nAvailable sections: ${VALID_SECTIONS.join(", ")}`);
  const section = await ask("Section key: ");
  if (!VALID_SECTIONS.includes(section)) {
    console.error(`❌ Invalid section. Must be one of: ${VALID_SECTIONS.join(", ")}`);
    process.exit(1);
  }

  const purpose = await ask("Purpose (one-liner description): ");
  const includeInSitemap = (await ask("Include in sitemap? (y/N): ")).toLowerCase() === "y";

  // Generate page file content
  const pageContent = `import { createScaffoldPage, createScaffoldMetadata } from "@/features/scaffold/page-factory";

export default createScaffoldPage("${id}");

export const metadata = createScaffoldMetadata("${id}");
`;

  // Determine file path based on section
  let pageDir;
  switch (section) {
    case "marketing":
      pageDir = `src/app/(marketing)/${id.replace(/^\//, "")}`;
      break;
    case "auth":
      pageDir = `src/app/(auth)/${id.replace(/^\//, "")}`;
      break;
    case "legal":
    case "docs":
      pageDir = `src/app/(support)/${id.replace(/^\//, "")}`;
      break;
    case "dashboard":
      pageDir = `src/app/app/${id.replace(/^\/app\//, "").replace(/^\//, "")}`;
      break;
    default:
      pageDir = `src/app/${id}`;
  }

  const pageFilePath = `${pageDir}/page.tsx`;

  // Registry entry to insert
  const registryEntry = `  {
    id: "${id}",
    title: "${title}",
    path: "${path}",
    section: "${section}",
    purpose: "${purpose || "TODO: Describe the purpose of this route."}",
    figmaScope: "TODO: Define the Figma scope for this route.",
    implementationAreas: [
      "TODO: Define implementation areas",
    ],
    includeInSitemap: ${includeInSitemap},
  },`;

  console.log("\n✅ Generated scaffold configuration:\n");
  console.log("📄 Page file:", pageFilePath);
  console.log("---");
  console.log(pageContent);
  console.log("---\n");

  console.log("📋 Add this entry to src/config/routes.ts (routeScaffolds array):\n");
  console.log(registryEntry);
  console.log("");

  console.log("📝 Update src/types/site.ts StaticSiteRoute union to include:");
  console.log(`  | "${path}"`);
  console.log("");

  console.log("🧪 Update src/config/routes.test.ts route count assertion if needed.");
  console.log("");

  // Optionally write the page file
  const writeFile = (await ask(`Write page file to ${pageFilePath}? (y/N): `)).toLowerCase() === "y";
  if (writeFile) {
    const fullPath = resolve(ROOT, pageFilePath);
    const dir = dirname(fullPath);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    writeFileSync(fullPath, pageContent, "utf-8");
    console.log(`✅ Written: ${fullPath}`);
  }

  rl.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
