
import React, { useState, useEffect } from 'react';
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'

import { Routes, Route } from 'react-router-dom'


import Dashboard from '../pages/Admin//AdminDashboard'
import Register from "../components/Register"; // ✅ adjust path
import MainBoard from '../pages/User/Mainboard';




function App() {
  return (
    <Routes>
      <Route path="/" element={<MainBoard />} />
      <Route path="/register" element={<Register />} />
      <Route path="/Admin/Dashboard" element={<Dashboard />} />


    </Routes>
  );
}


export default App;

