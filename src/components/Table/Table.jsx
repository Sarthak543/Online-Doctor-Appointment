import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

export default function Table({ columns, data, title }) {
  const [filteredAppointment, setfilteredAppointment] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setfilteredAppointment(data);
  }, [data]);

  useEffect(() => {
    const Result = data.filter((appointment) => {
      return appointment.doctorName.toLowerCase().match(search.toLowerCase());
    });
    setfilteredAppointment(Result);
  }, [search]);

  const tableStyle = {
    headCells: {
      style: {
        fontFamily: "Archivo Narrow, sans-serif",
        fontOpticalSizing: "auto",
        fontWeight: "bold",
        fontSize: "20px",
        fontStyle: "normal",
        color: "grey",
      },
    },
    cells: {
      style: {
        fontFamily: "Archivo Narrow, sans-serif",
        fontOpticalSizing: "auto",
        fontSize: "15px",
        fontStyle: "normal",
        margin: "auto auto",
        padding: "5px 20px",
      },
    },
    pagination: {
      style: {
        border: "none",
      },
    },
  };

  return (
    <DataTable
      columns={columns}
      data={filteredAppointment}
      pagination
      highlightOnHover
      subHeader
      subHeaderAlign="right"
      subHeaderComponent={
        <input
          className="w-25 form-control"
          type="text"
          placeholder="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
      }
      customStyles={tableStyle}
    />
  );
}
