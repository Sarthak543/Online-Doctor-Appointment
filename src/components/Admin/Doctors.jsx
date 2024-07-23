import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Table from "../Table/Table";

export default function Doctors() {
  const [doctors, setdoctors] = useState([], []);
  const [update, setupdate] = useState(false);

  useEffect(() => {
    async function getDoctors() {
      try {
        const response = await fetch(
          "http://localhost:8010/getDoctorsDetails",
          {
            method: "get",
          }
        );

        const data = await response.json();
        setdoctors(data);
      } catch (error) {
        console.clear();
        console.log(error);
      }
    }
    getDoctors();
  }, [update]);

  async function deleteDoctor(id) {
    try {
      const response = await fetch(
        `http://localhost:8010/deleteDoctorRecord/${id}`,
        {
          method: "get",
        }
      );

      if (response.ok) {
        setdoctors(doctors.filter((item) => item.appointmentNumber !== id));
        toast("Account Deleted"); // Show toast only if deletion is successful
        setupdate(!update);
      } else {
        console.error("Unable to Delete account"); // Handle potential errors
      }
    } catch (error) {
      console.clear();
      console.log(error);
    }
  }

  let columns = [
    {
      name: "S.No",
      cell: (row, index) => index + 1,
      sortable: false,
      width: "100px",
    },
    {
      name: "Profile Photo",
      selector: (row) => {
        return (
          <img
            className="border border-dark rounded-circle"
            id="dp"
            style={{ maxHeight: "5vh", width: "3vw" }}
            src={`data:image/jpeg;base64,${row.profilePhoto}`}
            alt="Description"
          />
        );
      },
      sortable: true,
    },
    {
      name: "Patients Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Mobile",
      selector: (row) => row.mobile,
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <button
            className="btn btn-outline-danger badge-pill text-end "
            onClick={() => deleteDoctor(row.id)}
          >
            Delete Account
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="container-fluid  table-style">
      <h1 className="text-center mb-0 pt-2 table-heading">All Patients</h1>
      <Table
        columns={columns}
        data={doctors}
        user={"adminPatient"}
        update={update}
      />
    </div>
  );
}
