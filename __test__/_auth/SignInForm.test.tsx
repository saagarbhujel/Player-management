
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import SignInForm from "../../src/_auth/forms/SignInForm";

describe("SignInForm", () => {
  test("renders SignInForm component", () => {
    render(
      <MemoryRouter>
        <SignInForm />
      </MemoryRouter>
    );

    // Check if the form elements are rendered
    expect(screen.getByLabelText("Email :")).toBeInTheDocument();
    expect(screen.getByLabelText("Password :")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
    expect(screen.getByText("SignUp")).toBeInTheDocument();
  });

  test("handles input changes correctly", () => {
    render(
      <MemoryRouter>
        <SignInForm />
      </MemoryRouter>
    );

    // Get email and password inputs
    const emailInput = screen.getByLabelText("Email :") as HTMLInputElement;
    const passwordInput = screen.getByLabelText("Password :") as HTMLInputElement;

    // Simulate user input
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Check if input values are updated
    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  test("disables button when email or password is empty", () => {
    render(
      <MemoryRouter>
        <SignInForm />
      </MemoryRouter>
    );

    // Get email, password, and submit button elements
    const emailInput = screen.getByLabelText("Email :");
    const passwordInput = screen.getByLabelText("Password :");
    const submitButton = screen.getByRole("button", { name: "Login" });

    // Initially, the button should be disabled
    expect(submitButton).toBeDisabled();

    // Simulate user input
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Now, the button should be enabled
    expect(submitButton).not.toBeDisabled();
  });

  // Add more tests as needed
});
