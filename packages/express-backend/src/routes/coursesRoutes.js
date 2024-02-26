import express from "express";
import courseServices from "../models/coursesServices.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const course = req.body;
  const newCourse = await courseServices.addCourse(course);
  res.send(newCourse);
});

router.get("/", async (req, res) => {
  const courses = await courseServices.getCourses();
  res.send(courses);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const course = await courseServices.deleteCourse(id);
  res.send(course);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const course = await courseServices.findCourseById(id);
  res.send(course);
});

router.get("/:number/:section", async (req, res) => {
  const number = req.params.number;
  const section = req.params.section;
  const course = await courseServices.findCourseByNumberSection(
    number,
    section,
  );
  res.send(course);
});

export default router;
