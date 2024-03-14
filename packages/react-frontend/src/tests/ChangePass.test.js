import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ChangePass from "../sections/ChangePass";

const sampleToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im54aXAiLCJpYXQiOjE3MTA0MDU5MDh9.wwr56dDyFY6FjSjHE7hITFO9apyofXrjKDo_TloDXg8";

describe("ChangePass", () => {
  test("should render the ChangePass component", () => {
    render(<ChangePass token={sampleToken} />);
    const changePassElements = screen.getAllByText("Change Password");
    const currentPasswordElement = screen.getByText("Current Password");
    const newPasswordElement = screen.getByText("New Password");
    const confirmPasswordElement = screen.getByText("Confirm Password");
    const backButtonElement = screen.getByText("Back");
    const logoutButtonElement = screen.getByText("Logout");
    const changePasswordButton = screen.getByRole("button", {
      name: "Change Password",
    });

    expect(changePassElements.length).toBe(2);
    expect(currentPasswordElement).toBeInTheDocument();
    expect(newPasswordElement).toBeInTheDocument();
    expect(confirmPasswordElement).toBeInTheDocument();
    expect(backButtonElement).toBeInTheDocument();
    expect(logoutButtonElement).toBeInTheDocument();
    expect(changePasswordButton).toBeInTheDocument();
  });

  test("should display error message when passwords do not match", async () => {
    render(<ChangePass token={sampleToken} />);
    const currentPasswordInput = screen.getByLabelText("Current Password");
    const newPasswordInput = screen.getByLabelText("New Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    const changePasswordButton = screen.getByRole("button", {
      name: "Change Password",
    });

    fireEvent.change(currentPasswordInput, {
      target: { value: "password123" },
    });
    fireEvent.change(newPasswordInput, { target: { value: "newpassword123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "differentpassword" },
    });
    fireEvent.click(changePasswordButton);

    await waitFor(() => {
      const errorMessage = screen.getByText("Passwords do not match");
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test("should display error message when new password is empty", async () => {
    render(<ChangePass token={sampleToken} />);
    const currentPasswordInput = screen.getByLabelText("Current Password");
    const newPasswordInput = screen.getByLabelText("New Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    const changePasswordButton = screen.getByRole("button", {
      name: "Change Password",
    });

    fireEvent.change(currentPasswordInput, {
      target: { value: "password123" },
    });
    fireEvent.change(newPasswordInput, { target: { value: "" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "" } });
    fireEvent.click(changePasswordButton);

    await waitFor(() => {
      const errorMessage = screen.getByText("Missing fields");
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
