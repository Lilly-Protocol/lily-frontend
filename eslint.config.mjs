import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

 import reactPlugin from "eslint-plugin-react";

 const eslintConfig = defineConfig([
   ...nextVitals,
   ...nextTs,
   {
     plugins: {
       react: reactPlugin,
     },
     rules: {
       "react/jsx-no-target-blank": [
         "error",
         {
           enforceDynamicLinks: "always",
           warnOnSpreadAttributes: true,
           allowReferrer: false,
           forms: true,
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
