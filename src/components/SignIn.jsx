import React, { useContext, useRef, useState } from "react";
import documentContext from "../context/Document_State/DocumentContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignIn() {
  let navigate = useNavigate();
  let url = "";
  const modalRef = useRef(null);
  const a = useContext(documentContext);
  const { signIn } = a;
  const [email, setEmail] = useState("");
  const [ForgetEmail, setForgetEmail] = useState("");
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
    formData.append("email", email);
    formData.append("password", password);

    // API call
    try {
      const response = await fetch(url, {
        method: "post",
      });
      if (response == null) {
        toast("No user found");
      } else {
        const data = await response.json();
        console.log(data);

        // Store user info in session storage
        sessionStorage.setItem("Email", email);
        sessionStorage.setItem("userName", data.name);
        sessionStorage.setItem("id", data.id);
        sessionStorage.setItem(
          "mob",
          signIn === "patient" ? data.mob : data.mobile
        );
        sessionStorage.setItem(
          "userType",
          signIn === "patient" ? "Patient" : "Doctor"
        );

        // Navigate to respective panel after successful sign-in
        if (signIn === "patient") {
          navigate("/PatientPanel");
        } else {
          navigate("/DoctorPanel");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Incorrect Details");
    }
  };

  function modal() {
    modalRef.current.click();
  }

  async function forgetPassword(e) {
    e.preventDefault();
    if (signIn === "patient") {
      url = `http://localhost:8010/patientLogin/forgetPassword?email=${ForgetEmail}`;
    } else {
      url = `http://localhost:8010/doctorLogin/forgetPassword?email=${ForgetEmail}`;
    }
    const response = await fetch(url, {
      method: "post",
    });
    if (response.ok) {
      toast("Password has been sent to your registered email");
    } else {
      toast("No User Found by this email");
    }
  }

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
          <button
            className="btn text-secondary p-0"
            style={{ marginLeft: "60%" }}
            onClick={modal}
          >
            Forget password?
          </button>
          <div className="text-center mt-4">
            <Link className="text-reset" onClick={handleSignUp}>
              Create Account
            </Link>
          </div>
        </div>
      </div>

      {/* modal */}
      <button
        type="button"
        class="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={modalRef}
      >
        Launch demo modal
      </button>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Forget Password
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label font-style">
                    Email{" "}
                  </label>

                  <input
                    type="text"
                    class="form-control"
                    id="recipient-name"
                    value={ForgetEmail}
                    onChange={(e) => {
                      setForgetEmail(e.target.value);
                    }}
                  />
                </div>
                <p>Your password will be send to your registered email ID</p>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={forgetPassword}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
