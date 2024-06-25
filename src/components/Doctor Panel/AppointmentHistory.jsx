import React, { useEffect, useState } from "react";

export default function AppointmentHistory() {
  const [appointment, setappointment] = useState([]);

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
                    <button className="btn btn-outline-success badge-pill text-end me-3">
                      Open
                    </button>
                    <button className="btn btn-outline-danger badge-pill text-end">
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
