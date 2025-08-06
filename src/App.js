import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Goals from './pages/Goals';
import Calendar from './pages/Calendar';
import Settings from './pages/Settings';
import LoginPage from './pages/LoginPage';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Set to false if you want login functionality
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!isLoggedIn) {
    return <LoginPage setIsLoggedIn={setIsLoggedIn} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
          <div className="p-8">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                  Welcome to FocusMate
                </h1>
                <p className="text-gray-600 text-lg">
                  Stay focused, achieve your goals, and track your progress.
                </p>
              </div>
              
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/goals" element={<Goals />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;