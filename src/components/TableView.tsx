'use client';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AddEditDialog from './AddEditDialog';
import { fetchAllItems, deleteItem } from '@/services/api.factory';
import { useRouter } from 'next/navigation';

interface Props {
  module: string;
}

const TableView: React.FC<Props> = ({ module }) => {
  const [rows, setRows] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editItem, setEditItem] = useState<any | null>(null);
  const [userName, setUserName] = useState('');
  const router = useRouter();

  const loadData = async () => {
    const data = await fetchAllItems(module);
    setRows(data);
  };

  useEffect(() => {
    if (module) loadData();
    const storedName = localStorage.getItem('username') || 'User';
    setUserName(storedName);
  }, [module]);

  const handleDelete = async (id: string) => {
    await deleteItem(module, id);
    loadData();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    router.replace('/login');
  };

  const headers = rows[0]
    ? Object.keys(rows[0]).filter(
      (k) =>
        !['__v', 'id', 'bomId', 'materialId', 'unitId', 'supplierId', 'productId'].includes(k)
    )
    : [];

  const formatHeader = (key: string) => {
    switch (key) {
      case 'bom':
        return 'BOM Name';
      case 'material':
        return 'Material';
      case 'unit':
        return 'Unit';
      case 'supplier':
        return 'Supplier';
      case 'referenceCode':
        return 'Reference Code';
      case 'product':
        return 'Product Name';
      default:
        return key.charAt(0).toUpperCase() + key.slice(1);
    }
  };

  return (
    <Box>
      {/* Top App Bar with Welcome + Logout */}
      <AppBar position="static" color="inherit" elevation={1} sx={{ mb: 2 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            color="primary"
            sx={{ fontSize: '1rem' }}
          >
            👋 Welcome, <span style={{ color: '#1976d2' }}>{userName}</span>
          </Typography>
          <IconButton color="error" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Page Title and Add Button */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight={600} textTransform="capitalize">
          {module.replace('-', ' ')} Management
        </Typography>
        <Button variant="contained" onClick={() => { setEditItem(null); setOpen(true); }}>
          Add {module.toUpperCase()}
        </Button>
      </Box>

      {/* Data Table */}
      <TableContainer component={Paper} elevation={2}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {headers.map((h) => (
                <TableCell key={h} sx={{ fontWeight: 'bold' }}>
                  {formatHeader(h)}
                </TableCell>
              ))}
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} hover>
                {headers.map((h) => (
                  <TableCell key={h}>
                    {(() => {
                      const val = row[h];
                      if (typeof val === 'object' && val !== null) {
                        return val.name || val.code || '[object]';
                      }

                      // Try to parse as a date
                      const isDate = typeof val === 'string' && !isNaN(Date.parse(val));
                      if (isDate) {
                        return new Date(val).toLocaleString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        });
                      }

                      return val;
                    })()}
                  </TableCell>

                ))}
                <TableCell>
                  <Button size="small" onClick={() => { setEditItem(row); setOpen(true); }}>
                    Edit
                  </Button>
                  <Button size="small" color="error" onClick={() => handleDelete(row.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <AddEditDialog
        open={open}
        onClose={() => { setOpen(false); loadData(); }}
        module={module}
        editItem={editItem}
      />
    </Box>
  );
};

export default TableView;
