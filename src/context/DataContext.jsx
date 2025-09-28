// context/DataContext.js
import React, { createContext, useContext, useState, useMemo } from 'react';

// Dummy data
const dummyStats = [
  {
    title: 'Total Revenue',
    value: '$54,239',
    change: 12.5,
    period: 'Since last month',
    icon: 'fas fa-dollar-sign',
    color: 'text-green-500'
  },
  {
    title: 'New Users',
    value: '2,348',
    change: 8.2,
    period: 'Since last week',
    icon: 'fas fa-users',
    color: 'text-blue-500'
  },
  {
    title: 'Orders',
    value: '1,236',
    change: -2.1,
    period: 'Since yesterday',
    icon: 'fas fa-shopping-cart',
    color: 'text-purple-500'
  },
  {
    title: 'Conversion Rate',
    value: '4.8%',
    change: 3.7,
    period: 'Since last month',
    icon: 'fas fa-chart-line',
    color: 'text-orange-500'
  }
];

const generateChartData = (dateRange, status) => {
  // Filter logic for charts based on date range
  let labels, revenueData, profitData, usersData, newUsersData;
  
  switch(dateRange) {
    case 'today':
      labels = ['12AM', '3AM', '6AM', '9AM', '12PM', '3PM', '6PM', '9PM'];
      revenueData = [2000, 3500, 2800, 4500, 6000, 7500, 6800, 5500];
      profitData = [1200, 2100, 1700, 2800, 3800, 4800, 4200, 3400];
      usersData = [150, 220, 180, 280, 350, 420, 380, 320];
      newUsersData = [80, 120, 100, 150, 180, 210, 190, 160];
      break;
    case 'last7':
      labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      revenueData = [12000, 15000, 18000, 22000, 25000, 30000, 28000];
      profitData = [8000, 10000, 12000, 15000, 17000, 20000, 19000];
      usersData = [450, 520, 580, 650, 720, 800, 750];
      newUsersData = [320, 380, 420, 480, 520, 590, 540];
      break;
    case 'last30':
    default:
      labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
      revenueData = [45000, 52000, 48000, 55000];
      profitData = [28000, 32000, 30000, 35000];
      usersData = [1800, 2100, 1900, 2200];
      newUsersData = [1200, 1400, 1300, 1500];
      break;
    case 'last90':
      labels = ['Month 1', 'Month 2', 'Month 3'];
      revenueData = [150000, 165000, 180000];
      profitData = [95000, 105000, 115000];
      usersData = [5500, 6000, 6500];
      newUsersData = [3800, 4200, 4500];
      break;
  }

  return {
    lineData: {
      labels,
      datasets: [
        {
          label: 'Revenue',
          data: revenueData,
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          fill: true
        },
        {
          label: 'Profit',
          data: profitData,
          borderColor: 'rgb(16, 185, 129)',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          tension: 0.4,
          fill: true
        }
      ]
    },
    barData: {
      labels,
      datasets: [
        {
          label: 'Active Users',
          data: usersData,
          backgroundColor: 'rgba(139, 92, 246, 0.7)',
          borderColor: 'rgb(139, 92, 246)',
          borderWidth: 1
        },
        {
          label: 'New Users',
          data: newUsersData,
          backgroundColor: 'rgba(59, 130, 246, 0.7)',
          borderColor: 'rgb(59, 130, 246)',
          borderWidth: 1
        }
      ]
    },
    doughnutData: {
      labels: ['Direct', 'Social', 'Referral', 'Organic'],
      datasets: [
        {
          data: [35, 25, 20, 20],
          backgroundColor: [
            'rgba(59, 130, 246, 0.7)',
            'rgba(139, 92, 246, 0.7)',
            'rgba(16, 185, 129, 0.7)',
            'rgba(245, 158, 11, 0.7)'
          ],
          borderColor: [
            'rgb(59, 130, 246)',
            'rgb(139, 92, 246)',
            'rgb(16, 185, 129)',
            'rgb(245, 158, 11)'
          ],
          borderWidth: 1
        }
      ]
    }
  };
};

const dummyTableData = [
  { id: '#TRX001', customer: 'John Smith', email: 'john@example.com', date: '2023-06-15', amount: 245.99, status: 'Completed' },
  { id: '#TRX002', customer: 'Sarah Johnson', email: 'sarah@example.com', date: '2023-06-14', amount: 120.50, status: 'Pending' },
  { id: '#TRX003', customer: 'Michael Brown', email: 'michael@example.com', date: '2023-06-14', amount: 89.99, status: 'Completed' },
  { id: '#TRX004', customer: 'Emily Davis', email: 'emily@example.com', date: '2023-06-13', amount: 210.00, status: 'Failed' },
  { id: '#TRX005', customer: 'Robert Wilson', email: 'robert@example.com', date: '2023-06-12', amount: 156.75, status: 'Completed' },
  { id: '#TRX006', customer: 'Jennifer Lee', email: 'jennifer@example.com', date: '2023-06-11', amount: 299.99, status: 'Completed' },
  { id: '#TRX007', customer: 'David Miller', email: 'david@example.com', date: '2023-06-10', amount: 75.25, status: 'Pending' },
  { id: '#TRX008', customer: 'Amanda Taylor', email: 'amanda@example.com', date: '2023-06-09', amount: 180.50, status: 'Completed' },
  { id: '#TRX009', customer: 'Christopher Anderson', email: 'chris@example.com', date: '2023-06-08', amount: 320.00, status: 'Completed' },
  { id: '#TRX010', customer: 'Jessica Martinez', email: 'jessica@example.com', date: '2023-06-07', amount: 95.99, status: 'Failed' }
];

// Create context
const DataContext = createContext();

// Provider component
export const DataProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    dateRange: 'last30',
    status: 'all'
  });

  const updateFilters = (newFilters) => {
    setFilters(newFilters);
  };

  // Filter table data based on status
  const filteredTableData = useMemo(() => {
    if (filters.status === 'all') {
      return dummyTableData;
    }
    return dummyTableData.filter(item => 
      item.status.toLowerCase() === filters.status.toLowerCase()
    );
  }, [filters.status]);

  // Generate chart data based on date range
  const chartData = useMemo(() => {
    return generateChartData(filters.dateRange, filters.status);
  }, [filters.dateRange, filters.status]);

  // Update stats based on filters
  const filteredStats = useMemo(() => {
    let revenue, users, orders, conversion;
    
    switch(filters.dateRange) {
      case 'today':
        revenue = '$1,850'; users = '245'; orders = '189'; conversion = '5.2%';
        break;
      case 'last7':
        revenue = '$15,200'; users = '1,250'; orders = '890'; conversion = '4.9%';
        break;
      case 'last30':
      default:
        revenue = '$54,239'; users = '2,348'; orders = '1,236'; conversion = '4.8%';
        break;
      case 'last90':
        revenue = '$148,500'; users = '6,800'; orders = '3,450'; conversion = '4.6%';
        break;
    }

    return [
      { ...dummyStats[0], value: revenue },
      { ...dummyStats[1], value: users },
      { ...dummyStats[2], value: orders },
      { ...dummyStats[3], value: conversion }
    ];
  }, [filters.dateRange]);

  return (
    <DataContext.Provider value={{
      stats: filteredStats,
      chartData,
      tableData: filteredTableData,
      filters,
      updateFilters
    }}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to use data
export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};