import React, { useState, useEffect } from "react";

function Appointment() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8080/getappointments");
      const data = await response.json();
      setAppointments(data);
    };
    fetchData();
  }, []);

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const newAppointments = [...appointments];
    newAppointments[index][name] = value;
    setAppointments(newAppointments);
  };

  const handleEditClick = async (appointment) => {
    const response = await fetch(`http://localhost:8080/editappointment`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointment),
    });
    const data = await response.json();
    setAppointments((prevState) => {
      return prevState.map((p) => (p.id === data.id ? data : p));
    });
  };

  const handleSomeClick = async (appointment) => {
    const response = await fetch(`http://localhost:8080/editappointment`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointment),
    });
    const data = await response.json();
    setAppointments((prevState) => {
      return prevState.map((p) => (p.id === data.id ? data : p));
    });
  };

  const handleDeleteClick = async (appointment) => {
    const response = await fetch(
      `http://localhost:8080/deleteappointmentbyid/${appointment.id}`,
      {
        method: "DELETE",
      }
    );
    if (response.status === 204) {
      setAppointments((prevState) => {
        return prevState.filter((p) => p.id !== appointment.id);
      });
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Specialist</th>
          <th>Doctor's Full Name</th>
          <th>Diagnosis</th>
          <th>Complaints</th>
          <th>Patient ID</th>
          <th>Date of Visit</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {appointments.map((appointment, index) => (
          <tr key={appointment.id}>
            <td>{appointment.id}</td>
            <td>
              <input
                type="text"
                name="specialist"
                value={appointment.specialist}
                onChange={(event) => handleInputChange(event, index)}
              />
            </td>
            <td>
              <input
                type="text"
                name="doctorFullName"
                value={appointment.doctorFullName}
                onChange={(event) => handleInputChange(event, index)}
              />
            </td>
            <td>
              <input
                type="text"
                name="diagnosis"
                value={appointment.diagnosis}
                onChange={(event) => handleInputChange(event, index)}
              />
            </td>
            <td>
              <input
                type="text"
                name="complaints"
                value={appointment.complaints}
                onChange={(event) => handleInputChange(event, index)}
              />
            </td>
            <td>
              <input
                type="text"
                name="pat_id"
                value={appointment.pat_id}
                onChange={(event) => handleInputChange(event, index)}
              />
            </td>
            <td>
              <input
                type="text"
                name="date_of_visit"
                value={appointment.date_of_visit}
                onChange={(event) => handleInputChange(event, index)}
              />
            </td>
            <td>
              <button onClick={() => handleEditClick(appointment)}>Edit</button>
            </td>
            <td>
              <button onClick={() => handleDeleteClick(appointment)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Appointment;
