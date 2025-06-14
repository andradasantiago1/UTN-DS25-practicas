import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout'; 
import HomePage from './pages/HomePage';
import CienciaFiccionPage from './pages/CienciaFiccionPage.jsx';
import HistoriaPage from './pages/HistoriaPage';
import NovelasPage from './pages/NovelasPage';
import FantasiaPage from './pages/FantasiaPage';
import RegistracionPage from './pages/RegistracionPage';
import ContactoPage from './pages/ContactoPage';

function App() {
  return (
    <Layout> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ciencia-ficcion" element={<CienciaFiccionPage />} />
        <Route path="/historia" element={<HistoriaPage />} />
        <Route path="/novelas" element={<NovelasPage />} />
        <Route path="/fantasia" element={<FantasiaPage />} />
        <Route path="/registracion" element={<RegistracionPage />} />
        <Route path="/contacto" element={<ContactoPage />} />
      </Routes>
    </Layout>
  );
}
export default App;
