import locations from "../src/models/shuttle.js";
import shuttleServices from "../src/models/shuttleServices.js";
import { jest } from "@jest/globals";

describe("testing shuttleServices", () => {
  const create = locations.create;
  const find = locations.find;
  const findByIdAndDelete = locations.findByIdAndDelete;
  const findById = locations.findById;
  const findOne = locations.findOne;
  const sort = locations.findOne().sort;

  afterEach(() => {
    locations.create = create;
    locations.find = find;
    locations.findByIdAndDelete = findByIdAndDelete;
    locations.findById = findById;
    locations.findOne = findOne;
    locations.findOne().sort = sort;
  });
  describe("testing addLocation", () => {
    test("should resolve with added location", async () => {
      const locationToAdd = {
        name: "Location 1",
        latitude: 37.7749,
        longitude: -122.4194,
      };

      locations.create = jest.fn().mockResolvedValue(locationToAdd);

      const result = await shuttleServices.addLocation(locationToAdd);

      expect(result).toEqual(locationToAdd);
      expect(locations.create).toHaveBeenCalledWith(locationToAdd);
    });
  });

  describe("testing getLocations", () => {
    test("should resolve with all locations", async () => {
      const locationsData = [
        {
          name: "Location 1",
          latitude: 37.7749,
          longitude: -122.4194,
        },
        {
          name: "Location 2",
          latitude: 37.7749,
          longitude: -122.4194,
        },
      ];

      locations.find = jest.fn().mockResolvedValue(locationsData);

      const result = await shuttleServices.getLocations();

      expect(result).toEqual(locationsData);
      expect(locations.find).toHaveBeenCalled();
    });
  });

  describe("testing deleteLocation", () => {
    test("should resolve with deleted location", async () => {
      const id = "1234567890";
      const locationToDelete = {
        _id: id,
        name: "Location 1",
        latitude: 37.7749,
        longitude: -122.4194,
      };

      locations.findByIdAndDelete = jest
        .fn()
        .mockResolvedValue(locationToDelete);

      const result = await shuttleServices.deleteLocation(id);

      expect(result).toEqual(locationToDelete);
      expect(locations.findByIdAndDelete).toHaveBeenCalledWith(id);
    });
  });

  describe("testing findLocationById", () => {
    test("should resolve with location when id exists", async () => {
      const id = "1234567890";
      const locationData = {
        _id: id,
        name: "Location 1",
        latitude: 37.7749,
        longitude: -122.4194,
      };

      locations.findById = jest.fn().mockResolvedValue(locationData);

      const result = await shuttleServices.findLocationById(id);

      expect(result).toEqual(locationData);
      expect(locations.findById).toHaveBeenCalledWith(id);
    });
  });
});
