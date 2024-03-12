import course from "./course.js";

const coursesServices = {
  addCourse: async function (body) {
    const existingCourse = await course.findOne({
      name: body.name,
      number: body.number,
      section: body.section,
      department: body.department,
      location: body.location,
      startTime: body.startTime,
      endTime: body.endTime,
      days: body.days,
    });
    if (existingCourse) {
      return existingCourse;
    }
    return course.create(body);
  },
  getCourses: function () {
    return course.find();
  },
  deleteCourse: function (id) {
    return course.findByIdAndDelete(id);
  },
  findCourseById: function (id) {
    return course.findById(id);
  },
  findCourseByNumberSection: function (courseNumber, section) {
    return course.findOne({ number: courseNumber, section: section });
  },
};

export default coursesServices;
