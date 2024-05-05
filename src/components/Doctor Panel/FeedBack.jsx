import React from "react";

export default function FeedBack() {
  return (
    <>
      <div className="container text-center fs-2 fw-bold">FeedBack</div>
      <div className="container w-75">
        {/* <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
          />
        </div> */}
        <form action="" method="get">
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">
              Tell us how can we assist you
            </label>
            <textarea
              class="form-control border border-dark"
              id="exampleFormControlTextarea1"
              rows="3"
              style={{ background: "none", height:'200px' }}
            ></textarea>
          </div>
          <div className="d-flex justify-content-center">
            <button className="btn btn-success me-3" type="submit">
              Submit
            </button>
            <button className="btn btn-danger" type="reset">
              Reset
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
