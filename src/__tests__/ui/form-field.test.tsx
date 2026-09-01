 import "@testing-library/jest-dom/vitest";
 import { render, screen } from "@testing-library/react";
 import { describe, expect, it } from "vitest";

 import { FormField } from "../../components/ui/form-field";

 describe("FormField", () => {
   it("renders label and input linked by matching ids", () => {
     render(<FormField label="Email" name="email" />);
     const input = screen.getByLabelText("Email");
     expect(input).toBeInTheDocument();
     expect(input.tagName).toBe("INPUT");
   });

   it("displays a single error message and marks the field invalid", () => {
     render(<FormField label="Name" error="Required" />);
     expect(screen.getByRole("alert")).toHaveTextContent("Required");
     expect(screen.getByLabelText("Name")).toHaveAttribute("aria-invalid", "true");
   });

   it("joins multiple errors into one accessible message", () => {
     render(<FormField label="Password" error={["Too short", "Needs number"]} />);
     expect(screen.getByRole("alert")).toHaveTextContent("Too short, Needs number");
   });

   it("shows hint only when there is no error", () => {
     const { rerender } = render(
       <FormField label="Username" hint="Use letters only" />,
     );
     expect(screen.getByText("Use letters only")).toBeInTheDocument();

     rerender(<FormField label="Username" hint="Use letters only" error="Taken" />);
     expect(screen.queryByText("Use letters only")).not.toBeInTheDocument();
     expect(screen.getByRole("alert")).toHaveTextContent("Taken");
   });

   it("respects an externally provided id", () => {
     render(<FormField label="Age" id="custom-age" />);
     expect(screen.getByLabelText("Age")).toHaveAttribute("id", "custom-age");
   });
 });
