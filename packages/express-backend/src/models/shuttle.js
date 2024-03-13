import mongoose from "mongoose";

const shuttleLocationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  activeDay: {
    type: Boolean,
    required: true,
  },
  activeNight: {
    type: Boolean,
    required: true,
  },
});

const ShuttleLocation = mongoose.model(
  "ShuttleLocation",
  shuttleLocationSchema,
);

export default ShuttleLocation;
