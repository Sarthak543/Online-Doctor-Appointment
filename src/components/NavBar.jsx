import React, { useContext, useEffect } from "react";
import documentContext from "../context/Document_State/DocumentContext";
import { NavLink } from "react-router-dom";

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
                  <NavLink
                    className="nav-link fs-"
                    activeClassName="active"
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item me-5">
                  <NavLink
                    className="nav-link fs-"
                    activeClassName="active"
                    to="contact"
                  >
                    Contact
                  </NavLink>
                </li>
                <li className="nav-item me-5">
                  <NavLink
                    className="nav-link fs-"
                    activeClassName="active"
                    to="about"
                  >
                    About
                  </NavLink>
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
