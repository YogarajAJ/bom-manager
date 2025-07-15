
'use client';
import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import TableView from './TableView';

const Dashboard = () => {
  const [activeModule, setActiveModule] = useState('');

  useEffect(() => {
    const role = localStorage.getItem('role');
    setActiveModule(role === 'Admin' ? 'product' : 'bom');
  }, []);

  return (
    <DashboardLayout onSelect={setActiveModule} selected={activeModule}>
      {activeModule && <TableView key={activeModule} module={activeModule} />}
    </DashboardLayout>
  );
};

export default Dashboard;
