import mongoose from "mongoose";
import shuttleLocationSchema from "../src/models/shuttle.js";

describe("testing shuttleLocationSchema", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/testdb", {});
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  test("should save a shuttle location", async () => {
    const shuttleLocationData = {
      name: "Shuttle 1",
      latitude: 37.7749,
      longitude: -122.4194,
      activeDay: true,
      activeNight: false,
    };

    const shuttleLocation = new shuttleLocationSchema(shuttleLocationData);
    const savedShuttleLocation = await shuttleLocation.save();

    expect(savedShuttleLocation._id).toBeDefined();
    expect(savedShuttleLocation.name).toBe(shuttleLocationData.name);
    expect(savedShuttleLocation.latitude).toBe(shuttleLocationData.latitude);
    expect(savedShuttleLocation.longitude).toBe(shuttleLocationData.longitude);
    expect(savedShuttleLocation.activeDay).toBe(shuttleLocationData.activeDay);
    expect(savedShuttleLocation.activeNight).toBe(
      shuttleLocationData.activeNight,
    );
  });

  test("should require name field", async () => {
    const shuttleLocationData = {
      latitude: 37.7749,
      longitude: -122.4194,
      activeDay: true,
      activeNight: false,
    };

    const shuttleLocation = new shuttleLocationSchema(shuttleLocationData);

    let error = null;
    try {
      await shuttleLocation.validate();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors.name).toBeDefined();
  });

  // Add more tests for other fields and validation rules
});
