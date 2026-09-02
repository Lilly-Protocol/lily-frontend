import { render, screen } from "@testing-library/react";
import { notFound } from "next/navigation";

import AgentDetailPage from "./page";

vi.mock("next/navigation", () => ({
  notFound: vi.fn(() => {
    throw new Error("NEXT_HTTP_ERROR_FALLBACK;404");
  }),
}));

describe("AgentDetailPage", () => {
  beforeEach(() => {
    vi.mocked(notFound).mockClear();
  });

  it.each([undefined, "not-real"])(
    "calls notFound for an invalid agent id (%s)",
    async (id) => {
      const params = id === undefined ? {} : { id };

      await expect(
        AgentDetailPage({ params: Promise.resolve(params) }),
      ).rejects.toThrow("NEXT_HTTP_ERROR_FALLBACK;404");

      expect(notFound).toHaveBeenCalledOnce();
    },
  );

  it("renders the scaffold for a valid agent id", async () => {
    const id = "123e4567-e89b-12d3-a456-426614174000";

    render(await AgentDetailPage({ params: Promise.resolve({ id }) }));

    expect(notFound).not.toHaveBeenCalled();
    expect(screen.getByText(`/app/agents/${id}`)).toBeInTheDocument();
  });
});
