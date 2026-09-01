 import { describe, it, expect } from "vitest";
 import fs from "node:fs";
 import path from "node:path";

 describe("Route Groups Smoke Test", () => {
   const appDir = path.resolve(__dirname, "../");

   const routeGroups = ["(marketing)", "(auth)", "(support)"];

   routeGroups.forEach((group) => {
     it(`should have a layout.tsx inside ${group}`, () => {
       const layoutPath = path.join(appDir, group, "layout.tsx");
       expect(fs.existsSync(layoutPath)).toBe(true);
     });

     it(`should render children in ${group} layout`, () => {
       const layoutPath = path.join(appDir, group, "layout.tsx");
       if (fs.existsSync(layoutPath)) {
         const content = fs.readFileSync(layoutPath, "utf-8");
         expect(content).toContain("children");
       }
     });
   });
 });
