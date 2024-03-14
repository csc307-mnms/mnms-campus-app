import React, { useState, useRef, useEffect } from "react";
import { DayPilot } from "@daypilot/daypilot-lite-react";
import { DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import { BackendURI } from "../data/data";

const Calendar = ({ selectedScheduleId }) => {
  const [config] = useState({
    viewType: "WorkWeek",
    timeRangeSelectedHandling: "Disabled",
    headerDateFormat: "dddd",
    businessBeginsHour: 7,
    businessEndsHour: 21,
    showNonBusiness: false,
    onEventClick: async (args) => {
      await fetch(`${BackendURI}/buildings/id/${args.e.data.resource}`)
        .then((res) => res.json())
        .then((data) => {
          window.location.href = `/map?building=${data.name}`;
        });
    },
  });
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

        const calendar = calendarRef.current.control;
        const events = [];
        courses.forEach((course) => {
          console.log("course", course);
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
            let firstDayOfWeekString = new DayPilot.Date()
              .firstDayOfWeek()
              .toString();
            let firstDayOfWeek = new DayPilot.Date(
              firstDayOfWeekString.split("T")[0] + "T00:00:00Z",
            );

            let date = firstDayOfWeek.addDays(dayOfWeek);

            const originalStart = new DayPilot.Date(
              `${course.startTime.replace("Z", "")}+08:00`,
            );
            const originalEnd = new DayPilot.Date(
              `${course.endTime.replace("Z", "")}+08:00`,
            );

            const start = date
              .addHours(originalStart.getHours())
              .addMinutes(originalStart.getMinutes());
            const end = date
              .addHours(originalEnd.getHours())
              .addMinutes(originalEnd.getMinutes());

            events.push({
              start: start,
              end: end,
              text: `${course.department} ${course.number}`,
              resource: course.location,
            });
          });
        });
        calendar.events.list = events;
        calendar.update();
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  });

  return (
    <div style={styles.main}>
      <DayPilotCalendar {...config} ref={calendarRef} />
    </div>
  );
};

export default Calendar;
