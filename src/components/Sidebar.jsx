// components/Sidebar.js
import React from 'react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { id: 1, name: 'Dashboard', icon: 'fas fa-tachometer-alt', active: true },
    { id: 2, name: 'Analytics', icon: 'fas fa-chart-bar' },
    { id: 3, name: 'Users', icon: 'fas fa-users' },
    { id: 4, name: 'Products', icon: 'fas fa-box' },
    { id: 5, name: 'Orders', icon: 'fas fa-shopping-cart' },
    { id: 6, name: 'Settings', icon: 'fas fa-cog' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-30 
        w-64 bg-white dark:bg-gray-800 
        transform transition duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        flex flex-col
      `}>
        <div className="flex items-center justify-center h-16 px-4 bg-blue-600 dark:bg-blue-700">
          <h1 className="text-xl font-bold text-white">Carte<span className='text-green-200'>SA</span></h1>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          {menuItems.map(item => (
            <a
              key={item.id}
              href="#"
              className={`flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${item.active ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : ''}`}
            >
              <i className={`${item.icon} mr-3`}></i>
              <span>{item.name}</span>
            </a>
          ))}
        </nav>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
              AD
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Ahmad Ishfaq</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;