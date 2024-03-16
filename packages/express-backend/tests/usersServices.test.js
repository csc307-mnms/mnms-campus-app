import bcrypt from "bcrypt";
import user from "../src/models/user.js";
import schedule from "../src/models/schedule.js";
import usersServices from "../src/models/usersServices.js";
import { jest } from "@jest/globals";
import scheduleServices from "../src/models/scheduleServices.js";

describe("testing usersServices", () => {
  const findOne = user.findOne;
  const updateOne = user.updateOne;
  const compare = bcrypt.compare;
  const genSalt = bcrypt.genSalt;
  const hash = bcrypt.hash;
  const findUserByUsername = usersServices.findUserByUsername;
  const updatePass = usersServices.updatePass;
  const scheduleFindById = schedule.findById;
  afterEach(() => {
    user.findOne = findOne;
    user.updateOne = updateOne;
    bcrypt.compare = compare;
    bcrypt.genSalt = genSalt;
    bcrypt.hash = hash;
    usersServices.findUserByUsername = findUserByUsername;
    usersServices.updatePass = updatePass;
    schedule.findById = scheduleFindById;
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

    test("should resolve with null when username already exists", async () => {
      const userToAdd = {
        username: "john_doe",
        email: "johndoe@gmail.com",
        password: "password123",
      };

      usersServices.findUserByUsername = jest.fn().mockResolvedValue(userToAdd);

      const result = await usersServices.addUser(userToAdd);

      expect(result).toBeNull();
      expect(usersServices.findUserByUsername).toHaveBeenCalledWith(
        userToAdd.username,
      );
    });

    test("should reject with error when an error occurs", async () => {
      const userToAdd = {
        username: "john_doe",
        email: "johndoe@gmail.com",
        password: "password123",
      };
      const error = new Error("Something went wrong");

      usersServices.findUserByUsername = jest.fn().mockRejectedValue(error);

      await expect(usersServices.addUser(userToAdd)).rejects.toThrow(error);
      expect(usersServices.findUserByUsername).toHaveBeenCalledWith(
        userToAdd.username,
      );
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

    test("should reject with error when an error occurs", async () => {
      const error = new Error("Something went wrong");

      user.find = jest.fn().mockRejectedValue(error);

      await expect(usersServices.getUsers()).rejects.toThrow(error);
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

    test("should reject with error when an error occurs", async () => {
      const id = "1234567890";
      const error = new Error("Something went wrong");

      user.findByIdAndDelete = jest.fn().mockRejectedValue(error);

      await expect(usersServices.deleteUser(id)).rejects.toThrow(error);
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

    test("should resolve with null when id does not exist", async () => {
      const id = "1234567890";

      user.findById = jest.fn().mockResolvedValue(null);

      const result = await usersServices.findUserById(id);

      expect(result).toBeNull();
      expect(user.findById).toHaveBeenCalledWith(id);
    });

    test("should reject with error when an error occurs", async () => {
      const id = "1234567890";
      const error = new Error("Something went wrong");

      user.findById = jest.fn().mockRejectedValue(error);

      await expect(usersServices.findUserById(id)).rejects.toThrow(error);
      expect(user.findById).toHaveBeenCalledWith(id);
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
          password: "newhashedpassword",
          salt: "newsalt",
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

    test("should resolve with null when username does not exist", async () => {
      const username = "john_doe";
      const password = "password123";

      usersServices.findUserByUsername = jest.fn().mockResolvedValue(null);

      const result = await usersServices.authenticateUser(username, password);

      expect(result).toBeNull();
      expect(usersServices.findUserByUsername).toHaveBeenCalledWith(username);
    });

    test("should resolve with null when password does not match", async () => {
      const username = "john_doe";
      const password = "password123";
      const userData = { username, password: "hashed_password" };

      bcrypt.compare = jest
        .fn()
        .mockImplementation((pass, hashedPass, callback) => {
          callback(null, false);
        });

      usersServices.findUserByUsername = jest
        .fn()
        .mockResolvedValue(Promise.resolve(userData));

      const result = await usersServices.authenticateUser(username, password);

      expect(result).toBeNull();
      expect(usersServices.findUserByUsername).toHaveBeenCalledWith(username);
      expect(bcrypt.compare).toHaveBeenCalledWith(
        password,
        userData.password,
        expect.any(Function),
      );
    });

    test("should reject with error when an error occurs", async () => {
      const username = "john_doe";
      const password = "password123";
      const error = new Error("Something went wrong");

      usersServices.findUserByUsername = jest.fn().mockRejectedValue(error);

      await expect(
        usersServices.authenticateUser(username, password),
      ).rejects.toThrow(error);
      expect(usersServices.findUserByUsername).toHaveBeenCalledWith(username);
    });
  });

  describe("testing findUserByEmail", () => {
    test("should resolve with user when email exists", async () => {
      const email = "john_doe@lol.com";
      const userData = {
        username: "john_doe",
        email,
        password: "hashedpassword123",
      };

      user.findOne = jest.fn().mockResolvedValue(userData);

      const result = await usersServices.findUserByEmail(email);

      expect(result).toEqual(userData);
      expect(user.findOne).toHaveBeenCalledWith({ email });
    });

    test("should resolve with null when email does not exist", async () => {
      const email = "weee@gmail.com";

      user.findOne = jest.fn().mockResolvedValue(null);

      const result = await usersServices.findUserByEmail(email);

      expect(result).toBeNull();
      expect(user.findOne).toHaveBeenCalledWith({ email });
    });
  });

  describe("testing uploadSchedule", () => {
    test("should resolve with updated user when username and scheduleId exist", async () => {
      const username = "john_doe";
      const scheduleId = "1234567890";
      const userToUpdate = {
        _id: "1234567890",
        username,
        email: "john_doe@hehe.com",
        password: "hashedpassword123",
        schedules: [],
      };

      usersServices.findUserByUsername = jest
        .fn()
        .mockResolvedValue(userToUpdate);
      scheduleServices.findScheduleById = jest.fn().mockResolvedValue({});
      user.updateOne = jest.fn().mockResolvedValue({});

      const result = await usersServices.uploadSchedule(username, scheduleId);

      expect(result).toMatchObject({});
      expect(usersServices.findUserByUsername).toHaveBeenCalledWith(username);
    });

    test("should resolve with null when schedule does not exist", async () => {
      const username = "john_doe";
      const scheduleId = "1234567890";

      scheduleServices.findScheduleById = jest.fn().mockResolvedValue(null);

      const result = await usersServices.uploadSchedule(username, scheduleId);

      expect(result).toBeNull();
      expect(scheduleServices.findScheduleById).toHaveBeenCalledWith(
        scheduleId,
      );
    });

    test("should resolve null when user does not exist", async () => {
      const username = "john_doe";
      const scheduleId = "1234567890";

      usersServices.findUserByUsername = jest.fn().mockResolvedValue(null);
      scheduleServices.findScheduleById = jest.fn().mockResolvedValue({});

      const result = await usersServices.uploadSchedule(username, scheduleId);

      expect(result).toBeNull();
      expect(usersServices.findUserByUsername).toHaveBeenCalledWith(username);
    });

    test("should reject with error when an error occurs", async () => {
      const username = "john_doe";
      const scheduleId = "1234567890";
      const error = new Error("Something went wrong");

      usersServices.findUserByUsername = jest.fn().mockRejectedValue(error);

      await expect(
        usersServices.uploadSchedule(username, scheduleId),
      ).rejects.toThrow(error);
      expect(usersServices.findUserByUsername).toHaveBeenCalledWith(username);
    });
  });

  describe("testing addScheduleToUser", () => {
    test("should resolve with updated user when username exists", async () => {
      const username = "john_doe";
      const schedule = {
        _id: "1234567890",
        name: "Schedule A",
        time: "9:00 AM",
      };
      const userToUpdate = {
        _id: "1234567890",
        username,
        email: "asdfasdf",
      };

      usersServices.findUserByUsername = jest
        .fn()
        .mockResolvedValue(userToUpdate);
      user.updateOne = jest.fn().mockResolvedValue({});
      const result = await usersServices.addScheduleToUser(username, schedule);
      expect(result).toMatchObject({});
      expect(usersServices.findUserByUsername).toHaveBeenCalledWith(username);
    });

    test("should resolve with null when username does not exist", async () => {
      const username = "john_doe";
      const schedule = {
        _id: "1234567890",
        name: "Schedule A",
        time: "9:00 AM",
      };

      usersServices.findUserByUsername = jest.fn().mockResolvedValue(null);

      const result = await usersServices.addScheduleToUser(username, schedule);

      expect(result).toBeNull();
      expect(usersServices.findUserByUsername).toHaveBeenCalledWith(username);
    });
  });

  describe("testing changePass", () => {
    test("should resolve with updated user when username and password match", async () => {
      const username = "john_doe";
      const password = "password123";
      const newpass = "newpassword123";
      const userToUpdate = {
        _id: "1234567890",
        username,
        email: "asdfasdf",
      };

      usersServices.authenticateUser = jest
        .fn()
        .mockResolvedValue(userToUpdate);
      usersServices.updatePass = jest.fn().mockResolvedValue({});
      const result = await usersServices.changePass(
        username,
        password,
        newpass,
      );
      expect(result).toMatchObject({});
      expect(usersServices.authenticateUser).toHaveBeenCalledWith(
        username,
        password,
      );
      expect(usersServices.updatePass).toHaveBeenCalledWith(username, newpass);
    });

    test("should resolve with null when username does not exist", async () => {
      const username = "john_doe";
      const password = "password123";
      const newpass = "newpassword123";

      usersServices.authenticateUser = jest.fn().mockResolvedValue(null);

      const result = await usersServices.changePass(
        username,
        password,
        newpass,
      );

      expect(result).toBeNull();
      expect(usersServices.authenticateUser).toHaveBeenCalledWith(
        username,
        password,
      );
    });

    test("should error with error when an error occurs", async () => {
      const username = "john_doe";
      const password = "password123";
      const newpass = "newpassword123";
      const error = new Error("Something went wrong");

      usersServices.authenticateUser = jest.fn().mockRejectedValue(error);

      await expect(
        usersServices.changePass(username, password, newpass),
      ).rejects.toThrow(error);
      expect(usersServices.authenticateUser).toHaveBeenCalledWith(
        username,
        password,
      );
    });

    test("should resolve with null when updatePass returns null", async () => {
      const username = "john_doe";
      const password = "password123";
      const newpass = "newpassword123";

      usersServices.authenticateUser = jest.fn().mockResolvedValue({});
      usersServices.updatePass = jest.fn().mockResolvedValue(null);

      const result = await usersServices.changePass(
        username,
        password,
        newpass,
      );

      expect(result).toBeNull();
      expect(usersServices.authenticateUser).toHaveBeenCalledWith(
        username,
        password,
      );
      expect(usersServices.updatePass).toHaveBeenCalledWith(username, newpass);
    });

    test("should error when updatePass returns error", async () => {
      const username = "john_doe";
      const password = "password123";
      const newpass = "newpassword123";
      const error = new Error("Something went wrong");

      usersServices.authenticateUser = jest.fn().mockResolvedValue({});
      usersServices.updatePass = jest.fn().mockRejectedValue(error);

      await expect(
        usersServices.changePass(username, password, newpass),
      ).rejects.toThrow(error);
      expect(usersServices.authenticateUser).toHaveBeenCalledWith(
        username,
        password,
      );
      expect(usersServices.updatePass).toHaveBeenCalledWith(username, newpass);
    });
  });
});
