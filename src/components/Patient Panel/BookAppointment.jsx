import React, { useEffect, useState } from "react";
import Appointment_Calender from "./Appointment_Calender";
import { getUserData } from "../../IndexDB_Operation";
import { toast } from "react-toastify";

export default function BookAppointment() {
  const [specializations, setSpecializations] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [date, setDate] = useState(new Date());
  const [Problem, setProblem] = useState("");
  const [patient, setpatient] = useState({})


  useEffect(() => {
    async function getspecialization() {
      try {
        const response = await fetch("http://localhost:8010/specialization", {
          method: "post",
        });
        const fetchedData = await response.json();
        setSpecializations(fetchedData);
      } catch (error) {
        console.log(error);
      }
    }

    async function getUserDetail(){
      const patientEmail = sessionStorage.getItem("user")
      const result = await getUserData(patientEmail,"OnlineDoctorAppointment", "Patient")
      setpatient(result)
    }
    try {
      getspecialization();
      getUserDetail();
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
        console.clear();
        console.log(error);
      }
    }

    try {
      getDocName();
    } catch (error) {
      console.clear();
      console.log(error);
    }
  }, [selectedSpecialization]);










  const handleSubmit= async(event)=>{
    event.preventDefault();
    const formData = new FormData();

    //appending all the data from patData to formData
    formData.append('specialization',selectedSpecialization)
    formData.append('DoctorName',selectedDoctor)
    formData.append('date',date)
    formData.append('problem',Problem)
    formData.append('patientName',patient.name)
    formData.append('pNumber',patient.mob)

    // API call
    try {
        const response = await fetch('http://localhost:8010/saveAppointment',{
            method:'post',
            body:formData
        });
        if(response.ok){
            toast("Successfully Registered");
        }
    } catch (error) {
        alert('Error occur');
        console.error(error);
    }
};











  return (
    <>
      <h1 className="text-center">Book an appointment</h1>
      <div className="container w-50 border border-danger">
        <form action="" method="get" className="mt-5" onSubmit={handleSubmit}>
          <div className="row ms-2 fs-6 fw-bold">Doctors details</div>
          <hr />

          <div className="row">
            <div className="col-6">
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
            <div className="col-6">
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

          <div className="row ms-2 fs-6 fw-bold mt-4">
            Select Appointment Date
          </div>
          <hr />
          <div className=" container w-50 mx-auto">
            <Appointment_Calender Parent_date = {setDate} />
          </div>
          <div className="container mt-4">
            <textarea
              class="form-control"
              rows="3"
              placeholder="Describe your problem"
              value = {Problem}
              onChange={e=>{setProblem(e.target.value); console.log(e.target.value)}}

            ></textarea>
          </div>
          <div className="row my-4">
            <button className="btn btn-success offset-3 col-2" type="submit">
              {" "}
              Book
            </button>
            <button className="btn btn-danger offset-1 col-2" type="reset">
              Reset
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
