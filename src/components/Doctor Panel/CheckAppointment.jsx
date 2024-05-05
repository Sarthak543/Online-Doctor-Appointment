import React from "react";

export default function CheckAppointment() {
  const backgroundStyle = {
    position: "absolute",
    backgroundImage: `url(../test1.jpg)`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    height: "100vh",
    width: "100%",
    maxWidth: "100vw",
    overflowX: "hidden",
    zIndex: "-1",
  };
  return (
    <>
      {/* <div style={backgroundStyle}></div> */}
      <div className="container d-flex justify-content-around align-items-center h-25">
        <div
          className="border rounded-4 h-75 w-25 d-flex"
          style={{ background: "rgb(214 224 210)" }}
        >
          <div className="w-25  d-flex justify-content-end align-items-center">
            <i
              className="fa-solid fa-hospital-user"
              style={{ fontSize: "60px" }}
            ></i>
          </div>
          <div className="w-75 d-flex flex-column justify-content-center">
            <div className="">
              <p className="text-center fw-medium fs-5">Total Patient</p>
              <p className="text-center fw-medium fs-5 mb-0">2000+</p>
              <p className="text-center">Till Today</p>
            </div>
          </div>
        </div>
        <div
          className="border  rounded-4 h-75 w-25 d-flex"
          style={{ background: "rgb(214 224 210)" }}
        >
          <div className="w-25  d-flex justify-content-center align-items-center">
            <i
              className="fa-regular fa-calendar-check"
              style={{ fontSize: "50px" }}
            ></i>
          </div>
          <div className="w-75 d-flex flex-column">
            <div className="mt-5">
              <p className="text-center fw-medium ">Today Appointment: 29</p>
              <p className="text-center fw-medium">2/05/2024</p>
            </div>
          </div>
        </div>

        <div
          className="border  rounded-4 h-75 w-25"
          style={{ background: "rgb(214 224 210)" }}
        >
          <p className="text-center fs-5 fw-bold">Tip of the day</p>
          <p className="ms-2">
            Regular exercise has numerous benefits, including stress reduction,
            improved cardiovascular health.
          </p>
        </div>
      </div>
      {/* Table that shows appointments */}
      <div className="container" style={{ width: "65vw" }}>
        <p className="text-center fs-4 fw-bold">Appointments</p>
        <div className="border-top rounded-2">
          {/* appointmnet table */}
          <table className="table table-hover transparent-table">
            <thead>
              <tr className="table-color">
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
                <th scope="col text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td className="w-25">
                  <button className="btn btn-success badge-pill text-end me-3">
                    Consult
                  </button>
                  <button className="btn btn-danger badge-pill text-end">
                    Rescheduled
                  </button>
                </td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td className="w-25">
                  <button className="btn btn-success badge-pill text-end me-3">
                    Consult
                  </button>
                  <button className="btn btn-danger badge-pill text-end">
                    Rescheduled
                  </button>
                </td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td colspan="2">Larry the Bird</td>
                <td>@twitter</td>
                <td className="w-25">
                  <button className="btn btn-success badge-pill text-end me-3">
                    Consult
                  </button>
                  <button className="btn btn-danger badge-pill text-end">
                    Rescheduled
                  </button>
                </td>
              </tr>
              <tr>
                <th scope="row">4</th>
                <td colspan="2">Larry the Bird</td>
                <td>@twitter</td>
                <td className="w-25">
                  <button className="btn btn-success badge-pill text-end me-3">
                    Consult
                  </button>
                  <button className="btn btn-danger badge-pill text-end">
                    Rescheduled
                  </button>
                </td>
              </tr>
              <tr>
                <th scope="row">5</th>
                <td colspan="2">Larry the Bird</td>
                <td>@twitter</td>
                <td className="w-25">
                  <button className="btn btn-success badge-pill text-end me-3">
                    Consult
                  </button>
                  <button className="btn btn-danger badge-pill text-end">
                    Rescheduled
                  </button>
                </td>
              </tr>
              <tr>
                <th scope="row">6</th>
                <td colspan="2">Larry the Bird</td>
                <td>@twitter</td>
                <td className="w-25">
                  <button className="btn btn-success badge-pill text-end me-3">
                    Consult
                  </button>
                  <button className="btn btn-danger badge-pill text-end">
                    Rescheduled
                  </button>
                </td>
              </tr>
              <tr>
                <th scope="row">7</th>
                <td colspan="2">Larry the Bird</td>
                <td>@twitter</td>
                <td className="w-25">
                  <button className="btn btn-success badge-pill text-end me-3">
                    Consult
                  </button>
                  <button className="btn btn-danger badge-pill text-end">
                    Rescheduled
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-between">
          <button className="btn btn-primary m-2">Previous</button>
          <button className="btn btn-primary m-2">Next</button>
        </div>
      </div>
    </>
  );
}
