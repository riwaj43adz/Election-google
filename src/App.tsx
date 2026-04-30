import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import LandingPage from './pages/LandingPage';
import VotingSimulator from './pages/VotingSimulator';
import MapView from './pages/MapView';
import Dashboard from './pages/Dashboard';
import Learn from './pages/Learn';

const App: React.FC = () => {
  return (
    <Router basename="/Election-google">
      <div className="min-h-screen">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/simulator" element={<VotingSimulator />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/learn" element={<Learn />} />
          </Routes>
        </main>
        
        <footer className="py-12 border-t border-white/5 text-center mt-12">
          <p className="text-gray-500 text-sm">
            © 2026 ElectiVate. Built with <span className="text-google-blue">G</span><span className="text-google-red">o</span><span className="text-google-yellow">o</span><span className="text-google-blue">g</span><span className="text-google-green">l</span><span className="text-google-red">e</span> Technologies.
          </p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
