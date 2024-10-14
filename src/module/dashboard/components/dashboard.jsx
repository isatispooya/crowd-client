import React from 'react';
import PeopleIcon from '@mui/icons-material/People';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import Loader from 'src/components/loader';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { motion } from 'framer-motion';

import { formatNumber } from 'src/utils/formatNumbers';
import useGetDashbord from './service/use-getDashbord';
import ProfitUser from './profitUser';

const Dashboard = () => {
  const { data: dashbord } = useGetDashbord();

  if (!dashbord) {
    return <Loader />;
  }

  const DashCards = [
    {
      title: 'تعداد طرح ها',
      value: dashbord['all plan'],
      icon: <InsertDriveFileIcon style={{ fontSize: '3rem' }} color="primary" />,
    },
    {
      title: 'تعداد طرح های فعال',
      value: dashbord['active plan'],
      icon: <AssignmentTurnedInIcon style={{ fontSize: '3rem' }} color="error" />,
    },
    {
      title: 'تعداد مشارکت فعال',
      value: dashbord['participant plan'],
      icon: <PeopleIcon style={{ fontSize: '3rem' }} color="secondary" />,
    },
    {
      title: 'مبلغ مشارکت کاربر',
      value: formatNumber(dashbord['total value']),
      icon: <MonetizationOnIcon style={{ fontSize: '3rem' }} color="success" />,
    },
    {
      title: 'سود',
      value: dashbord['all rate of return'] / 100,
      icon: <TrendingUpIcon style={{ fontSize: '3rem' }} color="warning" />,
    },
  ];

  return (
    <div className="container mx-auto py-8">

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {DashCards.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-lg p-6 rounded-xl flex flex-col items-center justify-center h-64 hover:shadow-2xl transition-shadow duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="mb-4">{item.icon}</div>
            <h2 className="text-xl font-bold mb-2 text-gray-800">{item.title}</h2>
            <p className="text-3xl font-semibold text-gray-700">{item.value}</p>
          </motion.div>
        ))}
      </div>

   
      <motion.div
        className="bg-white shadow-lg p-6 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ProfitUser dashbord={dashbord} />
      </motion.div>
    </div>
  );
};

export default Dashboard;
