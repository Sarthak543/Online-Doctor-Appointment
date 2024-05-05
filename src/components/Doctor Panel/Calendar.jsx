import React from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

export default function Calendar() {
  const handleDayCellDidMount = (arg) => {
    // Create a new date object for comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of the day

    // Reset time to start of the day for comparison
    const cellDate = new Date(arg.date);
    cellDate.setHours(0, 0, 0, 0);

    // Compare dates
    if (cellDate.getTime() === today.getTime()) {
      arg.el.classList.add("bg-danger");
    }
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      dayCellDidMount={handleDayCellDidMount}
    />
  );
}
