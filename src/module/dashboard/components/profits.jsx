import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const Profits = () => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'age', headerName: 'Age', width: 150 },
    { field: 'address', headerName: 'Address', width: 150 },
  ];

  const rows = [
    { id: 1, name: 'John', age: 30, address: '123 Main St' },
    { id: 2, name: 'Jane', age: 25, address: '456 Maple Ave' },
    { id: 3, name: 'Jim', age: 35, address: '789 Oak St' },
  ];

  return (
    <div>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
};

export default Profits;
