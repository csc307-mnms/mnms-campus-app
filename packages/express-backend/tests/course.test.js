import mongoose from "mongoose";
import course from "../src/models/course.js";

describe("testing course model", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/testdb", {});
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await course.deleteMany();
  });

  test("should create a new course", async () => {
    const courseData = {
      name: "Math",
      department: "Mathematics",
      number: "101",
      location: new mongoose.Types.ObjectId(),
      startTime: new Date(),
      endTime: new Date(),
      days: ["MO", "WE", "FR"],
    };

    const createdCourse = await course.create(courseData);

    expect(createdCourse.name).toBe(courseData.name);
    expect(createdCourse.department).toBe(courseData.department);
    expect(createdCourse.number).toBe(courseData.number);
    expect(createdCourse.location).toEqual(courseData.location);
    expect(createdCourse.startTime).toEqual(courseData.startTime);
    expect(createdCourse.endTime).toEqual(courseData.endTime);
    expect(createdCourse.days).toEqual(courseData.days);
  });

  test("should not create a course without required fields", async () => {
    const invalidCourseData = {};

    await expect(course.create(invalidCourseData)).rejects.toThrow();
  });

  test("should not create a course with invalid days", async () => {
    const invalidCourseData = {
      name: "Math",
      department: "Mathematics",
      number: "101",
      location: new mongoose.Types.ObjectId(),
      startTime: new Date(),
      endTime: new Date(),
      days: ["MO", "WE", "INVALID"],
    };

    await expect(course.create(invalidCourseData)).rejects.toThrow();
  });
});
