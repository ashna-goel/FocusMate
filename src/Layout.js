import React, { useState } from 'react';
import Sidebar from './pages/Sidebar';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main
        className={`transition-all duration-300 w-full ${
          isSidebarOpen ? 'ml-64' : 'ml-16'
        } p-6`}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
