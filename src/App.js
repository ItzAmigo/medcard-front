import React from "react";
import Home from "./pages/Home";
import Appointment from "./pages/Appointment";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/appointment" element={<Appointment />} />
    </Routes>
  </BrowserRouter>
);

export default App;
