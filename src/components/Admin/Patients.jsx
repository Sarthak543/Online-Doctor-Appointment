import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Table from "../Table/Table";

export default function Patients() {
  const [patients, setpatients] = useState([]);
  const [update, setupdate] = useState(false);

  useEffect(() => {
    async function getPatients() {
      try {
        const response = await fetch(
          "http://localhost:8010/getPatientDetails",
          {
            method: "get",
          }
        );

        const data = await response.json();
        setpatients(data);
      } catch (error) {
        console.clear();
        console.log(error);
      }
    }
    getPatients();
  }, [update]);

  async function deletePatient(id) {
    try {
      const response = await fetch(
        `http://localhost:8010/deletePatientRecord/${id}`,
        {
          method: "get",
        }
      );

      if (response.ok) {
        setpatients(patients.filter((item) => item.appointmentNumber !== id));
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
            style={{ maxHeight: "5vh" }}
            src={`data:image/jpeg;base64,${row.image}`}
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
      selector: (row) => row.mob,
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <button
            className="btn btn-outline-danger badge-pill text-end "
            onClick={() => deletePatient(row.id)}
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
        data={patients}
        user={"adminPatient"}
        update={update}
      />
    </div>
  );
}
