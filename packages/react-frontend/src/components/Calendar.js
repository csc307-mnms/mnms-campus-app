import React, { useState, useRef, useEffect } from "react";
import { DayPilot } from "@daypilot/daypilot-lite-react";
import { DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import { BackendURI } from "../data/data";
import moment from "moment-timezone";

const Calendar = ({ selectedScheduleId }) => {
  const [config] = useState({
    viewType: "WorkWeek",
    timeRangeSelectedHandling: "Disabled",
    // headerDateFormat: "dddd",
    businessBeginsHour: 7,
    businessEndsHour: 24,
    recurrentEventsEnabled: true,
  });
  const [courses, setCourses] = useState([]);

  const styles = {
    main: {
      flexGrow: "1",
    },
  };

  const calendarRef = useRef(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const schedule = await (
          await fetch(`${BackendURI}/schedules/${selectedScheduleId}`)
        ).json();
        const courses = await Promise.all(
          schedule.courses.map((courseId) =>
            fetch(`${BackendURI}/courses/${courseId}`).then((res) =>
              res.json(),
            ),
          ),
        );

        console.log(courses);
        setCourses(courses);

        const calendar = calendarRef.current.control;
        const events = [];

        courses.forEach((course) => {
          course.days.forEach((day) => {
            const dayOfWeek = [
              "SU",
              "MO",
              "TU",
              "WE",
              "TH",
              "FR",
              "SA",
            ].indexOf(day);
            let firstDayOfWeek = new DayPilot.Date().firstDayOfWeek();
            console.log("FIRST DAY", firstDayOfWeek);
            let date = firstDayOfWeek.addDays(dayOfWeek);
            console.log("DATE", date);

            const startTime = course.startTime.toString().split("T")[1];
            const endTime = course.endTime.toString().split("T")[1];

            const start = new DayPilot.Date(
              `${date.toString().split("T")[0]}T${startTime}`,
            );
            const end = new DayPilot.Date(
              `${date.toString().split("T")[0]}T${endTime}`,
            );
            console.log(start);
            console.log(end);

            events.push({
              start: start,
              end: end,
              text: course.name,
              recurrent: `FREQ=WEEKLY;COUNT=100;BYDAY=${day}`,
            });
          });
        });
        console.log(events);
        calendar.events.list = events;
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, [selectedScheduleId]);

  return (
    <div style={styles.main}>
      <DayPilotCalendar {...config} ref={calendarRef} />
    </div>
  );
};

export default Calendar;
