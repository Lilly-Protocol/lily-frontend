import { readFile } from "node:fs/promises";
import path from "node:path";

import { ESLint } from "eslint";

describe("project ESLint rules", () => {
  // ESLint cold-loads the whole flat config; allow well over the 5s default.
  it("rejects target=_blank links without rel=noopener noreferrer", { timeout: 30_000 }, async () => {
    const fixture = await readFile(
      path.resolve(process.cwd(), "src/test/eslint/unsafe-target-blank.tsx.txt"),
      "utf8",
    );
    const eslint = new ESLint();

    const [result] = await eslint.lintText(fixture, {
      filePath: "src/test/eslint/unsafe-target-blank.tsx",
    });

    expect(result?.messages).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ruleId: "react/jsx-no-target-blank",
          severity: 2,
        }),
      ]),
    );
  });
});
