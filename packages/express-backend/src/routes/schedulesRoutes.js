import express from "express";
import scheduleServices from "../models/scheduleServices.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const schedule = req.body;
  const newSchedule = await scheduleServices.addSchedule(schedule);
  res.send(newSchedule);
});

router.get("/", async (req, res) => {
  const schedules = await scheduleServices.getSchedules();
  res.send(schedules);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const schedule = await scheduleServices.deleteSchedule(id);
  res.send(schedule);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const schedule = await scheduleServices.findScheduleById(id);
  res.send(schedule);
});

export default router;
