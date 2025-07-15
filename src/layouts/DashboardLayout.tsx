'use client';
import React, { ReactNode } from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import Sidebar from '@/components/Sidebar';

interface Props {
  children: ReactNode;
  onSelect: (module: string) => void;
  selected: string;
}

const DashboardLayout: React.FC<Props> = ({ children, onSelect, selected }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar onSelect={onSelect} selected={selected} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;