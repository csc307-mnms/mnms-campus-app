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

function findMostRecentLocation() {
  return locations.findOne().sort({ _id: -1 });
}

export default {
  addLocation,
  getLocations,
  deleteLocation,
  findLocationById,
  findMostRecentLocation,
};
