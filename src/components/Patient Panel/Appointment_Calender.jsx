import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Appointment_Calender({ Parent_date, busyDates }) {
  const [appointments, setAppointments] = useState([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (busyDates) {
      // converting these string dates to date obj for comparision
      const typeCastedBusyDates = busyDates.map((dateStr) => new Date(dateStr));

      setAppointments(typeCastedBusyDates);
    }
  }, [busyDates]);

  const isBooked = (date) => {
    if (appointments === null) {
      return false;
    } else {
      return appointments.some((appointment) => {
        return (
          appointment.getFullYear() === date.getFullYear() &&
          appointment.getMonth() === date.getMonth() &&
          appointment.getDate() === date.getDate()
        );
      });
    }
  };

  const tileClassName = ({ date }) => {
    return isBooked(date) ? "booked" : "available";
  };

  const onChange = (date) => {
    setDate(date);
    Parent_date(date);
  };

  const getFifteenDaysFromToday = () => {
    const todayCopy = new Date();
    return new Date(todayCopy.setDate(todayCopy.getDate() + 15));
  };

  const customDisableDate = (date) => {
    const isBookedDate = isBooked(date.date);
    return isBookedDate;
  };

  return (
    <>
      <div>
        <Calendar
          tileClassName={tileClassName}
          tileDisabled={customDisableDate}
          onChange={onChange}
          value={date}
          minDate={new Date()}
          maxDate={getFifteenDaysFromToday()}
          className={"w-100"}
        />
      </div>
    </>
  );
}
