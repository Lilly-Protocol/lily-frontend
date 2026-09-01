import { create } from "zustand";

export type SessionStatus = "idle" | "authenticated" | "signed-out";

export interface SessionUser {
  id: string;
  email: string;
  name?: string;
}

export interface SessionState {
  user: SessionUser | null;
  status: SessionStatus;
  signIn: (user: SessionUser) => void;
  signOut: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  user: null,
  status: "idle",
  signIn: (user) => set({ user, status: "authenticated" }),
  signOut: () => set({ user: null, status: "signed-out" }),
}));
