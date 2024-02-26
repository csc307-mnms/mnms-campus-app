import course from "./course.js";

function addCourse(course) {
  return course.create(course);
}

function getCourses() {
  return course.find();
}

function deleteCourse(id) {
  return course.findByIdAndDelete(id);
}

function findCourseById(id) {
  return course.findById(id);
}

function findCourseByNumberSection(courseNumber, section) {
  return course.findOne({ number: courseNumber, section: section });
}

export default {
  addCourse,
  getCourses,
  deleteCourse,
  findCourseById,
  findCourseByNumberSection,
};
