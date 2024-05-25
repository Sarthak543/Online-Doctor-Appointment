import React, { useContext, useState } from "react";
import documentContext from "../context/Document_State/DocumentContext";
import { Link, useNavigate } from "react-router-dom";
import {toast } from 'react-toastify';

export default function SignIn() {
  let navigate = useNavigate();
  let url = "";
  const a = useContext(documentContext);
  const { signIn } = a;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    if (signIn === "patient") {
      navigate("/PatientRegistration");
    } else {
      navigate("/DocterRegistration/form1");
    }
  };

  const FormSignInHandler = async (e) => {
    e.preventDefault();
    if (signIn === "patient") {
      url = `http://localhost:8010/patientLogin/${email}/${password}`;
    } else {
      url = `http://localhost:8010/doctorLogin/${email}/${password}`;
    }

    const formData = new FormData();
    formData.append('email',email)
    formData.append('password',password)

    console.log(email+"     "+password+"       "+signIn)
    // API call
    try {
      const response = await fetch(url, {
        method: "post",
      });
      if (response == null) {
        alert("No user found");
      } else {
        const data = await response.json();
        toast.success("User Found");
        console.log(data);
      }
    } catch (error) {
      toast.error("Incorrect Details");
    }
  };


  return (
    <>
      {/* Log in form */}
      <div
        className="container w-50 d-flex border rounded-4 p-0"
        style={{ marginTop: "10vh" }}
      >
        <div className="w-50">
          <img src="../img.jpg" alt="" srcset="" />
        </div>
        <div className="w-50">
          <p className="fs-1  text-center">Login </p>
          <form className="m-4 mb-2 p-4/" onSubmit={FormSignInHandler}>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Email address
              </label>
              <input
                type="email"
                class="form-control border rounded-2"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div id="emailHelp" class="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Password
              </label>
              <input
                type="password"
                class="form-control border rounded-2"
                id="exampleInputPassword1"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div class="mb-3 form-check pl-1">
              <input
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"
              />
              <label class="form-check-label" for="exampleCheck1">
                Check me out
              </label>
            </div>
            <button
              type="submit"
              class="btn btn-primary w-100 border rounded-4"
            >
              Submit
            </button>
          </form>
          <p className="text-end text-secondary me-3 mb-0">Forget password?</p>
          <p className="text-center fs-7 text-dark mb-2">OR</p>
          <div className="d-flex justify-content-center">
            <button className="btn  me-4 border rounded-3">
              <img className="logo" src="../google.png" alt="#" />
              <p className=" ms-2 d-inline">Google</p>
            </button>
            <button className="btn border rounded-3">
              <img className="logo" src="../facebook.png" alt="#" />
              <p className=" ms-2 d-inline">Facebook</p>
            </button>
          </div>
          <div className="text-center">
            <Link className="text-reset" onClick={handleSignUp}>
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
