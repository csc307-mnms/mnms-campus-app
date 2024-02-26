import express from "express";
import cors from "cors";
import userServices from "./models/usersServices.js";
import scheduleServices from "./models/scheduleServices.js";
import courseServices from "./models/coursesServices.js";
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

/// Users APIs
app.post("/users", async (req, res) => {
  const user = req.body;
  const newUser = await userServices.addUser(user);
  res.send(newUser);
});

app.get("/users", async (req, res) => {
  const users = await userServices.getUsers();
  res.send(users);
});

app.delete("/users/:id", async (req, res) => {
  const id = req.params.id;
  const user = await userServices.deleteUser(id);
  res.send(user);
});

app.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  const user = await userServices.findUserById(id);
  res.send(user);
});

/// Schedules APIs
app.post("/schedules", async (req, res) => {
  const schedule = req.body;
  const newSchedule = await scheduleServices.addSchedule(schedule);
  res.send(newSchedule);
});

app.get("/schedules", async (req, res) => {
  const schedules = await scheduleServices.getSchedules();
  res.send(schedules);
});

app.delete("/schedules/:id", async (req, res) => {
  const id = req.params.id;
  const schedule = await scheduleServices.deleteSchedule(id);
  res.send(schedule);
});

app.get("/schedules/:id", async (req, res) => {
  const id = req.params.id;
  const schedule = await scheduleServices.findScheduleById(id);
  res.send(schedule);
});

/// Course APIs
app.post("/courses", async (req, res) => {
  const course = req.body;
  const newCourse = await courseServices.addCourse(course);
  res.send(newCourse);
});

app.get("/courses", async (req, res) => {
  const courses = await courseServices.getCourses();
  res.send(courses);
});

app.delete("/courses/:id", async (req, res) => {
  const id = req.params.id;
  const course = await courseServices.deleteCourse(id);
  res.send(course);
});

app.get("/courses/:id", async (req, res) => {
  const id = req.params.id;
  const course = await courseServices.findCourseById(id);
  res.send(course);
});

app.get("/courses/:number/:section", async (req, res) => {
  const number = req.params.number;
  const section = req.params.section;
  const course = await courseServices.findCourseByNumberSection(
    number,
    section,
  );
  res.send(course);
});
