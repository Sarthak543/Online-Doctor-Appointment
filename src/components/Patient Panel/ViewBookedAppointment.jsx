import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Table from "../Table/Table";

export default function ViewBookedAppointment({ loader }) {
  const [appointment, setappointment] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    async function getAppointments() {
      loader(20);
      try {
        const userName = sessionStorage.getItem("userName");
        const response = await fetch(
          `http://localhost:8010/PatientAppointment/${userName}`,
          {
            method: "post",
          }
        );
        loader(40);
        const data = await response.json();
        let currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        const todaysAppointments = await data.filter((appointment) => {
          const appointmentDate = new Date(appointment.date);
          appointmentDate.setHours(0, 0, 0, 0);
          return appointmentDate.getTime() >= currentDate.getTime();
        });
        setappointment(todaysAppointments);
        loader(80);
      } catch (error) {
        console.clear();
        console.log(error);
      }
    }
    loader(10);
    getAppointments();
    loader(100);
  }, []);

  async function deleteAppointment(id) {
    try {
      loader(20);
      const response = await fetch(
        `http://localhost:8010/deletePatient/${id}`,
        {
          method: "get",
        }
      );
      loader(40);
      if (response.ok) {
        setappointment(
          appointment.filter((item) => item.appointmentNumber !== id)
        );
        toast("Appointment cancelled"); // Show toast only if deletion is successful
      } else {
        console.error("Appointment deletion failed"); // Handle potential errors
      }
      loader(70);
    } catch (error) {
      console.clear();
      console.log(error);
    }
    loader(100);
  }

  function Consult(item) {
    navigate("Consult", {
      state: { item, name: item.patientName, heading: item.doctorName },
    });
  }

  function isCancel(appointment) {
    const today = new Date();
    const twoDaysAhead = new Date(today);
    twoDaysAhead.setDate(today.getDate() + 2);
    const appointmentDate = new Date(appointment.date);
    return !(appointmentDate > twoDaysAhead); // Direct date comparison
  }

  let columns = [
    {
      name: "S.No",
      cell: (row, index) => index + 1,
      sortable: false,
      width: "100px",
    },
    {
      name: "Doctor Name",
      selector: (row) => row.doctorName,
      sortable: true,
    },
    {
      name: "Appointment Date",
      selector: (row) => {
        const date = new Date(row.date);

        // Extract date components
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth() + 1; // Months are zero-based
        const day = date.getUTCDate();

        // Extract time components
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";

        // Convert hours from 24-hour to 12-hour format
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'

        // Format minutes to always have two digits
        const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

        // Combine date and time
        return (
          `${year}-${month < 10 ? "0" + month : month}-${
            day < 10 ? "0" + day : day
          } ` + `${hours}:${formattedMinutes} ${ampm}`
        );
      },
      sortable: true,
    },
    {
      name: "Mobile",
      selector: (row) => row.doctorNumber,
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <button
            className="btn btn-outline-success badge-pill text-end me-3 "
            onClick={() => Consult(row)}
          >
            Open
          </button>
          <button
            className="btn btn-outline-danger badge-pill text-end"
            onClick={() => deleteAppointment(row.appointmentNumber)}
            disabled={isCancel(row)}
          >
            Cancel
          </button>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="container-fluid  table-style">
        <h1 className="text-center mb-0 pt-2 table-heading">
          Appointment History
        </h1>
        <Table columns={columns} data={appointment} user={"patient"} />
      </div>
    </>
  );
}
