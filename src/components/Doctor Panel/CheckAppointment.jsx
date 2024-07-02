import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import Appointment_Calender from "../Patient Panel/Appointment_Calender";
import { useNavigate } from "react-router-dom";
import { useWebSocket } from "../Chat Panel/WebSocketContext";


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
        let a = "Rakesh Goyal";
        const response = await fetch(
          `http://localhost:8010/DoctorAppointment/${a}`,
          {
            method: "post",
          }
        );
        /*
        due to different time zones i got dates one day less than expected. So i use moment.js to convert that dates to this timezone
        */ 
        const data = await response.json();
        const appointmentsWithAdjustedDates = data.map((appointment) => {
          const adjustedDate = moment(appointment.date).local(); 
          return { ...appointment, date: adjustedDate.format("YYYY-MM-DD") };
        });

        setappointment(appointmentsWithAdjustedDates);
        // setappointment(data);
      } catch (error) {
        console.clear();
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
      console.clear();
      console.log(error);
    }
  }

  async function Consult(item) {
    await connect();
    navigate("Consult",{state:{item,name:item.doctorName,heading:item.patientName}})
  }

  return (
    <>
      <div className="container d-flex justify-content-around align-items-center h-25">
        <div
          className="border rounded-4 h-75 w-25 d-flex"
          style={{ background: "rgb(214 224 210)" }}
        >
          <div className="w-25  d-flex justify-content-end align-items-center">
            <i
              className="fa-solid fa-hospital-user"
              style={{ fontSize: "60px" }}
            ></i>
          </div>
          <div className="w-75 d-flex flex-column justify-content-center">
            <div className="">
              <p className="text-center fw-medium fs-5">Total Patient</p>
              <p className="text-center fw-medium fs-5 mb-0">2000+</p>
              <p className="text-center">Till Today</p>
            </div>
          </div>
        </div>
        <div
          className="border  rounded-4 h-75 w-25 d-flex"
          style={{ background: "rgb(214 224 210)" }}
        >
          <div className="w-25  d-flex justify-content-center align-items-center">
            <i
              className="fa-regular fa-calendar-check"
              style={{ fontSize: "50px" }}
            ></i>
          </div>
          <div className="w-75 d-flex flex-column">
            <div className="mt-5">
              <p className="text-center fw-medium ">
                Today Appointment: {appointment.length}
              </p>
              <p className="text-center fw-medium">
                {new Date().toLocaleDateString()}
              </p>{" "}
              {/* 2/05/2024 */}
            </div>
          </div>
        </div>

        <div
          className="border  rounded-4 h-75 w-25"
          style={{ background: "rgb(214 224 210)" }}
        >
          <p className="text-center fs-5 fw-bold">Tip of the day</p>
          <p className="ms-2">
            Regular exercise has numerous benefits, including stress reduction,
            improved cardiovascular health.
          </p>
        </div>
      </div>
      {/* Table that shows appointments */}
      <div className="container" style={{ width: "65vw" }}>
        <p className="text-center fs-4 fw-bold">Appointments</p>
        <div className="border-top rounded-2">
          {/* appointmnet table */}
          <table className="table table-hover transparent-table">
            <thead>
              <tr className="table-color">
                <th scope="col">SNO.</th>
                <th scope="col">Name</th>
                <th scope="col">Appointment Date</th>
                <th scope="col">Mobile</th>
                <th scope="col text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointment.map((item, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{item.patientName}</td>
                  <td>{item.date.substring(0, 10)}</td>
                  <td>{item.patientNumber}</td>
                  <td className="w-25">
                    <button className="btn btn-outline-success badge-pill text-end me-3" onClick={()=>Consult(item)}>
                      Consult
                    </button>
                    <button
                      className="btn btn-outline-danger badge-pill text-end w-50 text-center"
                      onClick={() => modal(item.appointmentNumber)}
                    >
                      Reschedule
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          className="d-flex justify-content-between"
          style={{ marginBottom: "15vh" }}
        >
          <button className="btn btn-primary m-2">Previous</button>
          <label htmlFor="Reschudule-modal" className="btn btn-primary m-2">
            Next
          </label>
        </div>
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
