// components/Filters.js
import React, { useState } from 'react';
import { useData } from '../context/DataContext';

const Filters = () => {
  const { filters, updateFilters } = useData();
  const [localFilters, setLocalFilters] = useState(filters);

  const handleFilterChange = (key, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const applyFilters = () => {
    updateFilters(localFilters);
  };

  const resetFilters = () => {
    const defaultFilters = { dateRange: 'last30', status: 'all' };
    setLocalFilters(defaultFilters);
    updateFilters(defaultFilters);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Filters
        </h3>
        
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div>
            <label htmlFor="date-range" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Date Range
            </label>
            <select
              id="date-range"
              value={localFilters.dateRange}
              onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="today">Today</option>
              <option value="last7">Last 7 Days</option>
              <option value="last30">Last 30 Days</option>
              <option value="last90">Last 90 Days</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status
            </label>
            <select
              id="status"
              value={localFilters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          
          <div className="flex items-end space-x-2">
            <button 
              onClick={applyFilters}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Apply Filters
            </button>
            <button 
              onClick={resetFilters}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      
      {/* Active filters display */}
      <div className="mt-4 flex flex-wrap gap-2">
        {localFilters.dateRange !== 'last30' && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
            Date: {localFilters.dateRange === 'today' ? 'Today' : 
                   localFilters.dateRange === 'last7' ? 'Last 7 Days' : 
                   localFilters.dateRange === 'last90' ? 'Last 90 Days' : ''}
            <button 
              onClick={() => handleFilterChange('dateRange', 'last30')}
              className="ml-1.5 inline-flex items-center justify-center w-3 h-3 rounded-full hover:bg-blue-200 dark:hover:bg-blue-700"
            >
              ×
            </button>
          </span>
        )}
        {localFilters.status !== 'all' && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
            Status: {localFilters.status}
            <button 
              onClick={() => handleFilterChange('status', 'all')}
              className="ml-1.5 inline-flex items-center justify-center w-3 h-3 rounded-full hover:bg-green-200 dark:hover:bg-green-700"
            >
              ×
            </button>
          </span>
        )}
      </div>
    </div>
  );
};

export default Filters;