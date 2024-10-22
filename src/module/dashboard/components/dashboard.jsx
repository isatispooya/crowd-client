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
      icon: <InsertDriveFileIcon style={{ fontSize: '2.5rem' }} color="primary" />,
    },
    {
      title: 'تعداد طرح های فعال',
      value: dashbord['active plan'],
      icon: <AssignmentTurnedInIcon style={{ fontSize: '2.5rem' }} color="error" />,
    },
    {
      title: 'تعداد مشارکت فعال',
      value: dashbord['participant plan'],
      icon: <PeopleIcon style={{ fontSize: '2.5rem' }} color="secondary" />,
    },
    {
      title: 'مبلغ مشارکت کاربر',
      value: formatNumber(dashbord['total value']),
      icon: <MonetizationOnIcon style={{ fontSize: '2.5rem' }} color="success" />,
    },
    {
      title: 'سود',
      value: `${dashbord['all rate of return']}%`,
      icon: <TrendingUpIcon style={{ fontSize: '2.5rem' }} color="warning" />,
    },
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-4">
        {DashCards.map((item, index) => (
          <motion.div
            key={index}
            className="relative bg-white shadow-md p-4 rounded-lg flex flex-col justify-center h-48 hover:shadow-xl transition-shadow duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="absolute top-2 right-2">{item.icon}</div>
            <h2 className="text-lg font-semibold mb-1 text-gray-800 text-center">{item.title}</h2>
            <p className="text-2xl font-medium text-gray-700 text-center">{item.value}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="shadow-md bg-gray-50 p-4 rounded-lg"
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
