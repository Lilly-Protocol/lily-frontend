import { defineConfig, globalIgnores } from "eslint/config";
import pluginTailwindcss from "eslint-plugin-tailwindcss";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import tailwind from "eslint-plugin-tailwindcss";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      tailwindcss: pluginTailwindcss,
    },
    settings: {
      tailwindcss: {
        cssConfigPath: "src/app/globals.css",
      },
    },
    rules: {
      ...pluginTailwindcss.configs.recommended.rules,
      "tailwindcss/no-custom-classname": "off",
    },
  },
  {
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],
      "react/jsx-no-target-blank": ["error", { enforceDynamicLinks: "always" }],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'coverage/**',
  ]),
]);

export default eslintConfig;
