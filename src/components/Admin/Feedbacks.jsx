import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Table from "../Table/Table";

export default function Feedbacks({ loader }) {
  const [feedbacks, setfeedbacks] = useState([]);
  const [clickedCell, setClickedCell] = useState(null);

  useEffect(() => {
    async function getFeedbacks() {
      loader(20);
      try {
        const response = await fetch("http://localhost:8010/getFeedbacks", {
          method: "get",
        });
        loader(40);
        const data = await response.json();
        setfeedbacks(data);
        loader(70);
      } catch (error) {
        console.clear();
        console.log(error);
      }
    }
    loader(10);
    getFeedbacks();
    loader(100);
  }, []);

  async function deleteFeedback(id) {
    try {
      loader(20);
      const response = await fetch(
        `http://localhost:8010/deleteFeedback?id=${id}`,
        {
          method: "delete",
        }
      );
      loader(40);
      if (response.ok) {
        setfeedbacks(feedbacks.filter((item) => item.appointmentNumber !== id));
        toast("Feedback Deleted"); // Show toast only if deletion is successful
        loader(70);
      } else {
        console.error("Unable to Delete Feedback"); // Handle potential errors
      }
    } catch (error) {
      console.clear();
      console.log(error);
    }
    loader(100);
  }

  const handleCellClick = (id) => {
    setClickedCell(clickedCell === id ? null : id);
  };

  let columns = [
    {
      name: "S.No",
      cell: (row, index) => index + 1,
      sortable: false,
      width: "100px",
    },
    {
      name: "User Type",
      selector: (row) => row.userType,
      sortable: true,
    },
    {
      name: "UserName",
      selector: (row) => row.userName,
    },
    {
      name: "Message",
      selector: (row) => row.message,
      cell: (row) => (
        <div onClick={() => handleCellClick(row.id)}>
          {clickedCell === row.id
            ? row.message
            : row.message.substring(0, 20) + "..."}
        </div>
      ),
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <button
            className="btn btn-outline-danger badge-pill text-end "
            onClick={() => deleteFeedback(row.id)}
          >
            Delete Feedback
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="container-fluid  table-style">
      <h1 className="text-center mb-0 pt-2 table-heading">All Patients</h1>
      <Table columns={columns} data={feedbacks} user={"adminPatient"} />
    </div>
  );
}
