 "use client";

 import { useId, type InputHTMLAttributes, type LabelHTMLAttributes } from "react";

 export interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
   label: string;
   error?: string | string[];
   hint?: string;
   labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
 }

 export function FormField({
   label,
   error,
   hint,
   id: externalId,
   className = "",
   labelProps,
   ...inputProps
 }: FormFieldProps) {
   const generatedId = useId();
   const id = externalId ?? generatedId;
   const errorId = `${id}-error`;
   const hintId = `${id}-hint`;

   const errors = Array.isArray(error) ? error : error ? [error] : [];
   const hasError = errors.length > 0;

   return (
     <div className={`flex flex-col gap-1.5 ${className}`}>
       <label htmlFor={id} {...labelProps} className="text-sm font-medium text-slate-700">
         {label}
       </label>
       <input
         id={id}
         aria-invalid={hasError || undefined}
         aria-describedby={
           [hasError ? errorId : null, hint ? hintId : null]
             .filter(Boolean)
             .join(" ") || undefined
         }
         className={[
           "rounded-md border px-3 py-2 text-sm outline-none transition-colors",
           "focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
           hasError
             ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
             : "border-slate-300",
         ].join(" ")}
         {...inputProps}
       />
       {hasError && (
         <p id={errorId} className="text-xs text-red-600" role="alert">
           {errors.join(", ")}
         </p>
       )}
       {hint && !hasError && (
         <p id={hintId} className="text-xs text-slate-500">
           {hint}
         </p>
       )}
     </div>
   );
 }
