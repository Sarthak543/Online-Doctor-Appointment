import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Appointment_Calender from "../Patient Panel/Appointment_Calender";
import { useNavigate } from "react-router-dom";
import { useWebSocket } from "../Chat Panel/WebSocketContext";
import Table from "../Table/Table";

export default function CheckAppointment() {
  const [appointment, setappointment] = useState([]);
  const modalRef = useRef(null);
  const [date, setDate] = useState(new Date());
  const [id, setid] = useState(0);
  const { connect } = useWebSocket();
  let navigate = useNavigate();

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
        let currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        const todaysAppointments = await data.filter((appointment) => {
          const appointmentDate = new Date(appointment.date);
          appointmentDate.setHours(0, 0, 0, 0);
          return appointmentDate.getTime() === currentDate.getTime();
        });
        setappointment(todaysAppointments);
        // setappointment(data);
      } catch (error) {
        // console.clear();
        console.log(error);
      }
    }

    getAppointments();
  }, []);

  function modal(id) {
    modalRef.current.click();
    setid(id);
  }

  async function updateAppointment() {
    try {
      const response = await fetch(
        `http://localhost:8010/updateAppointment/${id}/${date}`,
        {
          method: "get",
        }
      );
      if (response.ok) {
        toast("Appointment Reschuduled");
      } else {
        toast("Internal error");
      }
    } catch (error) {
      // console.clear();
      console.log(error);
    }
  }

  async function Consult(item) {
    await connect();
    navigate("Consult", {
      state: { item, name: item.doctorName, heading: item.patientName },
    });
  }

  function isConsultButtonDisabled(appointment) {
    console.log("\n" + appointment.patientName);
    // Get current time in milliseconds
    const currentTime = new Date().getTime();
    console.log(new Date() + "     " + currentTime);

    // Extract appointment time (hours and minutes)
    const appointmentDate = new Date(appointment.date);
    console.log("\n" + appointmentDate + "   ");
    const appointmentTime = appointmentDate.getTime();
    console.log(appointmentTime);

    // Calculate the end of the two-minute window after the appointment time
    const twoMinutesAfterAppointment = appointmentTime + 2 * 60 * 1000;
    console.log(twoMinutesAfterAppointment);

    // Compare current time with the two-minute window
    return !(
      currentTime >= appointmentTime &&
      currentTime <= twoMinutesAfterAppointment
    );
  }

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
      name: "Action",
      selector: (row) => (
        <>
          <button
            className="btn btn-outline-success badge-pill text-end me-3"
            disabled={isConsultButtonDisabled(row)}
            onClick={() => Consult(row)}
          >
            Consult
          </button>
          <button
            className="btn btn-outline-danger badge-pill text-end w-50 text-center"
            onClick={() => modal(row.appointmentNumber)}
          >
            Reschedule
          </button>
        </>
      ),
    },
  ];

  return (
    <>
      {/* Table that shows appointments */}

      <div className="container-fluid  table-style">
        <h1 className="text-center mb-0 pt-2 table-heading">
          Today's Appointment
        </h1>
        <Table columns={columns} data={appointment} user={"doctor"} />
      </div>

      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        id="Reschudule-modal"
        ref={modalRef}
        style={{ display: "none" }}
      >
        Launch static backdrop modal
      </button>

      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">
                Appointment Reschedule
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body mx-auto">
              <Appointment_Calender Parent_date={setDate} />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-outline-success"
                onClick={updateAppointment}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
