import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
  ],
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

export default Schedule;
