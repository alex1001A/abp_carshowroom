import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import CarDetails from './components/CarDetails';

export default function App() {
  return (
    <Routes>
      <Route path="/vehicles" element={<Home />} />
      <Route path="/vehicles/:vehicleId" element={<CarDetails />} />
    </Routes>
  );
}