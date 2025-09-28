// components/StatsCards.js
import React from 'react';
import { useData } from '../context/DataContext';

const StatsCards = () => {
  const { stats, filters } = useData();

  const getPeriodText = () => {
    switch(filters.dateRange) {
      case 'today': return 'Today';
      case 'last7': return 'Last 7 days';
      case 'last30': return 'Last 30 days';
      case 'last90': return 'Last 90 days';
      default: return 'Last 30 days';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div 
          key={index}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
        >
          <div className="flex items-center">
            <div className={`p-3 rounded-full ${stat.color} bg-opacity-10`}>
              <i className={`${stat.icon} text-lg ${stat.color}`}></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {stat.title}
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {stat.value}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm">
              <span className={`font-medium ${stat.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change > 0 ? '+' : ''}{stat.change}%
              </span>
              <span className="text-gray-500 dark:text-gray-400 ml-2">
                {getPeriodText()}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;