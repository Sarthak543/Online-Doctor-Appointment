import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Table from "../Table/Table";

export default function TotalAppoinntments() {
  const [appointments, setappointments] = useState([], []);
  const [update, setupdate] = useState(false);

  useEffect(() => {
    async function getAppointments() {
      try {
        const response = await fetch(
          "http://localhost:8010/getAllAppointments",
          {
            method: "get",
          }
        );

        const data = await response.json();
        setappointments(data);
      } catch (error) {
        console.clear();
        console.log(error);
      }
    }
    getAppointments();
  }, []);

  async function deleteAppointment(id) {
    try {
      // alert(id);
      const response = await fetch(
        `http://localhost:8010/deletePatient/${id}`,
        {
          method: "get",
        }
      );

      if (response.ok) {
        setappointments(
          appointments.filter((item) => item.appointmentNumber !== id)
        );
        toast("Appointment Deleted"); // Show toast only if deletion is successful
        setupdate(!update);
      } else {
        console.error("Unable to Delete appointment"); // Handle potential errors
      }
    } catch (error) {
      console.clear();
      console.log(error);
    }
  }

  let columns = [
    {
      name: "S.No",
      cell: (row, index) => index + 1,
      sortable: false,
      width: "100px",
    },
    {
      name: "Patient Name",
      selector: (row) => row.patientName,
      sortable: true,
    },
    {
      name: "Doctor Name",
      selector: (row) => row.doctorName,
      sortable: true,
    },
    {
      name: "Patient Mobile",
      selector: (row) => row.patientNumber,
    },
    {
      name: "Doctor Mobile",
      selector: (row) => row.doctorNumber,
    },
    {
      name: "Date",
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
      name: "Action",
      selector: (row) => (
        <>
          <button
            className="btn btn-outline-danger badge-pill text-end "
            onClick={() => deleteAppointment(row.appointmentNumber)}
          >
            Delete
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="container-fluid  table-style">
      <h1 className="text-center mb-0 pt-2 table-heading">All Appointments</h1>
      <Table
        columns={columns}
        data={appointments}
        user={"adminPatient"}
        update={update}
      />
    </div>
  );
}
