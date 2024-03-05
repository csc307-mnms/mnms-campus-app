import bcrypt from "bcrypt";
import usersServices from "./usersServices.js";
import { jest } from "@jest/globals";

usersServices.findUserByUsername = jest.fn();
bcrypt.compare = jest.fn();

describe("authenticateUser", () => {
  test("should resolve with user when username and password match", async () => {
    jest.useFakeTimers();

    const username = "john_doe";
    const password = "password123";
    const userData = { username, password: "hashed_password" };

    bcrypt.compare.mockImplementation((pass, hashedPass, callback) => {
      callback(null, true);
    });

    usersServices.findUserByUsername.mockResolvedValue(
      Promise.resolve(userData),
    );

    const result = await usersServices.authenticateUser(username, password);

    expect(result).toEqual(userData);
    expect(usersServices.findUserByUsername).toHaveBeenCalledWith(username);
    expect(bcrypt.compare).toHaveBeenCalledWith(
      password,
      userData.password,
      expect.any(Function),
    );
  });
});

/* describe("findUserByUsername", () => {
  test("should resolve with user when username exists", async () => {
    const username = "john_doe";
    const userData = { username, email: "johndoe@gmail.com", password: "hashedpassword123" };

    user.findOne.mockResolvedValue(userData);

    const result = userServices.findUserByUsername(username);
    console.log(result)

    expect(result).toEqual(userData);
    expect(user.findOne).toHaveBeenCalledWith({ username });
  });

  test("should resolve with null when username does not exist", async () => {
    const username = "john_doe";

    user.findOne = jest.fn().mockResolvedValue(null);

    const result = userServices.findUserByUsername(username);

    expect(result).toBeNull();
    expect(user.findOne).toHaveBeenCalledWith({ username });
  });

  test("should reject with error when an error occurs", async () => {
    const username = "john_doe";
    const error = new Error("Something went wrong");

    user.findOne = jest.fn().mockRejectedValue(error);

    await expect(userServices.findUserByUsername(username)).rejects.toThrow(error);
    expect(user.findOne).toHaveBeenCalledWith({ username });
  });
}); */
