import locations from "./shuttle.js";

const shuttleServices = {
  addLocation(location) {
    return locations.create(location);
  },
  getLocations() {
    return locations.find();
  },
  deleteLocation(id) {
    return locations.findByIdAndDelete(id);
  },
  findLocationById(id) {
    return locations.findById(id);
  },
  async findMostRecentLocation() {
    const mostRecentLocation = await locations
      .findOne()
      .sort({ timestamp: -1 });
    return !mostRecentLocation ? [] : mostRecentLocation;
  },
};

export default shuttleServices;
