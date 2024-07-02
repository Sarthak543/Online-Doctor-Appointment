import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AppointmentHistory() {
  const [appointment, setappointment] = useState([]);
  const navigate = useNavigate();
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

        const data = await response.json();
        console.clear();
        console.log("asdfghjkl;'asdfghjkl;'       ", data);
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
      const response = await fetch(`http://localhost:8010/deletePatient/${id}`, {
        method: "get",
      });

      if (response.ok) {
        setappointment(appointment.filter((item) => item.appointmentNumber !== id));
        toast("Appointment cancelled"); // Show toast only if deletion is successful
      } else {
        console.error("Appointment deletion failed"); // Handle potential errors
      }
    } catch (error) {
      console.clear();
      console.log(error);
    }
  }

  const loadChatHistory = (appointmentNumber,patientName,doctorName)=>{
    navigate("showChat",{state:{appointmentNumber,person:patientName,name:doctorName}})
  }
  

  return (
    <>
      <div className="container text-center fs-2 fw-bold">
        Consultant History
      </div>
      {appointment.length > 0 && ( // Check if appointments exist
      <div className="container w-75">
        <div className="border-top rounded-2 mt-5">
          {/* Consultant table */}
          <table className="table table-hover transparent-table">
            <thead>
              <tr className="table-color">
                <th scope="col">SNo.</th>
                <th scope="col">Name</th>
                <th scope="col">Appointment Date</th>
                <th scope="col">Mobile</th>
                <th scope="col text-end">History</th>
              </tr>
            </thead>
            <tbody>
              {appointment.map((item, index) => (
                <tr>
                  <th scope="row">{index+1}</th>
                  <td>{item.patientName}</td>
                  <td>{item.date.substring(0,10)}</td>
                  <td>{item.patientNumber}</td>
                  <td className="w-25">
                    <button className="btn btn-outline-success badge-pill text-end me-3" onClick={()=>loadChatHistory(item.appointmentNumber,item.patientName,item.doctorName)}>
                      Open
                    </button>
                    <button className="btn btn-outline-danger badge-pill text-end" onClick={()=>deleteAppointment(item.appointmentNumber)}>
                      Delete
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
          <button className="btn btn-primary m-2">Next</button>
        </div>
      </div>
      )}
    </>
  );
}
