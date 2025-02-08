import React from 'react';
import PeopleIcon from '@mui/icons-material/People';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import Loader from 'src/components/loader';
import CallMadeIcon from '@mui/icons-material/CallMade';
import { formatNumber } from 'src/utils/formatNumbers';

import { Link } from 'react-router-dom';
import { CalendarMonthOutlined } from '@mui/icons-material';
import { motion } from 'framer-motion';
import useGetDashbord from './service/use-getDashbord';


const Dashboard = () => {
  const { data: dashbord } = useGetDashbord();

  if (!dashbord) {
    return <Loader />;
  }

  const DashCards = [
    {
      title: 'تعداد طرح ها',
      value: dashbord['all plan'], // Replace with `dashbord['all plan']`
      icon: InsertDriveFileIcon,
      color: '#4a90e2',

    },
    {
      title: 'تعداد طرح های فعال',
      value: dashbord['active plan'], // Replace with `dashbord['active plan']`
      icon: AssignmentTurnedInIcon,
      color: '#e74c3c',
    },

    {
      title: 'تعداد مشارکت فعال',
      value: dashbord['participant plan'], // Replace with `dashbord['participant plan']`
      icon: PeopleIcon,
      color: '#27ae60',
    },

    {
      title: 'مبلغ مشارکت کاربر',
      value: formatNumber(dashbord['total value']), // Replace with `formatNumber(dashbord['total value'])`
      icon: MonetizationOnIcon,
      color: '#2980b9',
    },

    {
      title: 'پیش بینی کل سود',
      value: formatNumber(dashbord['all rate of return']), // Replace with `formatNumber(dashbord['all rate of return'])`
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
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {DashCards.map((item, index) => {
          const IconComponent = item.icon;
          const getCardStyles = (title) => {
            switch (title) {
              case 'تعداد طرح ها':
                return {
                  gradient: 'from-blue-100 to-blue-300',
                  border: 'border-blue-500',
                  text: 'text-blue-700',
                  iconBg: 'bg-blue-500',
                  hoverScale: 1.05,
                  iconRotate: 20,
                };
              case 'تعداد طرح های فعال':
                return {
                  gradient: 'from-red-100 to-red-300',
                  border: 'border-red-500',
                  text: 'text-red-700',
                  iconBg: 'bg-red-500',
                  hoverScale: 1.05,
                  iconRotate: 20,
                };
              case 'تعداد مشارکت فعال':
                return {
                  gradient: 'from-green-100 to-green-300',
                  border: 'border-green-500',
                  text: 'text-green-700',
                  iconBg: 'bg-green-500',
                  hoverScale: 1.05,
                  iconRotate: 20,
                };
              case 'مبلغ مشارکت کاربر':
                return {
                  gradient: 'from-cyan-100 to-cyan-300',
                  border: 'border-cyan-500',
                  text: 'text-cyan-700',
                  iconBg: 'bg-cyan-500',
                  hoverScale: 1.05,
                  iconRotate: 20,
                };
              case 'پیش بینی کل سود':
                return {
                  gradient: 'from-yellow-100 to-yellow-300',
                  border: 'border-yellow-500',
                  text: 'text-yellow-700',
                  iconBg: 'bg-yellow-500',
                  hoverScale: 1.05,
                  iconRotate: 20,
                };
              case 'تقویم سود':
                return {
                  gradient: 'from-teal-100 to-teal-300',
                  border: 'border-teal-500',
                  text: 'text-teal-700',
                  iconBg: 'bg-teal-500',
                  hoverScale: 1.1,
                  iconRotate: 30,
                };
              default:
                return {
                  gradient: 'from-gray-100 to-gray-300',
                  border: 'border-gray-500',
                  text: 'text-gray-700',
                  iconBg: 'bg-gray-500',
                  hoverScale: 1.05,
                  iconRotate: 20,
                };
            }
          };

          const styles = getCardStyles(item.title);

          return (
            <Link
              to={item.url || '#'}
              key={index}
              className="group block text-decoration-none"
            >
              <motion.div
                whileHover={{ scale: styles.hoverScale }}
                transition={{ duration: 0.3 }}
                className={`relative rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br ${styles.gradient} ${styles.border}`}
              >
                <div className="flex items-center justify-between">
                  {/* Content Section */}
                  <div className="flex flex-col">
                    <h3 className={`text-3xl font-bold mb-4 ${styles.text}`}>
                      {item.value}
                    </h3>
                    <p className={`text-lg font-medium ${styles.text}`}>
                      {item.title}
                    </p>
                  </div>

                  {/* Icon Section */}
                  <motion.div
                    whileHover={{ rotate: styles.iconRotate }}
                    transition={{ duration: 0.5 }}
                    className={`flex items-center justify-center w-24 h-24 rounded-full ${styles.iconBg} shadow-md`}
                  >
                    <IconComponent className="w-12 h-12 text-white" />
                  </motion.div>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};


export default Dashboard;
