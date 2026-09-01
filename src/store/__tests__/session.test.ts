import { describe, it, expect, beforeEach } from "vitest";
import { useSessionStore } from "../session";

describe("session store", () => {
  beforeEach(() => {
    useSessionStore.setState({ user: null, status: "idle" });
  });

  it("has correct initial state", () => {
    const state = useSessionStore.getState();
    expect(state.user).toBeNull();
    expect(state.status).toBe("idle");
  });

  it("signIn sets user and status to authenticated", () => {
    const mockUser = { id: "1", email: "test@example.com", name: "Test" };
    useSessionStore.getState().signIn(mockUser);
    const state = useSessionStore.getState();
    expect(state.user).toEqual(mockUser);
    expect(state.status).toBe("authenticated");
  });

  it("signOut clears user and sets status to signed-out", () => {
    const mockUser = { id: "1", email: "test@example.com" };
    useSessionStore.getState().signIn(mockUser);
    useSessionStore.getState().signOut();
    const state = useSessionStore.getState();
    expect(state.user).toBeNull();
    expect(state.status).toBe("signed-out");
  });
});
