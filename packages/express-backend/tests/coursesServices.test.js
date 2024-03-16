import coursesServices from "../src/models/coursesServices.js";
import course from "../src/models/course.js";
import { jest } from "@jest/globals";

course.findOne = jest.fn();
course.create = jest.fn();
course.find = jest.fn();
course.findById = jest.fn();
course.findByIdAndDelete = jest.fn();

describe("addCourse", () => {
  const findOne = course.findOne;
  const create = course.create;
  afterEach(() => {
    course.findOne = findOne;
    course.create = create;
  });

  test("should return existing course if it already exists", async () => {
    const existingCourse = { name: "CSC 307", number: "001", section: "001" };
    const body = { name: "CSC 307", number: "001", section: "001" };

    course.findOne.mockResolvedValue(existingCourse);

    const result = await coursesServices.addCourse(body);

    expect(result).toEqual(existingCourse);
    expect(course.findOne).toHaveBeenCalledWith({
      name: body.name,
      number: body.number,
      section: body.section,
      department: body.department,
      location: body.location,
      startTime: body.startTime,
      endTime: body.endTime,
      days: body.days,
    });
    expect(course.create).not.toHaveBeenCalled();
  });

  test("should create a new course if it does not exist", async () => {
    const body = { name: "CSC 307", number: "001", section: "001" };

    course.findOne.mockResolvedValue(null);
    course.create.mockResolvedValue(body);

    const result = await coursesServices.addCourse(body);

    expect(result).toEqual(body);
    expect(course.findOne).toHaveBeenCalledWith({
      name: body.name,
      number: body.number,
      section: body.section,
      department: body.department,
      location: body.location,
      startTime: body.startTime,
      endTime: body.endTime,
      days: body.days,
    });
    expect(course.create).toHaveBeenCalledWith(body);
  });
});

describe("getCourses", () => {
  const find = course.find;
  afterEach(() => {
    course.find = find;
  });

  test("should return all courses", () => {
    const courses = [{ name: "CSC 307", number: "001", section: "001" }];

    course.find.mockResolvedValue(courses);

    const result = coursesServices.getCourses();

    expect(result).resolves.toEqual(courses);
    expect(course.find).toHaveBeenCalled();
  });
});

describe("deleteCourse", () => {
  const findByIdAndDelete = course.findByIdAndDelete;
  afterEach(() => {
    course.findByIdAndDelete = findByIdAndDelete;
  });

  test("should delete the course with the given id", () => {
    const id = "123456789";

    course.findByIdAndDelete.mockResolvedValue();

    const result = coursesServices.deleteCourse(id);

    expect(result).resolves.toBeUndefined();
    expect(course.findByIdAndDelete).toHaveBeenCalledWith(id);
  });
});

describe("findCourseById", () => {
  const findById = course.findById;
  afterEach(() => {
    course.findById = findById;
  });

  test("should find the course with the given id", () => {
    const id = "123456789";
    const courseData = { name: "CSC 307", number: "001", section: "001" };

    course.findById.mockResolvedValue(courseData);

    const result = coursesServices.findCourseById(id);

    expect(result).resolves.toEqual(courseData);
    expect(course.findById).toHaveBeenCalledWith(id);
  });
});

describe("findCourseByNumberSection", () => {
  const findOne = course.findOne;
  afterEach(() => {
    course.findOne = findOne;
  });

  test("should resolve with course when course number and section match", async () => {
    const courseNumber = "CSC 307";
    const section = "001";
    const courseData = { number: courseNumber, section: section };

    course.findOne.mockResolvedValue(courseData);

    const result = await coursesServices.findCourseByNumberSection(
      courseNumber,
      section,
    );

    expect(result).toEqual(courseData);
    expect(course.findOne).toHaveBeenCalledWith({
      number: courseNumber,
      section: section,
    });
  });

  test("should resolve with null when course number and section do not match", async () => {
    const courseNumber = "CSC 307";
    const section = "002";

    course.findOne.mockResolvedValue(null);

    const result = await coursesServices.findCourseByNumberSection(
      courseNumber,
      section,
    );

    expect(result).toBeNull();
    expect(course.findOne).toHaveBeenCalledWith({
      number: courseNumber,
      section: section,
    });
  });
});
