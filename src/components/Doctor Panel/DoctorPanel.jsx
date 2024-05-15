import React from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

export default function DoctorPanel() {
  return (
    <>
      <div>
        <div className="d-flex" style={{ height: "100vh" }}>
          <div
            className="w-25"
            style={{
              minHeight: "100vh",
            }}
          >
            {/* outer container of img */}
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
                to={"/DoctorPanel/check-appointment"}
                className="text-reset text-decoration-none"
              >
                <div
                  className="d-flex align-items-center"
                  style={{ paddingLeft: "3vw", cursor: "pointer" }}
                >
                  <i className="fa-solid fa-file-circle-check me-2 "></i>
                  <p className="fw-medium mt-3">Check Appointments</p>
                </div>
              </Link>
            </div>
            {/*  */}
            <Link
              to={"/DoctorPanel/consultant-history"}
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
              to={"/DoctorPanel/feedback"}
              className="text-reset text-decoration-none"
            >
              <div style={{ height: "8vh" }}>
                <div
                  className="d-flex align-items-center"
                  style={{ paddingLeft: "3vw", cursor: "pointer" }}
                >
                  <i className="fa-solid fa-message me-2"></i>
                  <p className="fw-medium mt-3">Feedback</p>
                </div>
              </div>
            </Link>
            {/*  */}
          </div>
          <div className="w-75" style={{ overflow: "auto", background: 'rgb(240, 239, 238)' }}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
