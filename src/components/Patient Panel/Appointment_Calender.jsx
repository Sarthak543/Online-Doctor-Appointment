import React, { useState } from 'react'
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

export default function Appointment_Calender() {
    const [appointments, setAppointments] = useState([
        {
          date: new Date(2024, 4, 13), // May 13, 2024 (month index starts at 0)
          time: "10:00 AM",
          patient: "John Doe",
          doctor: "Dr. Smith",
        },
        {
          date: new Date(2024, 4, 15), // May 15, 2024
          time: "2:00 PM",
          patient: "Jane Smith",
          doctor: "Dr. Jones",
        },
      ]);

      const isBooked = (date) => {
        return appointments.some((appointment) => {
          const appointmentDate = new Date(appointment.date); // Create a Date object
          return (
            appointmentDate.getFullYear() === date.getFullYear() &&
            appointmentDate.getMonth() === date.getMonth() &&
            appointmentDate.getDate() === date.getDate()
          );
        });
      };
    
      const tileClassName = ({ date }) => {
        return isBooked(date) ? "booked" : "available";
      };

    const [date,setDate] = useState(new Date());
    const onChange = date =>{
        setDate(date);
    }

      return (
        <>
        <div>
        <Calendar tileClassName={tileClassName} onChange={onChange} value={date}/>
        </div>
        </>
      );
    }
    