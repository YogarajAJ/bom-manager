'use client';

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';
import { getBomItemsByBomId, getBomsByProduct } from '@/services/boms.service';

interface Props {
  productId: string;
}

const BOMManagement: React.FC<Props> = ({ productId }) => {
  const [boms, setBoms] = useState<any[]>([]);
  const [selectedBomId, setSelectedBomId] = useState<string | null>(null);
  const [bomItems, setBomItems] = useState<Record<string, any[]>>({});

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getBomsByProduct(productId);
        const list = Array.isArray(res) ? res : res.data || [];
        setBoms(list);
      } catch (err) {
        console.error('Failed to fetch BOMs', err);
        setBoms([]);
      }
    };

    if (productId) load();
  }, [productId]);

  const loadBomItems = async (bomId: string) => {
    try {
      const res = await getBomItemsByBomId(bomId);
      const list = Array.isArray(res) ? res : res.data || [];
      setBomItems((prev) => ({ ...prev, [bomId]: list }));
    } catch (err) {
      console.error('Failed to load BOM items', err);
    }
  };

  const handleExpand = (bomId: string) => {
    setSelectedBomId((prev) => (prev === bomId ? null : bomId));
    if (!bomItems[bomId]) loadBomItems(bomId);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h6">BOMs for Selected Product</Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Add BOM
        </Button>
      </Box>

      {boms.map((bom) => (
        <Accordion
          key={bom.id}
          expanded={selectedBomId === bom.id}
          onChange={() => handleExpand(bom.id)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight={600}>
              {bom.name} — Rev {bom.revision}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="subtitle1">BOM Items</Typography>
              <Button variant="outlined" size="small" startIcon={<AddIcon />}>
                Add BOM Item
              </Button>
            </Box>

            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Material</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Unit</TableCell>
                  <TableCell>Supplier</TableCell>
                  <TableCell>Reference Code</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(bomItems[bom.id] || []).map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.material?.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.unit?.name}</TableCell>
                    <TableCell>{item.supplier?.name}</TableCell>
                    <TableCell>{item.referenceCode}</TableCell>
                    <TableCell>
                      <Tooltip title="Edit">
                        <IconButton size="small">
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton size="small" color="error">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default BOMManagement;
