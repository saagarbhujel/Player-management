
import { render, screen, fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom";

import { MemoryRouter } from "react-router-dom";
import SignUpForm from "../../src/_auth/forms/SignUpForm";

describe("SignUpForm", () => {
  test("renders SignUpForm component", () => {
    render(
      <MemoryRouter>
        <SignUpForm />
      </MemoryRouter>
    );

    // Check if the form elements are rendered
    expect(screen.getByLabelText("Username :")).toBeInTheDocument();
    expect(screen.getByLabelText("Email :")).toBeInTheDocument();
    expect(screen.getByLabelText("Country :")).toBeInTheDocument();
    expect(screen.getByLabelText("Password :")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "SignUp" })).toBeInTheDocument();
    expect(screen.getByText("Already have an account?")).toBeInTheDocument();
    expect(screen.getByText("SignIn")).toBeInTheDocument();
  });

  test("handles input changes correctly", async () => {
    render(
      <MemoryRouter>
        <SignUpForm />
      </MemoryRouter>
    );

    // Get form inputs
    const usernameInput = screen.getByLabelText("Username :") as HTMLInputElement;
    const emailInput = screen.getByLabelText("Email :") as HTMLInputElement;
    const countrySelect = screen.getByLabelText("Country :") as HTMLSelectElement;
    const passwordInput = screen.getByLabelText("Password :") as HTMLInputElement;

    // Simulate user input
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
     fireEvent.change(countrySelect, { target: { value: 'us' } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Check if input values are updated
    expect(usernameInput.value).toBe("testuser");
    expect(emailInput.value).toBe("test@example.com");
    // Check the selected option's value in the <select> element
    expect(countrySelect.value).toBe("us");
    expect(passwordInput.value).toBe("password123");
  });


  test("disables button when any field is empty", async () => {
    render(
      <MemoryRouter>
        <SignUpForm />
      </MemoryRouter>
    );

    // Get form inputs and button
    const usernameInput = screen.getByLabelText("Username :");
    const emailInput = screen.getByLabelText("Email :");
    const countrySelect = screen.getByLabelText("Country :");
    const passwordInput = screen.getByLabelText("Password :");
    const signUpButton = screen.getByRole("button", { name: "SignUp" });

    // Initially, the button should be disabled
    expect(signUpButton).toBeDisabled();

    // Simulate user input
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(countrySelect, { target: { value: "us" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Now, the button should be enabled
    expect(signUpButton).toBeEnabled();
  });

  // Add more tests as needed
});
