import coursesServices from "./coursesServices.js";
import course from "./course.js";
import { jest } from "@jest/globals";

course.findOne = jest.fn();

describe("findCourseByNumberSection", () => {
  const findOne = course.findOne;
  afterEach(() => {
    course.findOne = findOne;
  });

  test("should resolve with course when course number and section match", async () => {
    jest.useFakeTimers();

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

  test("should reject with error when an error occurs", async () => {
    const courseNumber = "CSC 307";
    const section = "001";
    const error = new Error("Something went wrong");

    course.findOne.mockRejectedValue(error);

    await expect(
      coursesServices.findCourseByNumberSection(courseNumber, section),
    ).rejects.toThrow(error);
    expect(course.findOne).toHaveBeenCalledWith({
      number: courseNumber,
      section: section,
    });
  });
});
