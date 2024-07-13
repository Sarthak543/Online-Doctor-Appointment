import React, { useEffect, useState } from "react";
import { getUserData } from "../../IndexDB_Operation";

export default function ConsultantHistory() {
  const [appointment, setappointment] = useState([]);
  const [patient, setpatient] = useState({});
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    async function fetchedUserData() {
      const patientEmail = sessionStorage.getItem("user");
      const result = await getUserData(
        patientEmail,
        "OnlineDoctorAppointment",
        "Patient"
      );
      setpatient(result);
    }
    fetchedUserData();
  }, []);

  useEffect(() => {
    async function getAppointments() {
      try {
        const userName = patient.name;
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
  }, [patient, pageNumber]);

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
                      <button className="btn btn-outline-success badge-pill text-end me-3 ">
                        Open
                      </button>
                      <button className="btn btn-outline-danger badge-pill text-end ">
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
