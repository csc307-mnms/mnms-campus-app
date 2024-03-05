import scheduleServices from "./scheduleServices.js";
import schedule from "./schedule.js";
import { jest } from "@jest/globals";

const create = schedule.create;
const find = schedule.find;
const findByIdAndDelete = schedule.findByIdAndDelete;
const findById = schedule.findById;

describe("scheduleServices", () => {
  afterEach(() => {
    schedule.create = create;
    schedule.find = find;
    schedule.findByIdAndDelete = findByIdAndDelete;
    schedule.findById = findById;
  });

  test("addSchedule should call scheduleModel.create with the correct argument", async () => {
    const schedule_data = { name: "Schedule A", time: "9:00 AM" };

    schedule.create = jest.fn();

    await scheduleServices.addSchedule(schedule_data);

    expect(schedule.create).toHaveBeenCalledWith(schedule_data);
  });

  test("getSchedules should call scheduleModel.find", async () => {
    schedule.find = jest.fn();

    await scheduleServices.getSchedules();

    expect(schedule.find).toHaveBeenCalled();
  });

  test("deleteSchedule should call scheduleModel.findByIdAndDelete with the correct argument", async () => {
    const id = "123";

    schedule.findByIdAndDelete = jest.fn();

    await scheduleServices.deleteSchedule(id);

    expect(schedule.findByIdAndDelete).toHaveBeenCalledWith(id);
  });

  test("findScheduleById should call scheduleModel.findById with the correct argument", async () => {
    const id = "123";

    schedule.findById = jest.fn();

    await scheduleServices.findScheduleById(id);

    expect(schedule.findById).toHaveBeenCalledWith(id);
  });
});
