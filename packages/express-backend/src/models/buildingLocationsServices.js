import utils from "../utils.js";
import locations from "./buildingLocations.js";

utils.connectToDatabase();

function addLocation(location) {
  return locations.create(location);
}

function getLocations() {
  return locations.find();
}

function deleteLocation(id) {
  return locations.findByIdAndDelete(id);
}

function findLocationById(id) {
  return locations.findById(id);
}

function findLocationByName(name) {
  return locations.findOne({ name: name });
}

function findLocationByNumber(number) {
  return locations.findOne({ number: number });
}

export default {
  addLocation,
  getLocations,
  deleteLocation,
  findLocationById,
  findLocationByName,
  findLocationByNumber,
};
