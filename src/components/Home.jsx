import React, { useContext, useEffect } from "react";
import documentContext from "../context/Document_State/DocumentContext";
import { Link } from "react-router-dom";

export default function Home() {
  const a = useContext(documentContext);
  const { signIn, setSignIn } = a;

  useEffect(() => {
    console.log("Default value is set to : ", signIn);
  }, []);

  const signInHandler = async (event) => {
    const name = event.target.name;
    await setSignIn(name);
    console.log(signIn);
  };

  return (
    <>
      <div className="home_div_bg">
        <div className=" green-bg"></div>
        <img className="img_bg" src="../HomePage.png" alt="" srcset="" />
      </div>
      <div className="container text-center d-flex justify-content-center align-items-center flex-column gap-4 mt-4">
        <span style={{ fontSize: "7vh" }}>Online Doctor Appointment</span>
      </div>

      <div
        className="d-flex flex-column ms-5 w-50"
        style={{ marginTop: "10vh" }}
      >
        <p className="fs-1 mb-0">Get Quick</p>
        <p className="fs-1 fw-semibold">Medical Service</p>
        <p className="text-secondary">
          In today's fast-paced world,access to promt and efficient medical
          service is of paramount importance. When faced with a medical
          emergency or seeking immediate medical attention, the ability to
          receive quick medical services can significantly impact the outcome of
          a situation
        </p>
      </div>
      <div className="ms-5">
        <Link to={"signIn"}>
          <button
            className="btn btn-outline-success me-4"
            name="patient"
            onClick={signInHandler}
          >
            I'm Patient
          </button>
        </Link>
        <Link to={"signIn"}>
          <button
            className="btn btn-outline-primary"
            name="Doctor"
            onClick={signInHandler}
          >
            I'm Doctor
          </button>
        </Link>
      </div>
    </>
  );
}
