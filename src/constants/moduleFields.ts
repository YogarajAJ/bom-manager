
export const moduleFields: Record<string, { name: string; label: string }[]> = {
    products: [
      { name: 'name', label: 'Product Name' },
      { name: 'code', label: 'Product Code' },
      { name: 'description', label: 'Description' },
    ],
    material: [
      { name: 'name', label: 'Material Name' },
      { name: 'type', label: 'Type' },
    ],
    unit: [
      { name: 'name', label: 'Unit Name' },
      { name: 'symbol', label: 'Symbol' },
    ],
    supplier: [
      { name: 'name', label: 'Supplier Name' },
      { name: 'email', label: 'Email' },
      { name: 'phone', label: 'Phone' },
    ],
    bom: [
      { name: 'name', label: 'BOM Name' },
      { name: 'version', label: 'Version' },
    ],
    'bom-item': [
      { name: 'bomId', label: 'BOM ID' },
      { name: 'materialId', label: 'Material ID' },
      { name: 'quantity', label: 'Quantity' },
    ],
  };
  
  export const menuOptions: Record<string, string[]> = {
    Admin: ['products', 'material', 'unit', 'supplier'],
    Designer: ['bom', 'bom-item'],
  };