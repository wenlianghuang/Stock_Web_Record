import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ScrollImagePage from './pages/ContinuePage';
import StockListPage from './pages/StockListPage';
import Fundamental_Analysis from './pages/Fundamental_Analysis';
import './styles/App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Dashboard>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/page2" element={<ScrollImagePage />} />
          <Route path="/stocklist" element={<StockListPage />} />
          <Route path='/Fundamental_Analysis' element={<Fundamental_Analysis />} />
        </Routes>
      </Dashboard>
    </Router>
  );
};

export default App;
