import React, { useState, useRef, useEffect } from "react";
import { DayPilot } from "@daypilot/daypilot-lite-react";
import { DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import { BackendURI } from "../data/data";

const Calendar = ({ selectedScheduleId }) => {
  const [config] = useState({
    viewType: "WorkWeek",
    timeRangeSelectedHandling: "Disabled",
    businessBeginsHour: 7,
    businessEndsHour: 18,
  });
  const [courses, setCourses] = useState([]);

  const styles = {
    main: {
      flexGrow: "1",
    },
  };

  const calendarRef = useRef(null);

  useEffect(() => {
    fetch(`${BackendURI}/schedules/${selectedScheduleId}`)
      .then((response) => response.json())
      .then((data) => {
        const courseIds = data.courses;
        courseIds.forEach((courseId) => {
          fetch(`${BackendURI}/courses/${courseId}`)
            .then((response) => response.json())
            .then((course) => {
              setCourses((prevCourses) => [...prevCourses, course]);
            });
        });
      });
  }, [selectedScheduleId]);
  console.log(courses);

  useEffect(() => {
    const calendar = calendarRef.current.control;
    const config = {
      eventHeight: 50,
      eventBackColor: "#f9f9f9",
      eventBorderColor: "#000",
      eventFontColor: "#000",
      eventHoverColor: "#ddd",
    };
    calendar.events.list = courses.map((course) => ({
      start: new DayPilot.Date(course.startTime),
      end: new DayPilot.Date(course.endTime),
      text: course.name,
    }));
    calendar.update();
  }, [courses]);

  return (
    <div style={styles.main}>
      <DayPilotCalendar {...config} ref={calendarRef} />
    </div>
  );
};

export default Calendar;
