import React, { useState, useEffect } from "react";

function Home() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8080/getpatients");
      const data = await response.json();
      setPatients(data);
    };
    fetchData();
  }, []);

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const newPatients = [...patients];
    newPatients[index][name] = value;
    setPatients(newPatients);
  };

  const handleEditClick = async (patient) => {
    const response = await fetch(`http://localhost:8080/editpatient`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patient),
    });
    const data = await response.json();
    setPatients((prevState) => {
      return prevState.map((p) => (p.id === data.id ? data : p));
    });
  };

  const handleDeleteClick = async (patient) => {
    const response = await fetch(
      `http://localhost:8080/deletepatientbyid/${patient.id}`,
      {
        method: "DELETE",
      }
    );
    if (response.status === 204) {
      setPatients((prevState) => {
        return prevState.filter((p) => p.id !== patient.id);
      });
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>IIN</th>
          <th>Full Name</th>
          <th>Address</th>
          <th>Number</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {patients.map((patient, index) => (
          <tr key={patient.id}>
            <td>{patient.id}</td>
            <td>
              <input
                type="text"
                name="iin"
                value={patient.iin}
                onChange={(event) => handleInputChange(event, index)}
              />
            </td>
            <td>
              <input
                type="text"
                name="fullName"
                value={patient.fullName}
                onChange={(event) => handleInputChange(event, index)}
              />
            </td>
            <td>
              <input
                type="text"
                name="address"
                value={patient.address}
                onChange={(event) => handleInputChange(event, index)}
              />
            </td>
            <td>
              <input
                type="text"
                name="number"
                value={patient.number}
                onChange={(event) => handleInputChange(event, index)}
              />
            </td>
            <td>
              <button onClick={() => handleEditClick(patient)}>Edit</button>
            </td>
            <td>
              <button onClick={() => handleDeleteClick(patient)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Home;
