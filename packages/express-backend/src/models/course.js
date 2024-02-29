import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  department: {
    type: String,
    required: true,
    trim: true,
  },
  number: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  days: {
    type: [String],
    required: true,
    trim: true,
    enum: ["MO", "TU", "WE", "TH", "FR", "SA", "SU"],
  },
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
