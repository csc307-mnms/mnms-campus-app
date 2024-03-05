import scheduleModel from "./schedule.js";

const scheduleServices = {
  addSchedule(schedule) {
    return scheduleModel.create(schedule);
  },

  getSchedules() {
    return scheduleModel.find();
  },

  deleteSchedule(id) {
    return scheduleModel.findByIdAndDelete(id);
  },

  findScheduleById(id) {
    return scheduleModel.findById(id);
  },
};

export default scheduleServices;
