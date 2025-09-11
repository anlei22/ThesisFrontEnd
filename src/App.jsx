import React, { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom';

import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return <AppRoutes />;
}
