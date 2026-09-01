 import { z, type ZodSchema, type ZodError } from "zod";

 export type FieldErrors = Record<string, string[]>;

 export interface ValidationResult<T> {
   success: boolean;
   data?: T;
   fieldErrors?: FieldErrors;
 }

 /**
  * Validates untrusted input against a Zod schema and normalises the result
  * into a shape compatible with `useFormAction` and server actions.
  */
 export function validate<T>(
   schema: ZodSchema<T>,
   input: unknown,
 ): ValidationResult<T> {
   const result = schema.safeParse(input);
   if (result.success) {
     return { success: true, data: result.data };
   }

   const fieldErrors: FieldErrors = {};
   for (const issue of result.error.issues) {
     const path = issue.path.map(String).join(".") || "_form";
     if (!fieldErrors[path]) {
       fieldErrors[path] = [];
     }
     fieldErrors[path].push(issue.message);
   }

   return { success: false, fieldErrors };
 }

 /**
  * Convenience helper to parse FormData into a plain object suitable for
  * Zod validation. Handles single-value fields only; multi-value fields
  * should be handled by the caller.
  */
 export function formDataToObject(formData: FormData): Record<string, string> {
   const obj: Record<string, string> = {};
   formData.forEach((value, key) => {
     if (typeof value === "string") {
       obj[key] = value;
     }
   });
   return obj;
 }
