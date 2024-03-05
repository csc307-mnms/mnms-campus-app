import buildings from "./buildings.js";

const buildingServices = {
  addBuilding: function (building) {
    return buildings.create(building);
  },

  getBuildings: function () {
    return buildings.find();
  },

  deleteBuilding: function (id) {
    return buildings.findByIdAndDelete(id);
  },

  findBuildingById: function (id) {
    return buildings.findById(id);
  },

  findBuildingByName: function (name) {
    return buildings.findOne({ name: name });
  },

  findBuildingByNumber: function (number) {
    return buildings.findOne({ number: number });
  },
};

export default buildingServices;
