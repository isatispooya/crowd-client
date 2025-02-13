import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CalenderImg from './aaaaaaa.png';

const AccessCalendar = () => {
  return (
    <Link to="/calender" className="block text-decoration-none">
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="relative w-full h-[200px] bg-gradient-to-br from-purple-200 to-purple-700 rounded-2xl shadow-lg hover:shadow-xl overflow-hidden flex items-center justify-center"
      >
        {/* Calendar SVG Icon */}
        <img src={CalenderImg} alt="calender" className="w-72 h-72 sm:w-72 sm:h-72" />

        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-lg sm:text-xl font-bold">
            گزارش تقویمی مشارکت و سود پیش بینی شده شما    
          </h3>
        </div>
      </motion.div>
    </Link>
  );
};

export default AccessCalendar;
