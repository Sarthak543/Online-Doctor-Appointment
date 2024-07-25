import React from "react";

export default function About() {
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
        class="container mt-3 p-5 text-light shadow-lg rounded-4"
        style={{ background: "rgba(0, 0, 0, 0.3)" }}
      >
        <div class="row">
          <div class="col-md-6">
            <h2 className="font-style">About Our Healthcare Service</h2>
            <p>
              Welcome to our online doctor appointment booking system. We aim to
              provide a seamless and efficient way for patients to connect with
              healthcare professionals. Our platform ensures that you can book,
              reschedule, and manage your appointments with ease.
            </p>
            <p>
              Our mission is to make healthcare accessible and convenient for
              everyone. With our user-friendly interface and robust features, we
              strive to offer the best service possible.
            </p>
          </div>
          <div class="col-md-6">
            <img
              src="../about-bg.jpg"
              style={backgroundStyle}
              class="img-fluid rounded-1"
              alt="Healthcare Image"
            />
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-md-12">
            <h3 className="font-style">Our Values</h3>
            <ul>
              <li>Compassionate Care</li>
              <li>Integrity and Trust</li>
              <li>Innovation and Excellence</li>
              <li>Patient-Centered Approach</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
