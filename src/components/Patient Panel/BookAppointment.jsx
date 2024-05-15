import React from "react";
import Appointment_Calender from "./Appointment_Calender";

export default function BookAppointment() {
  return (
    <>
      <h1 className="text-center">Book an appointment</h1>
      <div className="container w-50 border border-danger">
        <form action="" method="get" className="mt-5"  style={{marginBottom:'15vh'}}>
          <div className="row ms-2 fs-6 fw-bold">Doctors details</div>
          <hr />
          <div className="row">
            <div className="col-6">
              <select class="form-select" aria-label="Default select example">
                <option selected>Select Specialization</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div className="col-6">
              <select class="form-select" aria-label="Default select example">
                <option selected>Select Doctor Name</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>

          <div className="row ms-2 fs-6 fw-bold mt-4">
            Select Appointment Date
          </div>
          <hr />
          <div className=" container w-50 mx-auto">
           <Appointment_Calender/>
          </div>
          <div className="container mt-4">
          <textarea class="form-control" rows="3" placeholder="Describe your problem"></textarea>
          </div>
          <div className="row my-4">
            <button className="btn btn-success offset-3 col-2" type="submit"> Book</button>
            <button className="btn btn-danger offset-1 col-2" type="reset">Reset</button>
          </div>
        </form>
      </div>
    </>
  );
}
