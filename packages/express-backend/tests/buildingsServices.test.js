import buildingServices from "../src/models/buildingsServices.js";
import buildings from "../src/models/buildings.js";
import { jest } from "@jest/globals";

const create = buildings.create;
const find = buildings.find;
const findByIdAndDelete = buildings.findByIdAndDelete;
const findById = buildings.findById;
const findOne = buildings.findOne;

describe("buildingServices", () => {
  afterEach(() => {
    buildings.create = create;
    buildings.find = find;
    buildings.findByIdAndDelete = findByIdAndDelete;
    buildings.findById = findById;
    buildings.findOne = findOne;
  });

  test("addBuilding should call buildings.create with the correct argument", async () => {
    const building = { name: "Building A", number: "123" };

    buildings.create = jest.fn();

    await buildingServices.addBuilding(building);

    expect(buildings.create).toHaveBeenCalledWith(building);
  });

  test("getBuildings should call buildings.find", async () => {
    buildings.find = jest.fn();

    await buildingServices.getBuildings();

    expect(buildings.find).toHaveBeenCalled();
  });

  test("deleteBuilding should call buildings.findByIdAndDelete with the correct argument", async () => {
    const id = "123";

    buildings.findByIdAndDelete = jest.fn();

    await buildingServices.deleteBuilding(id);

    expect(buildings.findByIdAndDelete).toHaveBeenCalledWith(id);
  });

  test("findBuildingById should call buildings.findById with the correct argument", async () => {
    const id = "123";

    buildings.findById = jest.fn();

    await buildingServices.findBuildingById(id);

    expect(buildings.findById).toHaveBeenCalledWith(id);
  });

  test("findBuildingByName should call buildings.findOne with the correct argument", async () => {
    const name = "Building A";

    buildings.findOne = jest.fn();

    await buildingServices.findBuildingByName(name);

    expect(buildings.findOne).toHaveBeenCalledWith({ name: name });
  });

  test("findBuildingByNumber should call buildings.findOne with the correct argument", async () => {
    const number = "123";

    buildings.findOne = jest.fn();

    await buildingServices.findBuildingByNumber(number);

    expect(buildings.findOne).toHaveBeenCalledWith({ number: number });
  });
});
