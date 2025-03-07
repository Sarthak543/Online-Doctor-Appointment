import React, { useEffect, useState } from "react";
import Appointment_Calender from "./Appointment_Calender";
import { toast } from "react-toastify";
import useRazorpay from "react-razorpay";

export default function BookAppointment({ loader }) {
  const [specializations, setSpecializations] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [date, setDate] = useState(new Date());
  const [Problem, setProblem] = useState("");
  const [busyDates, setbusyDates] = useState(null);
  const [Razorpay] = useRazorpay();

  useEffect(() => {
    async function getspecialization() {
      loader(30);
      try {
        const response = await fetch("http://localhost:8010/specialization", {
          method: "post",
        });
        loader(50);
        const fetchedData = await response.json();
        setSpecializations(fetchedData);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      loader(10);
      getspecialization();
      loader(100);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    async function getDocName() {
      try {
        const response = await fetch(
          `http://localhost:8010/getDoctorsName/${selectedSpecialization}`,
          {
            method: "post",
          }
        );
        const fetchedData23 = await response.json();
        setDoctors(fetchedData23);
      } catch (error) {
        // console.clear();
        console.log(error);
      }
    }

    try {
      getDocName();
    } catch (error) {
      // console.clear();
      console.log(error);
    }
  }, [selectedSpecialization]);

  useEffect(() => {
    if (selectedDoctor) {
      async function getBusyDates(docName) {
        const response = await fetch(
          `http://localhost:8010/getBusyDate/${docName}`,
          {
            method: "get",
          }
        );
        const data = await response.json();
        setbusyDates(data);
        console.log(data + "DoctorName:  " + selectedDoctor);
      }

      getBusyDates(selectedDoctor);
    }
  }, [selectedDoctor]);

  const initialize_payment = async (event) => {
    event.preventDefault();
    save_appointment_data_to_sessionStorage();
    let appointmentFee = 1;

    try {
      fetch("http://localhost:8010/createOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: appointmentFee }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.status == "created") {
            // open payment form
            let options = {
              key: "rzp_test_1L0eX7RuYr9ZH3",
              amount: data.amount,
              currency: "INR",
              name: "Online Doctor Appointment",
              description: "Appointment fee for doctor appointment",
              image:
                "https://img.icons8.com/?size=100&id=A8QJYdwE1n8h&format=png&color=000000",
              order_id: data.id,
              handler: function (response) {
                console.log(response.razor_payment_id);
                console.log(response.razor_order_id);
                console.log(response.razorpay_signature);
                console.log("Payment successfull");
                toast("Payment Successfull");
                loader(10);
                save_appointment_to_DB();
                loader(100);
                // sessionStorage.removeItem("appointmentData");
              },
              prefill: {
                name: "",
                email: "",
                contact: "",
              },
              notes: {
                address: "Online Doctor Appointment",
              },
              theme: {
                color: "#3399cc",
              },
            };
            let rzp = new Razorpay(options);
            rzp.on("payment.failed", function (response) {
              console.log(response.error.code);
              console.log(response.error.description);
              console.log(response.error.source);
              console.log(response.error.step);
              console.log(response.error.reason);
              console.log(response.error.metadata.order_id);
              console.log(response.error.metadata.payment_id);
              toast("Payment Failed");
              sessionStorage.removeItem("appointmentData");
            });
            rzp.open();
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const save_appointment_to_DB = async () => {
    loader(20);
    const formData = new FormData();
    const storedAppointmentData = JSON.parse(
      sessionStorage.getItem("appointmentData")
    );
    loader(30);

    //appending all the data from patData to formData
    formData.append(
      "specialization",
      storedAppointmentData.selectedSpecialization
    );
    formData.append("DoctorName", storedAppointmentData.DoctorName);
    formData.append("date", new Date(storedAppointmentData.date));
    formData.append("problem", storedAppointmentData.problem);
    formData.append("patientName", sessionStorage.getItem("userName"));
    formData.append("pNumber", sessionStorage.getItem("mob"));
    formData.append("PID", sessionStorage.getItem("id"));
    loader(50);
    console.clear();
    console.log(storedAppointmentData.selectedDoctor);
    // API call
    try {
      const response = await fetch("http://localhost:8010/saveAppointment", {
        method: "post",
        body: formData,
      });
      loader(80);
      if (response.ok) {
        toast("Successfully Registered");
      }
    } catch (error) {
      alert("Error occur");
      console.error(error);
    }
  };

  const save_appointment_data_to_sessionStorage = () => {
    let appointmentData = {
      specialization: selectedSpecialization,
      DoctorName: selectedDoctor,
      date: date,
      problem: Problem,
    };

    sessionStorage.setItem("appointmentData", JSON.stringify(appointmentData));
  };

  return (
    <>
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
        <form
          className="container p-3"
          method="get"
          onSubmit={initialize_payment}
        >
          <div className="d-flex">
            {/* Containing the items and calendar */}
            <div className="container">
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Select Specialization
                </label>
                <div>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    value={selectedSpecialization}
                    onChange={(e) => setSelectedSpecialization(e.target.value)}
                    disabled={specializations.length === 0} // Disable if no specializations
                  >
                    <option value="">Select Specialization</option>
                    {specializations.length > 0 ? ( // Render options only if data is present
                      specializations.map((spec) => (
                        <option value={spec}>{spec}</option>
                      ))
                    ) : (
                      <option disabled>Loading specializations...</option>
                    )}
                  </select>
                </div>
              </div>
              <div class="mb-4">
                <label for="exampleInputPassword1" class="form-label">
                  Select Doctor
                </label>
                <div>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    value={selectedDoctor}
                    onChange={(e) => setSelectedDoctor(e.target.value)}
                    disabled={doctors.length === 0 || !selectedSpecialization} // Disable if no doctors or no specialization selected
                  >
                    <option value="">Select Doctor</option>
                    {doctors.length > 0 && selectedSpecialization ? ( // Render options only if data and specialization is selected
                      doctors.map((doctor) => (
                        <option value={doctor}>{doctor}</option>
                      ))
                    ) : (
                      <option disabled>Loading doctors...</option>
                    )}
                  </select>
                </div>
              </div>
              <div>
                <label for="exampleInputPassword1" class="form-label">
                  Problem Description
                </label>
                <div>
                  <textarea
                    class="form-control"
                    rows="3"
                    placeholder="Describe your problem"
                    value={Problem}
                    onChange={(e) => {
                      setProblem(e.target.value);
                      console.log(e.target.value);
                    }}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="container">
              <label for="exampleInputPassword1" class="form-label">
                Choose Appointment Date
              </label>
              <div>
                <Appointment_Calender
                  Parent_date={setDate}
                  busyDates={busyDates}
                />
              </div>
            </div>
          </div>
          <div className="container">
            {/* containing the buttons */}
            <div className="row my-4">
              <button className="btn btn-success offset-3 col-2" type="submit">
                {" "}
                Book
              </button>
              <button className="btn btn-danger offset-1 col-2" type="reset">
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
