import React from "react";

export default function ViewBookedAppointment() {
  return (
    <>
      <div className="container text-center fs-2 fw-bold mt-4">
        Appointment History
      </div>
      <div className="container w-75">
        <div className="border-top rounded-2 mt-5">
          {/* Consultant table */}
          <table className="table table-hover transparent-table">
            <thead>
              <tr className="table-color">
                <th scope="col">SNo.</th>
                <th scope="col">Doctor Name</th>
                <th scope="col">Appointment Date</th>
                <th scope="col">Mobile</th>
                <th scope="col text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td className="w-25">
                  <button className="btn btn-outline-danger badge-pill ms-5 w-50">
                    Cancel
                  </button>
                </td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td className="w-25">
                  <button className="btn btn-outline-danger badge-pill  ms-5 w-50">
                    Cancel
                  </button>
                </td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td colspan="2">Larry the Bird</td>
                <td>@twitter</td>
                <td className="w-25">
                  <button className="btn btn-outline-danger badge-pill  ms-5 w-50">
                    Cancel
                  </button>
                </td>
              </tr>
              <tr>
                <th scope="row">4</th>
                <td colspan="2">Larry the Bird</td>
                <td>@twitter</td>
                <td className="w-25">
                  <button className="btn btn-outline-danger badge-pill  ms-5 w-50">
                    Cancel
                  </button>
                </td>
              </tr>
              <tr>
                <th scope="row">5</th>
                <td colspan="2">Larry the Bird</td>
                <td>@twitter</td>
                <td className="w-25">
                  <button className="btn btn-outline-danger badge-pill  ms-5 w-50">
                    Cancel
                  </button>
                </td>
              </tr>
              <tr>
                <th scope="row">6</th>
                <td colspan="2">Larry the Bird</td>
                <td>@twitter</td>
                <td className="w-25">
                  <button className="btn btn-outline-danger badge-pill  ms-5 w-50">
                    Cancel
                  </button>
                </td>
              </tr>
              <tr>
                <th scope="row">7</th>
                <td colspan="2">Larry the Bird</td>
                <td>@twitter</td>
                <td className="w-25">
                  <button className="btn btn-outline-danger badge-pill  ms-5 w-50">
                    Cancel
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-between" style={{marginBottom:'15vh'}}>
          <button className="btn btn-primary m-2">Previous</button>
          <button className="btn btn-primary m-2">Next</button>
        </div>
      </div>
    </>
  );
}
