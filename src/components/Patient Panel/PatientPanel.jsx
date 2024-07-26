import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import documentContext from "../../context/Document_State/DocumentContext";

export default function PatientPanel() {
  const [patient, setpatient] = useState({});
  const [activeItem, setActiveItem] = useState("");
  const { setisUserLogIn } = useContext(documentContext);

  useEffect(() => {
    async function fetchedUserData() {
      const patientEmail = sessionStorage.getItem("Email");
      const response = await fetch(
        `http://localhost:8010/PatientDetail?email=${patientEmail}`,
        { method: "post" }
      );
      console.log(response);
      const data = await response.json();
      setpatient(data);
      setisUserLogIn(true); // imp
    }
    fetchedUserData();
  }, []);

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <>
      <div className="d-flex" style={{ height: "100vh" }}>
        <div className="w-25 border-end border-1">
          <div>
            {/* div for img  */}
            <div className="d-flex justify-content-center pt-4 pb-2">
              <img
                className="border border-dark rounded-circle"
                id="dp"
                style={{ width: "30%", height: "20vh" }}
                src={`data:image/jpeg;base64,${patient.image}`}
                alt="Description"
              />
            </div>
            <p className="text-center fw-bold font-style fs-5">
              {sessionStorage.getItem("userName")}
            </p>
          </div>

          {/* Options  */}
          <div className="mt-3" style={{ height: "8vh" }}>
            {/*  */}
            <Link
              to={"/PatientPanel/bookAppointment"}
              className="text-reset text-decoration-none"
              onClick={() => handleItemClick("bookAppointment")}
            >
              <div
                className={`d-flex align-items-center side-menu-item ${
                  activeItem === "bookAppointment" ? "active" : ""
                }`}
              >
                <i className="fa-solid fa-receipt me-2"></i>
                <p className="font-style mt-3 ">Book Appointments</p>
              </div>
            </Link>
          </div>
          {/*  */}
          <Link
            to={"/PatientPanel/ConsultantHistory"}
            className="text-reset text-decoration-none"
            onClick={() => handleItemClick("Consultant History")}
          >
            <div style={{ height: "8vh" }}>
              <div
                className={`d-flex align-items-center side-menu-item ${
                  activeItem === "Consultant History" ? "active" : ""
                }`}
              >
                <i className="fa-solid fa-clock-rotate-left me-2"></i>
                <p className="font-style mt-3">Consultant History</p>
              </div>
            </div>
          </Link>
          {/*  */}
          {/*  */}
          <Link
            to={"/PatientPanel/viewBookedAppointment"}
            className="text-reset text-decoration-none"
            onClick={() => handleItemClick("View Booked Appointment")}
          >
            <div style={{ height: "8vh" }}>
              <div
                className={`d-flex align-items-center side-menu-item ${
                  activeItem === "View Booked Appointment" ? "active" : ""
                }`}
              >
                <i className="fa-solid fa-eye me-2"></i>
                <p className="font-style mt-3">View Booked Appointment</p>
              </div>
            </div>
          </Link>
          <Link
            to={"/PatientPanel/feedback"}
            className="text-reset text-decoration-none"
            onClick={() => handleItemClick("Feedback")}
          >
            <div style={{ height: "8vh" }}>
              <div
                className={`d-flex align-items-center side-menu-item ${
                  activeItem === "Feedback" ? "active" : ""
                }`}
              >
                <i className="fa-solid fa-message me-2"></i>
                <p className="fw-medium mt-3">Feedback</p>
              </div>
            </div>
          </Link>
        </div>
        <div
          className="w-75 bg-white"
          style={{
            overflowY: "auto",
          }}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
}
