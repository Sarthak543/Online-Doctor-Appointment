import React from "react";

export default function ContactUs() {
  const backgroundStyle = {
    position: "absolute",
    backgroundImage: `url("../About-bg.jpg")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    height: "60%",
    width: "25%",
    marginLeft: "150px",
    overflowX: "hidden",
  };

  return (
    <>
      <div
        className="h-100 w-100 position-absolute bg-cover"
        style={{
          backgroundImage: `url(../hospital-img.jpg)`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          overflowX: "hidden",
          zIndex: "-1",
          filter: "blur(8px)",
        }}
      ></div>

      <div
        class="container mt-3 pb-5 text-light shadow-lg rounded-4 w-50"
        style={{ background: "rgba(0, 0, 0, 0.3)" }}
      >
        <div class="container mt-5">
          <h2 class="text-center mb-4">Contact Us</h2>
          <div class="row justify-content-center">
            <div class="col-md-8">
              <form>
                <div class="form-group">
                  <label for="name">Name</label>
                  <input
                    type="text"
                    class="form-control text-light custom-placeholder"
                    id="name"
                    placeholder="Enter your name"
                    style={{ background: "rgba(0, 0, 0, 0.3)" }}
                  />
                </div>
                <div class="form-group mt-1">
                  <label for="email">Email</label>
                  <input
                    type="email"
                    class="form-control text-light custom-placeholder"
                    id="email"
                    placeholder="Enter your email"
                    style={{ background: "rgba(0, 0, 0, 0.3)" }}
                  />
                </div>
                <div class="form-group mt-1">
                  <label for="subject">Subject</label>
                  <input
                    type="text"
                    class="form-control text-light custom-placeholder"
                    id="subject"
                    placeholder="Enter subject"
                    style={{ background: "rgba(0, 0, 0, 0.3)" }}
                  />
                </div>
                <div class="form-group mt-1">
                  <label for="message">Message</label>
                  <textarea
                    class="form-control text-light custom-placeholder"
                    id="message"
                    rows="5"
                    placeholder="Enter your message"
                    style={{ background: "rgba(0, 0, 0, 0.3)" }}
                  ></textarea>
                </div>
                <div className="text-center mt-4">
                  <button type="submit" class="btn btn-success me-5">
                    Submit
                  </button>
                  <button type="reset" class="btn btn-danger">
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
