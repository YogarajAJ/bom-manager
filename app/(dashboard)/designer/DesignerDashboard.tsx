'use client';

import { Box, Typography, Toolbar, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useEffect, useState } from 'react';
import BOMManagement from './BOMManagement';
import { getAllProducts } from '@/services/product.service';

const DesignerDashboard = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string>('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getAllProducts();
        const productList = Array.isArray(res) ? res : res.data || [];

        setProducts(productList);
        if (productList.length) setSelectedProductId(productList[0].id);
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    };

    load();
  }, []);

  return (
    <Box flex={1} p={3}>
      <Toolbar />
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight={600}>Designer Dashboard</Typography>
        <FormControl size="small" sx={{ minWidth: 240 }}>
          <InputLabel>Select Product</InputLabel>
          <Select
            value={selectedProductId}
            label="Select Product"
            onChange={(e) => setSelectedProductId(e.target.value)}
          >
            {products.map((p) => (
              <MenuItem key={p.id} value={p.id}>
                {p.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {selectedProductId && (
        <BOMManagement productId={selectedProductId} />
      )}
    </Box>
  );
};

export default DesignerDashboard;
