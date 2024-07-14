import React, { useContext, useEffect } from "react";
import documentContext from "../context/Document_State/DocumentContext";

export default function NavBar() {
  const { isUserLogIn, setisUserLogIn } = useContext(documentContext);
  function click() {
    setisUserLogIn(false);
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("mob");
    sessionStorage.removeItem("userType");
    window.location.href = "/";
  }

  useEffect(() => {
    if (isUserLogIn) {
      document.getElementById("logout").classList.remove("d-none");
    } else {
      document.getElementById("logout").classList.add("d-none");
    }
  }, [isUserLogIn]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light bg-transparent shadow-sm">
        <div className="container-fluid">
          <div className="container w-25">
            <img className="w-50" src="../logo.png" alt="#" />
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div className="container w-50 ">
            <div
              className="collapse navbar-collapse d-flex justify-content-center"
              id="navbarNavDropdown"
            >
              <ul className="navbar-nav">
                <li className="nav-item me-5">
                  <a
                    className="nav-link active fs-"
                    aria-current="page"
                    href="/"
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item me-5">
                  <a className="nav-link fs-" href="#">
                    Pricing
                  </a>
                </li>
                <li className="nav-item me-5">
                  <a className="nav-link fs-" href="#">
                    Contact
                  </a>
                </li>
                <li className="nav-item me-5">
                  <a className="nav-link fs-" href="#">
                    About
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="container w-25">
            <button id="logout" className="btn d-none ms-5" onClick={click}>
              Logout
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
