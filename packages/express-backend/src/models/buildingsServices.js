import buildings from "./buildings.js";

function addBuilding(building) {
  return buildings.create(building);
}

function getBuildings() {
  return buildings.find();
}

function deleteBuilding(id) {
  return buildings.findByIdAndDelete(id);
}

function findBuildingById(id) {
  return buildings.findById(id);
}

function findBuildingByName(name) {
  return buildings.findOne({ name: name });
}

function findBuildingByNumber(number) {
  return buildings.findOne({ number: number });
}

export default {
  addBuilding,
  getBuildings,
  deleteBuilding,
  findBuildingById,
  findBuildingByName,
  findBuildingByNumber,
};
