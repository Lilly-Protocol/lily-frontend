 import { describe, expect, it } from "vitest";
 import { z } from "zod";

 import { validate, formDataToObject } from "../../lib/forms/validation";

 const contactSchema = z.object({
   name: z.string().min(1, "Name is required"),
   email: z.string().email("Invalid email address"),
 });

 describe("validate", () => {
   it("returns success and typed data for valid input", () => {
     const result = validate(contactSchema, {
       name: "Alice",
       email: "alice@example.com",
     });
     expect(result.success).toBe(true);
     expect(result.data).toEqual({
       name: "Alice",
       email: "alice@example.com",
     });
     expect(result.fieldErrors).toBeUndefined();
   });

   it("returns structured field errors for invalid input", () => {
     const result = validate(contactSchema, {
       name: "",
       email: "not-an-email",
     });
     expect(result.success).toBe(false);
     expect(result.data).toBeUndefined();
     expect(result.fieldErrors?.name).toContain("Name is required");
     expect(result.fieldErrors?.email).toContain("Invalid email address");
   });

   it("maps root-level errors to _form key", () => {
     const schema = z.string().min(1, "Required");
     const result = validate(schema, "");
     expect(result.success).toBe(false);
     expect(result.fieldErrors?._form).toContain("Required");
   });
 });

 describe("formDataToObject", () => {
   it("converts FormData entries to a plain object", () => {
     const fd = new FormData();
     fd.append("name", "Bob");
     fd.append("email", "bob@test.com");
     expect(formDataToObject(fd)).toEqual({
       name: "Bob",
       email: "bob@test.com",
     });
   });

   it("ignores non-string values gracefully", () => {
     const fd = new FormData();
     fd.append("file", new Blob(["test"]), "test.txt");
     fd.append("name", "Carol");
     const obj = formDataToObject(fd);
     expect(obj.name).toBe("Carol");
     expect(Object.keys(obj)).toHaveLength(1);
   });
 });
