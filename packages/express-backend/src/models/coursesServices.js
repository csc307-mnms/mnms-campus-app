import course from "./course.js";

const coursesServices = {
  addCourse: function (body) {
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
