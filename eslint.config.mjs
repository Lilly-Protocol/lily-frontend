import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

 import importPlugin from "eslint-plugin-import";

 const eslintConfig = defineConfig([
   ...nextVitals,
   ...nextTs,
   {
     plugins: {
       import: importPlugin,
     },
     rules: {
       "import/order": [
         "error",
         {
           groups: [
             "builtin",
             "external",
             "internal",
             "parent",
             "sibling",
             "index",
             "object",
             "type",
           ],
           "newlines-between": "always",
           alphabetize: {
             order: "asc",
             caseInsensitive: true,
           },
         },
       ],
     },
   },
   {
     rules: {
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
