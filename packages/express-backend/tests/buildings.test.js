import mongoose from "mongoose";
import buildingSchema from "../src/models/buildings.js";

describe("testing buildingSchema", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/testdb", {});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("should save a building with valid properties", async () => {
    const buildingData = {
      name: "Building A",
      number: "123",
      lat: 37.1234,
      lng: -122.5678,
    };

    const building = new buildingSchema(buildingData);
    const savedBuilding = await building.save();

    expect(savedBuilding._id).toBeDefined();
    expect(savedBuilding.name).toBe(buildingData.name);
    expect(savedBuilding.number).toBe(buildingData.number);
    expect(savedBuilding.lat).toBe(buildingData.lat);
    expect(savedBuilding.lng).toBe(buildingData.lng);
  });

  test("should not save a building without a name", async () => {
    const buildingData = {
      number: "123",
      lat: 37.1234,
      lng: -122.5678,
    };

    const building = new buildingSchema(buildingData);

    await expect(building.save()).rejects.toThrow();
  });

  test("should not save a building without a number", async () => {
    const buildingData = {
      name: "Building A",
      lat: 37.1234,
      lng: -122.5678,
    };

    const building = new buildingSchema(buildingData);

    await expect(building.save()).rejects.toThrow();
  });

  test("should not save a building without latitude", async () => {
    const buildingData = {
      name: "Building A",
      number: "123",
      lng: -122.5678,
    };

    const building = new buildingSchema(buildingData);

    await expect(building.save()).rejects.toThrow();
  });

  test("should not save a building without longitude", async () => {
    const buildingData = {
      name: "Building A",
      number: "123",
      lat: 37.1234,
    };

    const building = new buildingSchema(buildingData);

    await expect(building.save()).rejects.toThrow();
  });
});
