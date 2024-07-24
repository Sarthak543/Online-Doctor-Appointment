import React, { useState } from "react";
import { toast } from "react-toastify";

export default function ContactUs() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Message, setMessage] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("userName", Name);
    formData.append("Email", Email);
    formData.append("message", Message);

    const response = await fetch("http://localhost:8010/contactUS", {
      method: "post",
      body: formData,
    });
    if (response.ok) {
      toast("Feedback submitted");
    } else {
      toast("Error while submitting feedback");
    }
  }

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
              <form onSubmit={onSubmit}>
                <div class="form-group">
                  <label for="name">Name</label>
                  <input
                    type="text"
                    class="form-control text-light custom-placeholder"
                    id="name"
                    name="userName"
                    placeholder="Enter your name"
                    style={{ background: "rgba(0, 0, 0, 0.3)" }}
                    value={Name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
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
                    value={Email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div class="form-group mt-1">
                  <label for="messageID">Message</label>
                  <textarea
                    class="form-control text-light custom-placeholder"
                    id="messageID"
                    className="message"
                    rows="5"
                    placeholder="Enter your message"
                    style={{ background: "rgba(0, 0, 0, 0.3)" }}
                    value={Message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
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
