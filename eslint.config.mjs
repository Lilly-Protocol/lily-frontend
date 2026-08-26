import { builtinModules } from "node:module";

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import simpleImportSort from "eslint-plugin-simple-import-sort";

const escapedBuiltinModules = builtinModules
  .filter((moduleName) => !moduleName.startsWith("_"))
  .map((moduleName) =>
    moduleName.replaceAll(/[|\\{}()[\]^$+*?.]/g, "\\$&"),
  );

const importSortGroups = [
  ["^\\u0000"],
  ["^node:", `^(${escapedBuiltinModules.join("|")})(/|$)`],
  ["^@?\\w"],
  ["^@/"],
  ["^\\."],
];

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/exports": "error",
      "simple-import-sort/imports": [
        "error",
        {
          groups: importSortGroups,
        },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "coverage/**",
  ]),
]);

export default eslintConfig;
