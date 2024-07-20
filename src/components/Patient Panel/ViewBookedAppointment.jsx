import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useWebSocket } from "../Chat Panel/WebSocketContext";
import Table from "../Table/Table";

export default function ViewBookedAppointment() {
  const [appointment, setappointment] = useState([]);
  const { connect } = useWebSocket();
  let navigate = useNavigate();

  useEffect(() => {
    async function getAppointments() {
      try {
        const userName = sessionStorage.getItem("userName");
        const response = await fetch(
          `http://localhost:8010/PatientAppointment/${userName}`,
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
        toast("Appointment cancelled"); // Show toast only if deletion is successful
      } else {
        console.error("Appointment deletion failed"); // Handle potential errors
      }
    } catch (error) {
      console.clear();
      console.log(error);
    }
  }

  async function Consult(item) {
    await connect();
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
      selector: (row) => row.date.substring(0, 10),
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
