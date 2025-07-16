'use client';

import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Box, Toolbar } from '@mui/material';
import TableView from '@/components/TableView';

const AdminDashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState('products');

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'Admin') {
      localStorage.setItem('role', 'Admin');
    }
  }, []);

  return (
    <Box display="flex">
      {/* Left Sidebar */}
      <Sidebar selected={selectedMenu} onSelect={setSelectedMenu} />

      {/* Right Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <TableView module={selectedMenu} />
      </Box>
    </Box>
  );
};

export default AdminDashboard;
