import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import documentContext from "../../context/Document_State/DocumentContext";

export default function DoctorPanel() {
  const [doctor, setdoctor] = useState({});
  const [activeItem, setActiveItem] = useState("");
  const { setisUserLogIn } = useContext(documentContext);

  useEffect(() => {
    async function fetchedDoctorData() {
      const doctorEmail = sessionStorage.getItem("user");
      const response = await fetch(
        `http://localhost:8010/DoctorDetail?email=${doctorEmail}`,
        { method: "post" }
      );
      const data = await response.json();
      setdoctor(data);
      setisUserLogIn(true); // imp
    }
    fetchedDoctorData();
    setisUserLogIn(true);
  }, []);

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <>
      <div>
        <div className="d-flex" style={{ height: "100vh" }}>
          <div
            className="w-25 border-end border-2"
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
                  src={`data:image/jpeg;base64,${doctor.profilePhoto}`}
                  alt=""
                />
              </div>
              <p className="text-center fw-bold">{doctor.name}</p>
            </div>

            {/* Options  */}
            <div className="mt-3" style={{ height: "8vh" }}>
              {/*  */}
              <Link
                to={"/DoctorPanel/check-appointment"}
                className="text-reset text-decoration-none"
                onClick={() => handleItemClick("Check Appointments")}
              >
                <div
                  className={`d-flex align-items-center side-menu-item ${
                    activeItem === "Check Appointments" ? "active" : ""
                  }`}
                >
                  <i className="fa-solid fa-file-circle-check me-2 "></i>
                  <p className="fw-medium mt-3">Check Appointments</p>
                </div>
              </Link>
            </div>
            {/*  */}
            <Link
              to={"/DoctorPanel/upcoming-appointment"}
              className="text-reset text-decoration-none"
              onClick={() => handleItemClick("Upcoming Appointments")}
            >
              <div style={{ height: "8vh" }}>
                <div
                  className={`d-flex align-items-center side-menu-item ${
                    activeItem === "Upcoming Appointments" ? "active" : ""
                  }`}
                >
                  <i className="fa-solid fa-file-circle-check me-2 "></i>
                  <p className="fw-medium mt-3">Upcoming Appointments</p>
                </div>
              </div>
            </Link>
            <Link
              to={"/DoctorPanel/consultant-history"}
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
                  <p className="fw-medium mt-3">Consultant History</p>
                </div>
              </div>
            </Link>
            {/*  */}
            {/*  */}
            <Link
              to={"/DoctorPanel/feedback"}
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
            {/*  */}
          </div>
          <div className="w-75 bg-white" style={{ overflow: "auto" }}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
