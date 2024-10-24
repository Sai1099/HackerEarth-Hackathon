import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MeetingProvider } from './contexts/MeetingContext';
import MeetingRoom from './components/MeetingRoom';
import Settings from './components/Settings';
import Navigation from './components/Navigation';

const App = () => {
  return (
    <Router>
      <MeetingProvider>
        <div className="min-h-screen bg-gray-100">
          <Navigation />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<MeetingRoom />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </MeetingProvider>
    </Router>
  );
};

export default App;