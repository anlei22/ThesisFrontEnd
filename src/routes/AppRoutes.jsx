
import React, { useState, useEffect } from 'react';
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'

import { Routes, Route } from 'react-router-dom'


import Dashboard from '../pages/Admin/AdminDashboard'
import Register from "../components/Register"; 
import MainBoard from '../pages/User/Mainboard';
import SharedPostView from '../pages/User/UserUI/SharedPostView'; 
import ProfileViewPage from '../pages/User/UserUI/ProfileViewPage';




function App() {
  const [darkMode, setDarkMode] = useState(false); 

  return (
    <Routes>
      <Route path="/" element={<MainBoard />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/:username/:id" element={<SharedPostView darkMode={darkMode} />} />
      <Route path="/profile/:username" element={<ProfileViewPage darkMode={darkMode} />} /> {/* ✅ NEW ROUTE */}
   
    </Routes>
  );
}


export default App;



