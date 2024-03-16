import mongoose from "mongoose";
import schedule from "../src/models/schedule.js";

describe("testing schedule model", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/testdb", {});
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await schedule.deleteMany();
  });

  test("should create a new schedule", async () => {
    const scheduleData = {
      name: "My Schedule",
      courses: [],
    };

    const createdSchedule = await schedule.create(scheduleData);

    expect(createdSchedule.name).toBe(scheduleData.name);
    expect(createdSchedule.courses).toEqual(scheduleData.courses);
  });

  test("should retrieve a schedule by ID", async () => {
    const scheduleData = {
      name: "My Schedule",
      courses: [],
    };

    const createdSchedule = await schedule.create(scheduleData);

    const retrievedSchedule = await schedule.findById(createdSchedule._id);

    expect(retrievedSchedule.toObject()).toEqual(createdSchedule.toObject());
  });

  test("should update a schedule", async () => {
    const scheduleData = {
      name: "My Schedule",
      courses: [],
    };

    const createdSchedule = await schedule.create(scheduleData);

    const updatedScheduleData = {
      name: "Updated Schedule",
      courses: [new mongoose.Types.ObjectId()],
    };

    await schedule.findByIdAndUpdate(createdSchedule._id, updatedScheduleData);

    const updatedSchedule = await schedule.findById(createdSchedule._id);

    expect(updatedSchedule.name).toBe(updatedScheduleData.name);
    expect(updatedSchedule.courses).toEqual(updatedScheduleData.courses);
  });

  test("should delete a schedule", async () => {
    const scheduleData = {
      name: "My Schedule",
      courses: [],
    };

    const createdSchedule = await schedule.create(scheduleData);

    await schedule.findByIdAndDelete(createdSchedule._id);

    const deletedSchedule = await schedule.findById(createdSchedule._id);

    expect(deletedSchedule).toBeNull();
  });
});
