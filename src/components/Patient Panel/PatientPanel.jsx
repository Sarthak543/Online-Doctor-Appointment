import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function PatientPanel() {
  return (
    <>
      <div className="d-flex" style={{ height: "100vh" }}>
        <div className="w-25">
          <div>
            {/* div for img  */}
            <div className="d-flex justify-content-center pt-4 pb-2">
              <img
                className="border border-dark rounded-circle"
                style={{ width: "30%", height: "20vh" }}
                src="../doctor.png"
                alt=""
              />
            </div>
            <p className="text-center fw-bold">Sarthak Jaiswal</p>
          </div>

          {/* Options  */}
          <div className="mt-3" style={{ height: "8vh" }}>
            {/*  */}
            <Link
              to={"/PatientPanel/bookAppointment"}
              className="text-reset text-decoration-none"
            >
              <div
                className="d-flex align-items-center"
                style={{ paddingLeft: "3vw", cursor: "pointer" }}
              >
                <i class="fa-solid fa-receipt me-2"></i>
                <p className="fw-medium mt-3">Book Appointments</p>
              </div>
            </Link>
          </div>
          {/*  */}
          <Link
            to={"/PatientPanel/ConsultantHistory"}
            className="text-reset text-decoration-none"
          >
            <div style={{ height: "8vh" }}>
              <div
                className="d-flex align-items-center"
                style={{ paddingLeft: "3vw", cursor: "pointer" }}
              >
                <i className="fa-solid fa-clock-rotate-left me-2"></i>
                <p className="fw-medium mt-3">Consultant History</p>
              </div>
            </div>
          </Link>
          {/*  */}
          {/*  */}
          <Link
            to={"/PatientPanel/viewBookedAppointment"}
            className="text-reset text-decoration-none"
          >
            <div style={{ height: "8vh" }}>
              <div
                className="d-flex align-items-center"
                style={{ paddingLeft: "3vw", cursor: "pointer" }}
              >
                <i class="fa-solid fa-eye me-2"></i>
                <p className="fw-medium mt-3">View Booked Appointment</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="w-75 " style={{overflowY:'auto',background: 'rgb(240, 239, 238)'}} >
            <Outlet />
        </div>
      </div>
    </>
  );
}
