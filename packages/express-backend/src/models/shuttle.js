import mongoose from "mongoose";

const shuttleLocationSchema = new mongoose.Schema({
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

const ShuttleLocation = mongoose.model(
  "ShuttleLocation",
  shuttleLocationSchema,
);

export default ShuttleLocation;
