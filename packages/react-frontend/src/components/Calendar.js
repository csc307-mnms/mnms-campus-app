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
    businessEndsHour: 18,
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

// useEffect(() => {
//   const fetchCourses = async () => {
//     const schedule = await (await fetch(`${BackendURI}/schedules/${selectedScheduleId}`)).json();

//     const courses = await Promise.all(
//       schedule.courses.map(courseId =>
//         fetch(`${BackendURI}/courses/${courseId}`).then(res => res.json())
//       )
//     );
//     console.log(courses);

//     const calendar = calendarRef.current.control;
//     const events = [];

//     courses.forEach((course) => {
//       course.days.forEach((day) => {
//         const dayOfWeek = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"].indexOf(day);

//         // Get the current date and adjust it to the next occurrence of the course day
//         let date = new DayPilot.Date().firstDayOfWeek().addDays(dayOfWeek);
//         if (date < new DayPilot.Date()) {
//           date = date.addDays(7);
//         }

//         // Combine the date with the start and end times of the course
//         const start = new DayPilot.Date(`${date.toString().split('T')[0]}T${course.startTime}:00`);
//         const end = new DayPilot.Date(`${date.toString().split('T')[0]}T${course.endTime}:00`);

//         events.push({
//           start: start,
//           end: end,
//           text: course.name,
//           recurrent: `FREQ=WEEKLY;COUNT=52;BYDAY=${day}`,
//         });
//       });
//     });

//     calendar.events.list = events;
//     calendar.update();
//   };
//   fetchCourses();
// }, [selectedScheduleId]);
