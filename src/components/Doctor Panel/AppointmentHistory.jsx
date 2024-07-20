import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Table from "../Table/Table";

export default function AppointmentHistory() {
  const [appointment, setappointment] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function getAppointments() {
      try {
        let name = sessionStorage.getItem("userName");
        const response = await fetch(
          `http://localhost:8010/DoctorAppointment/${name}`,
          {
            method: "post",
          }
        );
        const data = await response.json();
        setappointment(data);
      } catch (error) {
        console.clear();
        console.log(error);
      }
    }

    getAppointments();
  }, []);

  async function deleteAppointment(id) {
    try {
      const response = await fetch(
        `http://localhost:8010/deletePatient/${id}`,
        {
          method: "get",
        }
      );

      if (response.ok) {
        setappointment(
          appointment.filter((item) => item.appointmentNumber !== id)
        );
        toast("Appointment History Deleted"); // Show toast only if deletion is successful
      } else {
        console.error("Appointment deletion failed"); // Handle potential errors
      }
    } catch (error) {
      console.clear();
      console.log(error);
    }
  }

  const loadChatHistory = (appointmentNumber, patientName, doctorName) => {
    navigate("showChat", {
      state: { appointmentNumber, person: patientName, name: doctorName },
    });
  };

  let columns = [
    {
      name: "S.No",
      cell: (row, index) => index + 1,
      sortable: false,
      width: "100px",
    },
    {
      name: "Name",
      selector: (row) => row.patientName,
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
      name: "History",
      selector: (row) => (
        <>
          <button
            className="btn btn-outline-success badge-pill text-end me-3"
            onClick={() =>
              loadChatHistory(
                row.appointmentNumber,
                row.patientName,
                row.doctorName
              )
            }
          >
            Open
          </button>
          <button
            className="btn btn-outline-danger badge-pill text-end"
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
      <h1 className="text-center mb-0 pt-2 table-heading">
        Consultant History
      </h1>
      <Table columns={columns} data={appointment} user={"doctor"} />
    </div>
  );
}
