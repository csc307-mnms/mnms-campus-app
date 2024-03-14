import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CreateAccount from "../sections/CreateAccount";
describe("CreateAccount", () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });
  test("should render the CreateAccount component", () => {
    render(<CreateAccount />);
    const createAccountHeading = screen.getByText("Create Account");
    const usernameInput = screen.getByLabelText("Username");
    const emailInput = screen.getByLabelText("Cal Poly Email");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    const signUpButton = screen.getByRole("button", { name: "Sign Up" });

    expect(createAccountHeading).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(signUpButton).toBeInTheDocument();
  });

  test("should display error message when user already exists", async () => {
    render(<CreateAccount />);
    const usernameInput = screen.getByLabelText("Username");
    const emailInput = screen.getByLabelText("Cal Poly Email");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    const signUpButton = screen.getByRole("button", { name: "Sign Up" });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password123" },
    });
    fireEvent.click(signUpButton);

    await waitFor(() => {
      const errorMessage = screen.getByText("User already exists");
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test("should display error message when passwords do not match", async () => {
    render(<CreateAccount />);
    const usernameInput = screen.getByLabelText("Username");
    const emailInput = screen.getByLabelText("Cal Poly Email");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    const signUpButton = screen.getByRole("button", { name: "Sign Up" });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password124" },
    });
    fireEvent.click(signUpButton);

    await waitFor(() => {
      const errorMessage = screen.getByText("Passwords do not match");
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test("should display error when creation errors", async () => {
    render(<CreateAccount />);
    const usernameInput = screen.getByLabelText("Username");
    const emailInput = screen.getByLabelText("Cal Poly Email");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    const signUpButton = screen.getByRole("button", { name: "Sign Up" });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password123" },
    });

    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      status: 500,
    });

    fireEvent.click(signUpButton);

    await waitFor(() => {
      const errorMessage = screen.getByText("Error creating user");
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
