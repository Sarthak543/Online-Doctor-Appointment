import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import documentContext from "../../context/Document_State/DocumentContext";

export default function AdminPanel() {
  const [patient, setpatient] = useState({});
  const [activeItem, setActiveItem] = useState("");
  const { setisUserLogIn } = useContext(documentContext);

  useEffect(() => {
    setisUserLogIn(true); // imp
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
                src="../admin.png"
                alt="Description"
              />
            </div>
            <p className="text-center fw-bold font-style fs-5">Admin</p>
          </div>

          {/* Options  */}
          <div className="mt-3" style={{ height: "8vh" }}>
            {/*  */}
            <Link
              to={"/AdminPanel/patients"}
              className="text-reset text-decoration-none"
              onClick={() => handleItemClick("Patients")}
            >
              <div
                className={`d-flex align-items-center side-menu-item ${
                  activeItem === "Patients" ? "active" : ""
                }`}
              >
                <i className="fa-solid fa-receipt me-2"></i>
                <p className="font-style mt-3 ">Patients</p>
              </div>
            </Link>
          </div>
          {/*  */}
          <Link
            to={"/AdminPanel/doctors"}
            className="text-reset text-decoration-none"
            onClick={() => handleItemClick("Doctors")}
          >
            <div style={{ height: "8vh" }}>
              <div
                className={`d-flex align-items-center side-menu-item ${
                  activeItem === "Doctors" ? "active" : ""
                }`}
              >
                <i className="fa-solid fa-clock-rotate-left me-2"></i>
                <p className="font-style mt-3">Doctors</p>
              </div>
            </div>
          </Link>
          {/*  */}
          {/*  */}
          <Link
            to={"/AdminPanel/all-appointments"}
            className="text-reset text-decoration-none"
            onClick={() => handleItemClick("View total Booked Appointment")}
          >
            <div style={{ height: "8vh" }}>
              <div
                className={`d-flex align-items-center side-menu-item ${
                  activeItem === "View total Booked Appointment" ? "active" : ""
                }`}
              >
                <i className="fa-solid fa-eye me-2"></i>
                <p className="font-style mt-3">View total Booked Appointment</p>
              </div>
            </div>
          </Link>
          <Link
            to={"/AdminPanel/feedbacks"}
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
                <p className="fw-medium mt-3">Feedbacks</p>
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
