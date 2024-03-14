import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../sections/Login";

const sampleToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im54aXAiLCJpYXQiOjE3MTA0MDU5MDh9.wwr56dDyFY6FjSjHE7hITFO9apyofXrjKDo_TloDXg8";

describe("Login", () => {
  test("should render the Login component", () => {
    render(<Login setToken={() => {}} />);
    const usernameElement = screen.getByLabelText("Username");
    const passwordElement = screen.getByLabelText("Password");
    const signInButton = screen.getByRole("button", { name: "Sign In" });

    expect(usernameElement).toBeInTheDocument();
    expect(passwordElement).toBeInTheDocument();
    expect(signInButton).toBeInTheDocument();
  });

  test("should display error message when username or password is invalid", async () => {
    render(<Login setToken={() => {}} />);
    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    const signInButton = screen.getByRole("button", { name: "Sign In" });

    fireEvent.change(usernameInput, { target: { value: "invalidUsername" } });
    fireEvent.change(passwordInput, { target: { value: "invalidPassword" } });
    fireEvent.click(signInButton);

    await waitFor(() => {
      const errorMessage = screen.getByText("Invalid username or password");
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test("should call setToken function with the correct token when login is successful", async () => {
    const setTokenMock = jest.fn();
    render(<Login setToken={setTokenMock} />);
    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    const signInButton = screen.getByRole("button", { name: "Sign In" });

    fireEvent.change(usernameInput, { target: { value: "validUsername" } });
    fireEvent.change(passwordInput, { target: { value: "validPassword" } });

    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue({ token: sampleToken }),
    });

    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(setTokenMock).toHaveBeenCalledWith(sampleToken);
    });
  });
});
