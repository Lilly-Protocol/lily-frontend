import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import RootLoading from "@/app/loading";

describe("RootLoading", () => {
  it("renders loading indicator without layout shift landmarks", () => {
    const { container } = render(<RootLoading />);
    
    // Assert spinner/indicator is present
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    
    // Assert no aside/nav from SectionLayout (ensures it's a pure loading state)
    expect(container.querySelector("aside")).toBeNull();
    expect(container.querySelector("nav")).toBeNull();
  });
});
