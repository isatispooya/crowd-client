import React from 'react';
import PeopleIcon from '@mui/icons-material/People';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import Loader from 'src/components/loader';
import CallMadeIcon from '@mui/icons-material/CallMade';
import { formatNumber } from 'src/utils/formatNumbers';
import { Card, Grid, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { CalendarMonthOutlined } from '@mui/icons-material';
import { motion } from 'framer-motion';
import useGetDashbord from './service/use-getDashbord';
import ProfitUser from './profitUser';
// import PieChart from './charts/pieChart';

const Dashboard = () => {
  const { data: dashbord } = useGetDashbord();

  if (!dashbord) {
    return <Loader />;
  }

  const DashCards = [
    {
      title: 'تعداد طرح ها',
      value: dashbord['all plan'],
      icon: InsertDriveFileIcon,
      color: '#4a90e2',
    },
    {
      title: 'تعداد طرح های فعال',
      value: dashbord['active plan'],
      icon: AssignmentTurnedInIcon,
      color: '#e74c3c',
    },
    {
      title: 'تعداد مشارکت فعال',
      value: dashbord['participant plan'],
      icon: PeopleIcon,
      color: '#27ae60',
    },
    {
      title: 'مبلغ مشارکت کاربر',
      value: formatNumber(dashbord['total value']),
      icon: MonetizationOnIcon,
      color: '#2980b9',
    },
    {
      title: 'پیش بینی کل سود',
      value: `${formatNumber(dashbord['all rate of return'])}ریال`,
      icon: CallMadeIcon,
      color: '#f39c12',
    },
    {
      title: 'تقویم سود',
      icon: CalendarMonthOutlined,
      color: '#27ae60',
      url: '/calender',
    },
  ];


  return (
    <div className="container mx-auto px-4">
      <Grid container spacing={2} justifyContent="left" sx={{ mb: 4 }}>
        {DashCards.map((item, index) => {
          const IconComponent = item.icon;

          return (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={4} key={index}>
              <Link to={item.url} style={{ textDecoration: 'none' }}>
                <Card
                  sx={{
                    p: 2,
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    transition: '0.3s',
                    background: `linear-gradient(135deg, ${item.color}15, ${item.color}30)`,
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      width: '240px',
                      height: '120px',
                      flexGrow: 1,
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 'bold', marginBottom: '4px', color: item.color }}
                    >
                      {item.value}
                    </Typography>

                    <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: '500' }}>
                      {item.title}
                    </Typography>
                  </Box>
                  <motion.div whileHover={{ rotate: 20 }} transition={{ duration: 0.5 }}>
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: item.color,
                        transition: 'none',
                      }}
                    >
                      <IconComponent style={{ fontSize: '2.5rem' }} />
                    </Box>
                  </motion.div>
                </Card>
              </Link>
            </Grid>
          );
        })}
      </Grid>

      <Box
        sx={{
          mt: 4,
          p: 2,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          borderRadius: '12px',
          backgroundColor: 'white',
        }}
      >
        <ProfitUser dashbord={dashbord} />
      </Box>

      {/* <PieChart data={dashbord}  /> */}
    </div>
  );
};


export default Dashboard;
