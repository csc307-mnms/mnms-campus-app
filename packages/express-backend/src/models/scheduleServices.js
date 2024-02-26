import utils from "../utils.js";
import scheduleModel from "./schedule.js";

utils.connectToDatabase();

function addSchedule(schedule) {
  return scheduleModel.create(schedule);
}

function getSchedules() {
  return scheduleModel.find();
}

function deleteSchedule(id) {
  return scheduleModel.findByIdAndDelete(id);
}

function findScheduleById(id) {
  return scheduleModel.findById(id);
}

export default {
  addSchedule,
  getSchedules,
  deleteSchedule,
  findScheduleById,
};
