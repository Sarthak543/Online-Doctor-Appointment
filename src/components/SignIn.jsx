import React, { useContext, useEffect } from "react";
import documentContext from "../context/Document_State/DocumentContext";

export default function SignIn() {
  const { signIn, setSignIn } = useContext(documentContext);
  let signInType = "";
  useEffect(() => {
    /*
    Instead of creating two forms for user and patient, we create a state signIn in documentContext
    whenever we come to this form from the home component the value of signIn is changed by the Home Component
    Here according to the signIn type(doctor/patient) we will make the request for log in purpose 
    signInType
    */
    signInType = signIn;
    console.log(signInType);
    setSignIn("");
  }, []);

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
          <form className="m-4 mb-2 p-4/">
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Email address
              </label>
              <input
                type="email"
                class="form-control border rounded-2"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
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
              <img className="logo" src="../google.png"/>
              <p className=" ms-2 d-inline">Google</p>
            </button>
            <button className="btn border rounded-3">
            <img className="logo" src="../facebook.png"/>
            <p className=" ms-2 d-inline">Facebook</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
