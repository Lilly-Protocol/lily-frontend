"use client";

 import { useActionState, useCallback, useState } from "react";

 export type FieldErrors = Record<string, string[]>;

 export interface FormActionState<TData = unknown> {
   fieldErrors: FieldErrors | null;
   formError: string | null;
   data: TData | null;
 }

 export interface UseFormActionResult<TData = unknown> {
   state: FormActionState<TData>;
   pending: boolean;
   reset: () => void;
   submit: (payload?: FormData) => void;
 }

 const INITIAL_STATE: FormActionState<unknown> = {
   fieldErrors: null,
   formError: null,
   data: null,
 };

 /**
  * Thin wrapper around React 19's `useActionState` that normalises the shape
  * returned by server/client actions into `{ fieldErrors, formError, data }`.
  *
  * Works with both server actions and regular async client functions. The
  * action MUST return a `FormActionState`-compatible object on success or
  * failure so the hook can surface structured feedback to the UI.
  */
 export function useFormAction<TData = unknown>(
   action: (
     prevState: FormActionState<TData>,
     payload: FormData,
   ) => Promise<FormActionState<TData>> | FormActionState<TData>,
 ): UseFormActionResult<TData> {
   const [actionState, dispatch, pending] = useActionState<
     FormActionState<TData>,
     FormData
   >(async (prev, payload) => {
     try {
       return await action(prev, payload);
     } catch (err) {
       const message =
         err instanceof Error ? err.message : "Unexpected error occurred.";
       return { ...INITIAL_STATE, formError: message } as FormActionState<TData>;
     }
   }, INITIAL_STATE as FormActionState<TData>);

   const [isReset, setIsReset] = useState(false);

   const submit = useCallback(
     (payload?: FormData) => {
       setIsReset(false);
       dispatch(payload ?? new FormData());
     },
     [dispatch],
   );

   const reset = useCallback(() => {
     setIsReset(true);
   }, []);

   const state = isReset
     ? (INITIAL_STATE as FormActionState<TData>)
     : actionState;

   return {
     state,
     pending: isReset ? false : pending,
     reset,
     submit,
   };
 }
