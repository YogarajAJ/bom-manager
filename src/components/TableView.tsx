
'use client';
import {
  Box,
  Button,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchAllItems, deleteItem } from '@/services/api.factory';
import AddEditDialog from './AddEditDialog';

interface Props {
  module: string;
}

const TableView: React.FC<Props> = ({ module }) => {
  const [data, setData] = useState<any[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editItem, setEditItem] = useState<any | null>(null);

  const loadData = async () => {
    try {
      const result = await fetchAllItems(module.toLowerCase());
      setData(result);
    } catch (err) {
      console.error('Load error', err);
    }
  };

  useEffect(() => {
    loadData();
  }, [module]);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h6">{module} Management</Typography>
        <Button variant="contained" onClick={() => setOpenDialog(true)}>
          Add {module}
        </Button>
      </Box>

      <Table size="small">
        <TableHead>
          <TableRow>
            {Object.keys(data?.[0] || {}).map((key) => (
              <TableCell key={key}>{key}</TableCell>
            ))}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              {Object.values(row).map((val, idx) => (
                <TableCell key={idx}>{val}</TableCell>
              ))}
              <TableCell>
                <Button size="small" onClick={() => { setEditItem(row); setOpenDialog(true); }}>Edit</Button>
                <Button size="small" color="error" onClick={async () => { await deleteItem(module.toLowerCase(), row.id); loadData(); }}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AddEditDialog
        open={openDialog}
        onClose={() => { setOpenDialog(false); setEditItem(null); loadData(); }}
        module={module}
        editItem={editItem}
      />
    </Box>
  );
};

export default TableView;