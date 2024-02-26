import locations from "./shuttle.js";

// utils.connectToDatabase();

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

async function findMostRecentLocation() {
  const mostRecentLocation = await locations.findOne().sort({ timestamp: -1 });
  return !mostRecentLocation ? [] : mostRecentLocation;
}

export default {
  addLocation,
  getLocations,
  deleteLocation,
  findLocationById,
  findMostRecentLocation,
};
