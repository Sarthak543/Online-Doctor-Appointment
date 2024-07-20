import React from "react";

export default function FeedBack() {
  return (
    <div
      className="container bg-white p-0 border border-2 rounded-4"
      style={{ width: "50vw", marginTop: "10vh" }}
    >
      <h1
        className="text-center fw-bold bg-secondary mb-3 pt-2"
        style={{ height: "8vh", fontSize: "30px" }}
      >
        Book an Appointment
      </h1>
      <form action="" method="get">
        <div class="mb-3 p-4">
          <label for="exampleFormControlTextarea1" class="form-label">
            Tell us how can we assist you
          </label>
          <textarea
            class="form-control border border-dark"
            id="exampleFormControlTextarea1"
            rows="3"
            style={{ background: "none", height: "200px" }}
          ></textarea>
        </div>
        <div className="d-flex justify-content-center mb-4">
          <button className="btn btn-success me-3" type="submit">
            Submit
          </button>
          <button className="btn btn-danger" type="reset">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
