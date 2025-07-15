
'use client';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
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
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton selected={item === selected} onClick={() => onSelect(item)}>
              <ListItemText primary={item.replace('-', ' ').toUpperCase()} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
