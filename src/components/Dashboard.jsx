// components/Dashboard.js
import React from 'react';
import StatsCards from './StatsCards';
import Charts from './Charts';
import DataTable from './DataTable';
import Filters from './Filters';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <StatsCards />
      <Filters />
      <Charts />
      <DataTable />
    </div>
  );
};

export default Dashboard;