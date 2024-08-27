import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//Views
import Home from './views/Home';
//Servicios
import WebDevelopment from './views/servicesViews/WebDevelopment';

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/desarrollo-web" element={<WebDevelopment />} />
        <Route path="/desarrollo-movil" element={<Home />} />
        <Route path="/cursos-online" element={<Home />} />
        <Route path="/ciber-seguridad" element={<Home />} />
        <Route path="/marketing" element={<Home />} />
        <Route path="/gg-casino" element={<Home />} />

      </Routes>
    </Router>
  );
}

export default App;
