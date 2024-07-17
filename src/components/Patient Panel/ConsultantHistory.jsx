import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ConsultantHistory() {
  const [appointment, setappointment] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    async function getAppointments() {
      try {
        const userName = sessionStorage.getItem("userName");
        const response = await fetch(
          `http://localhost:8010/PatientAppointment/${userName}?pageNumber=${pageNumber}`,
          {
            method: "post",
          }
        );

        const data = await response.json();
        console.clear();
        setappointment(data);
      } catch (error) {
        console.clear();
        console.log(error);
      }
    }
    getAppointments();
  }, [pageNumber]);

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

  const loadChatHistory = (appointmentNumber, patientName, doctorName) => {
    navigate("showChat", {
      state: { appointmentNumber, person: patientName, name: doctorName },
    });
  };

  return (
    <>
      <div className="container text-center mt-4 fs-2 fw-bold">
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
                  <th scope="col">Doctor Name</th>
                  <th scope="col">Appointment Date</th>
                  <th scope="col">Mobile</th>
                  <th scope="col text-end">History</th>
                </tr>
              </thead>
              <tbody>
                {appointment.map((item, index) => (
                  <tr>
                    <th scope="row">{index + 1 + (pageNumber - 1) * 7}</th>
                    <td>{item.doctorName}</td>
                    <td>{item.date.substring(0, 10)}</td>
                    <td>{item.doctorNumber}</td>
                    <td className="w-25">
                      <button
                        className="btn btn-outline-success badge-pill text-end me-3 "
                        onClick={() =>
                          loadChatHistory(
                            item.appointmentNumber,
                            item.patientName,
                            item.doctorName
                          )
                        }
                      >
                        Open
                      </button>
                      <button
                        className="btn btn-outline-danger badge-pill text-end "
                        onClick={() =>
                          deleteAppointment(item.appointmentNumber)
                        }
                      >
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
            <button
              className="btn btn-primary m-2"
              onClick={() => {
                setPageNumber(pageNumber - 1);
              }}
              disabled={pageNumber === 1}
            >
              Previous
            </button>
            <button
              className="btn btn-primary m-2"
              onClick={() => {
                setPageNumber(pageNumber + 1);
              }}
              disabled={appointment.length < 7 || appointment.length === 0}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}
