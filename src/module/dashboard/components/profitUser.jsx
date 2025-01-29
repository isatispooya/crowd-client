import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeftCircle } from 'react-icons/fi';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, IconButton } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const ProfitUser = ({ dashbord }) => {
  const { profit } = dashbord;
  const navigate = useNavigate();

const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'Peyda',
    allVariants: {
      fontFamily: 'Peyda',
    }
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          fontFamily: 'Peyda',
          '& .MuiDataGrid-cell': {
            fontFamily: 'Peyda',
          },
          '& .MuiDataGrid-columnHeaders': {
            fontFamily: 'Peyda',
          }
        }
      }
    }
  }
});

  const handleNavigate = (traceCode) => navigate(`/plan/${traceCode}`);

  const columns = [
    {
      field: 'amount',
      headerName: 'مبلغ',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => `${params.value.toLocaleString()} ریال`,
    },
    {
      field: 'date',
      headerName: 'تاریخ سررسید',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => params.value?.replace(/-/g, '/'),
    },
    {
      field: 'type',
      headerName: 'نوع',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (params.value === '1' ? 'اصل مشارکت' : 'پیش‌بینی سود'),
    },
    {
      field: 'plan_name',
      headerName: 'طرح',
      flex: 2,
      minWidth: 200,
      renderCell: (params) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Typography>{params.value}</Typography>
          <IconButton onClick={() => handleNavigate(params.row.trace_code)}>
            <FiArrowLeftCircle className="text-xl text-blue-600" />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ width: '100%', textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        گزارش پیش‌بینی مشارکت در طرح‌ها
      </Typography>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            height: 400,
            width: '80%',
            mx: 'auto',
            boxShadow: 3,
            borderRadius: 2,
            p: 2,
            bgcolor: 'white',
          }}
        >
          <DataGrid
            rows={profit?.map((item, index) => ({ id: index, ...item })) || []}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            localeText={{
              noRowsLabel: 'گزارشی موجود نیست',
              MuiTablePagination: {
                labelRowsPerPage: 'تعداد ردیف در هر صفحه:',
                labelDisplayedRows: ({ from, to, count }) =>
                  `${from}-${to} از ${count !== -1 ? count : `بیش از ${to}`}`,
              },
            }}
            componentsProps={{
              pagination: {
                labelRowsPerPage: 'تعداد ردیف در هر صفحه',
                dir: 'rtl',
              },
            }}
          />
        </Box>
      </ThemeProvider>
    </Box>
  );
};

ProfitUser.propTypes = {
  dashbord: PropTypes.object.isRequired,
};

export default ProfitUser;
