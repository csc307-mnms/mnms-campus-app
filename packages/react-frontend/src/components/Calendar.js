import React, { useState, useRef } from "react";
import { DayPilotCalendar } from "@daypilot/daypilot-lite-react";

const Calendar = ({ selectedScheduleId }) => {
  const [config] = useState({
    viewType: "WorkWeek",
    timeRangeSelectedHandling: "Disabled",
    businessBeginsHour: 7,
    businessEndsHour: 18,
  });

  const styles = {
    main: {
      flexGrow: "1",
    },
  };

  const calendarRef = useRef(null);

  const courses = [
    {
      id: 1,
      scheduleId: "F2023",
      text: "CSC 357",
      start: "2024-03-04T10:00:00",
      end: "2024-03-04T12:00:00",
      backColor: "#6aa84f",
    },
    {
      id: 2,
      scheduleId: "F2023",
      text: "CSC 357",
      start: "2024-03-06T10:00:00",
      end: "2024-03-06T12:00:00",
      backColor: "#6aa84f",
    },
    {
      id: 3,
      scheduleId: "F2023",
      text: "CSC 357",
      start: "2024-03-08T10:00:00",
      end: "2024-03-08T12:00:00",
      backColor: "#6aa84f",
    },
    {
      id: 4,
      scheduleId: "F2023",
      text: "CSC 307",
      start: "2024-03-05T09:30:00",
      end: "2024-03-05T13:30:00",
      backColor: "#f1c232",
    },
    {
      id: 5,
      scheduleId: "F2023",
      text: "CSC 307",
      start: "2024-03-07T09:30:00",
      end: "2024-03-07T13:30:00",
      backColor: "#f1c232",
    },
    {
      id: 6,
      scheduleId: "F2023",
      text: "MATH 141",
      start: "2024-03-04T13:00:00",
      end: "2024-03-04T15:00:00",
      backColor: "#cc4125",
    },
    {
      id: 7,
      scheduleId: "F2023",
      text: "MATH 141",
      start: "2024-03-06T13:00:00",
      end: "2024-03-06T15:00:00",
      backColor: "#cc4125",
    },
  ];

  config.courses = courses.filter(
    (course) => course.scheduleId === selectedScheduleId,
  );

  return (
    <div style={styles.main}>
      <DayPilotCalendar {...config} ref={calendarRef} />
    </div>
    
  );
};

export default Calendar;
