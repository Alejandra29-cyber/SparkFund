import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Páginas

import Navbar from './components/navbar.js';
import Home from './pages/Home.js';
import Donation from './pages/Donations.js'
import OpenPayments from './pages/OpenPayments.js';

export default function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Donation" element={<Donation />} />        
        <Route path="/OpenPayments" element={<OpenPayments />} />

      </Routes>
    </Router>
  );
};
