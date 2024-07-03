import React,{useContext} from "react";

export default function NavBar() {
  
  function click() {
    console.log(sessionStorage.getItem("userType"))
  }
  
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
            <button className="btn" onClick={click}>abc</button>
          </div>
        </div>
      </nav>
    </>
  );
}

