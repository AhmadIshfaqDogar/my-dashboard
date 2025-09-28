// App.js
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import { DataProvider } from './context/DataContext';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <DataProvider>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header 
            toggleDarkMode={toggleDarkMode} 
            darkMode={darkMode}
            toggleSidebar={toggleSidebar}
          />
          
          <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
            <Dashboard />
          </main>
        </div>
      </div>
    </DataProvider>
  );
}

export default App;