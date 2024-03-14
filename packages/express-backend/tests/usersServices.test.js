import bcrypt from "bcrypt";
import user from "../src/models/user.js";
import usersServices from "../src/models/usersServices.js";
import { jest } from "@jest/globals";

describe("testing usersServices", () => {
  const findOne = user.findOne;
  const updateOne = user.updateOne;
  const compare = bcrypt.compare;
  const gentSalt = bcrypt.genSalt;
  const hash = bcrypt.hash;
  const findUserByUsername = usersServices.findUserByUsername;
  afterEach(() => {
    user.findOne = findOne;
    user.updateOne = updateOne;
    bcrypt.compare = compare;
    bcrypt.genSalt = gentSalt;
    bcrypt.hash = hash;

    usersServices.findUserByUsername = findUserByUsername;
  });

  describe("testing addUser", () => {
    test("should resolve with user when username does not exist", async () => {
      const userToAdd = {
        username: "john_doe",
        email: "johndoe@gmail.com",
        password: "password123",
      };

      usersServices.findUserByUsername = jest.fn().mockResolvedValue(null);
      user.create = jest.fn().mockResolvedValue(userToAdd);

      const result = await usersServices.addUser(userToAdd);

      expect(result).toEqual(userToAdd);
      expect(usersServices.findUserByUsername).toHaveBeenCalledWith(
        userToAdd.username,
      );
      expect(user.create).toHaveBeenCalledWith(userToAdd);
    });
  });

  describe("testing getUsers", () => {
    test("should resolve with all users", async () => {
      const users = [
        {
          username: "john_doe",
          email: "johndoe@gmail.com",
          password: "hashedpassword123",
        },
        {
          username: "jane_doe",
          email: "janedoe@gmail.com",
          password: "hashedpassword456",
        },
      ];

      user.find = jest.fn().mockResolvedValue(users);

      const result = await usersServices.getUsers();

      expect(result).toEqual(users);
      expect(user.find).toHaveBeenCalled();
    });
  });

  describe("testing deleteUser", () => {
    test("should resolve with deleted user", async () => {
      const id = "1234567890";
      const userToDelete = {
        _id: id,
        username: "john_doe",
        email: "johneo@gmail.com",
        password: "hashedpassword123",
      };

      user.findByIdAndDelete = jest.fn().mockResolvedValue(userToDelete);

      const result = await usersServices.deleteUser(id);

      expect(result).toEqual(userToDelete);
      expect(user.findByIdAndDelete).toHaveBeenCalledWith(id);
    });
  });

  describe("testing findUserById", () => {
    test("should resolve with user when id exists", async () => {
      const id = "1234567890";
      const userData = {
        _id: id,
        username: "john_doe",
        email: "john_doe@gmail.com",
        password: "hashedpassword123",
      };

      user.findById = jest.fn().mockResolvedValue(userData);

      const result = await usersServices.findUserById(id);

      expect(result).toEqual(userData);
      expect(user.findById).toHaveBeenCalledWith(id);
    });
  });

  describe("testing authenticateUser", () => {
    test("should resolve with user when username and password match", async () => {
      const username = "john_doe";
      const password = "password123";
      const userData = { username, password: "hashed_password" };

      bcrypt.compare = jest
        .fn()
        .mockImplementation((pass, hashedPass, callback) => {
          callback(null, true);
        });

      usersServices.findUserByUsername = jest
        .fn()
        .mockResolvedValue(Promise.resolve(userData));

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

  describe("testing findUserByUsername", () => {
    test("should resolve with user when username exists", async () => {
      const username = "john_doe";
      const userData = {
        username,
        email: "johndoe@gmail.com",
        password: "hashedpassword123",
      };

      user.findOne = jest.fn().mockResolvedValue(userData);

      const result = await usersServices.findUserByUsername(username);

      expect(result).toEqual(userData);
      expect(user.findOne).toHaveBeenCalledWith({ username });
    });

    test("should resolve with null when username does not exist", async () => {
      const username = "john_doe";

      user.findOne = jest.fn().mockResolvedValue(null);

      const result = await usersServices.findUserByUsername(username);

      expect(result).toBeNull();
      expect(user.findOne).toHaveBeenCalledWith({ username });
    });

    test("should reject with error when an error occurs", async () => {
      const username = "john_doe";
      const error = new Error("Something went wrong");

      user.findOne = jest.fn().mockRejectedValue(error);

      await expect(usersServices.findUserByUsername(username)).rejects.toThrow(
        error,
      );
      expect(user.findOne).toHaveBeenCalledWith({ username });
    });
  });

  describe("testing updatePass", () => {
    test("should resolve with updated user when username exists", async () => {
      const username = "john_doe";
      const newPassword = "newpassword123";
      const userToUpdate = {
        _id: "1234567890",
        username: "john_doe",
        email: "johndoe@gmail.com",
        password: "hashedpassword123",
      };

      user.findOne = jest.fn().mockResolvedValue(userToUpdate);
      bcrypt.genSalt = jest.fn().mockResolvedValue("newsalt");
      bcrypt.hash = jest.fn().mockResolvedValue("newhashedpassword");
      user.updateOne = jest.fn().mockResolvedValue({});

      const result = await usersServices.updatePass(username, newPassword);
      expect(result).toMatchObject({});
      expect(user.findOne).toHaveBeenCalledWith({ username });
      expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
      expect(bcrypt.hash).toHaveBeenCalledWith(newPassword, "newsalt");
      expect(user.updateOne).toHaveBeenCalledWith(
        { _id: userToUpdate._id },
        {
          $set: {
            password: "newhashedpassword",
            salt: "newsalt",
          },
        },
      );
    });

    test("should resolve with null when username does not exist", async () => {
      const username = "john_doe";
      const newPassword = "newpassword123";

      user.findOne = jest.fn().mockResolvedValue(null);

      const result = await usersServices.updatePass(username, newPassword);

      expect(result).toBeNull();
      expect(user.findOne).toHaveBeenCalledWith({ username });
    });

    test("should reject with error when an error occurs", async () => {
      const username = "john_doe";
      const newPassword = "newpassword123";
      const error = new Error("Something went wrong");

      user.findOne = jest.fn().mockRejectedValue(error);

      await expect(
        usersServices.updatePass(username, newPassword),
      ).rejects.toThrow(error);
      expect(user.findOne).toHaveBeenCalledWith({ username });
    });
  });
});
