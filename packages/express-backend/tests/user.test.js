import mongoose from "mongoose";
import user from "../src/models/user.js";
import bcrypt from "bcrypt";
import { MongoMemoryServer } from "mongodb-memory-server";
let mongoServer;

describe("testing user model", () => {
  beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getUri();
    await mongoose.connect(mongoUri, {});
  });
  
  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await user.deleteMany();
  });

  test("should create a new user", async () => {
    const userData = {
      username: "john_doe",
      email: "johndoe@gmail.com",
      password: "password123",
    };

    const createdUser = await user.create(userData);

    expect(createdUser.username).toBe(userData.username);
    expect(createdUser.email).toBe(userData.email);
    expect(createdUser.salt).toBeDefined();
    expect(createdUser.schedules).toEqual([]);
    expect(createdUser).toHaveProperty("password");
    expect(createdUser.password).not.toBe(userData.password);
    bcrypt.compare(userData.password, createdUser.password).then((result) => {
      expect(result).toBe(true);
    });
  });

  test("should not create a user with duplicate username", async () => {
    const userData = {
      username: "john_doe",
      email: "johndoe@gmail.com",
      password: "password123",
    };

    await user.create(userData);

    await expect(user.create(userData)).rejects.toThrow();
  });

  test("should not create a user without required fields", async () => {
    const userData = {
      email: "johndoe@gmail.com",
      password: "password123",
    };

    await expect(user.create(userData)).rejects.toThrow();
  });

  test("should add a schedule to a user", async () => {
    const userData = {
      username: "john_doe",
      email: "johndoe@gmail.com",
      password: "password123",
    };

    const createdUser = await user.create(userData);

    const scheduleData = {
      schedule: new mongoose.Types.ObjectId(),
    };

    createdUser.schedules.push(scheduleData);

    await createdUser.save();

    const updatedUser = await user.findById(createdUser._id);

    expect(updatedUser.schedules.length).toBe(1);
    expect(updatedUser.schedules[0].schedule).toEqual(scheduleData.schedule);
  });
});
