import React, { useContext, useEffect } from "react";
import documentContext from "../context/Document_State/DocumentContext";
import { Link } from "react-router-dom";

export default function Home() {
  const a = useContext(documentContext);
  const { bg, setbg } = a;
  const { signIn, setSignIn } = a;

  useEffect(() => {
    setbg("../HomePage.png");
  }, []);

  useEffect(() => {
    console.log("Default value is set to : ", signIn);
  }, []);

  const imageStyle = {
    height: "28vh",
    width: "15vw",
    cursor: "pointer",
  };

  const signInHandler = async (event) => {
    const name = event.target.name;
    await setSignIn(name);
    console.log(signIn);
  };

  return (
    <>
      <div className="home_div_bg">
        <img className="img_bg" src="../HomePage.png" alt="" srcset="" />
      </div>
      <div className="container text-center d-flex justify-content-center align-items-center flex-column gap-4 mt-4">
        <span style={{ fontSize: "7vh" }}>Online Doctor Appointment</span>
        <h3 className=" text-center">Sign in As</h3>
        <div>
          <Link to={"PatientRegistration"}>
            <button className="btn btn-outline-success me-4">
              I'm Patient
            </button>
          </Link>
          <Link to={"DocterRegistration/form1"}>
            <button className="btn btn-outline-primary">I'm Doctor</button>
          </Link>
        </div>
      </div>
      <p className="text-center mt-3">
        <Link to={"Register"}>Dont have account? Click here to Register</Link>
      </p>
    </>
  );
}
