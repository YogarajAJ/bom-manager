
'use client';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { addItem, updateItem } from '@/services/api.factory';
import { moduleFields } from '@/constants/moduleFields';

interface Props {
  open: boolean;
  onClose: () => void;
  module: string;
  editItem: any | null;
}

const AddEditDialog: React.FC<Props> = ({ open, onClose, module, editItem }) => {
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    if (editItem) setForm(editItem);
    else setForm(Object.fromEntries((moduleFields[module] || []).map(f => [f.name, ''])));
  }, [editItem, module]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (editItem) {
      await updateItem(module, editItem.id, form);
    } else {
      await addItem(module, form);
    }
    onClose();
  };

  const fields = moduleFields[module] || [];

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{editItem ? 'Edit' : 'Add'} {module.toUpperCase()}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          {fields.map(({ name, label }) => (
            <TextField
              key={name}
              name={name}
              label={label}
              value={form[name] || ''}
              onChange={handleChange}
              size="small"
              fullWidth
            />
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditDialog;