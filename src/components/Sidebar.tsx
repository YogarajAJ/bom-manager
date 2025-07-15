
'use client';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { menuOptions } from '@/constants/moduleFields';

const drawerWidth = 240;

interface Props {
  selected: string;
  onSelect: (val: string) => void;
}

const Sidebar: React.FC<Props> = ({ selected, onSelect }) => {
  const [role, setRole] = useState<string>('Admin');

  useEffect(() => {
    const userRole = localStorage.getItem('role') || 'Admin';
    setRole(userRole);
  }, []);

  const menuItems = menuOptions[role] || [];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          bgcolor: '#f9f9f9',
          borderRight: '1px solid #e0e0e0',
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" fontWeight={600}>BOM Manager</Typography>
      </Toolbar>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              selected={item === selected}
              onClick={() => onSelect(item)}
              sx={{
                '&.Mui-selected': {
                  bgcolor: '#e3f2fd',
                  color: '#1976d2',
                  fontWeight: 'bold',
                },
                '&:hover': {
                  bgcolor: '#f1f1f1',
                },
              }}
            >
              <ListItemText
                primary={item.replace('-', ' ').toUpperCase()}
                primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
