import express from "express";
import multer from "multer";
import ical from "ical";

import scheduleServices from "../models/scheduleServices.js";
import coursesServices from "../models/coursesServices.js";
import buildingsServices from "../models/buildingsServices.js";

const router = express.Router();
const upload = multer();

router.post("/upload", upload.single("icsFile"), async (req, res) => {
  try {
    const name = req.body.name;
    console.log("FILE:", req.file);
    const data = ical.parseICS(req.file.buffer.toString());
    const days = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];
    const courseIds = [];

    for (let key in data) {
      if (data[key].type === "VEVENT") {
        let course = {
          name: data[key].description,
          department: data[key].summary.val.split(" ")[0],
          number: data[key].summary.val.split(" ")[1],
          startTime: Date.parse(data[key].start),
          endTime: Date.parse(data[key].end),
          days: data[key].rrule.options.byweekday.map((day) => days[day]),
          location: await buildingsServices.findBuildingByName(
            data[key].location.slice(0, -10),
          ),
        };
        course = await coursesServices.addCourse(course);
        courseIds.push(course._id);
        console.log(course);
      }
    }

    console.log(courseIds);
    const schedule = await scheduleServices.addSchedule({
      name: name,
      courses: courseIds,
    });
    console.log("Schedule created:", schedule);

    res.status(200).json({
      message: "File uploaded and processed successfully.",
      scheduleId: schedule._id, // Sending the created schedule's ID in the response
    });
  } catch (error) {
    console.error("Error parsing ics file:", error);
    res.status(500).json({ error: "Error parsing ics file" });
  }
});

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
