import React from 'react';
import PropTypes from 'prop-types';
import { BsArrow90DegDown } from 'react-icons/bs';
import { motion } from 'framer-motion';

const ProgressLineChart = ({ progress, label }) => {
  return (
    <div className="w-full flex flex-col items-start space-y-2">
      <label
        htmlFor="progress"
        className="flex items-center justify-center text-xl font-bold text-gray-900"
      >
        {label}
        <BsArrow90DegDown className="ml-2 text-blue-500" />
      </label>

      <div className="w-full flex items-center space-x-2">
      <div className="relative w-full h-2 bg-blue-100 rounded-full overflow-hidden">
      <motion.div
        className="absolute top-0 left-0 h-full transition-all duration-300 ease-in-out"
        style={{ width: `${progress}%` }}
        initial={{
          backgroundImage: 'linear-gradient(to right, #004ff9, #000000)',
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}

        transition={{
          repeat: Infinity,
          duration: 5, 
          ease: 'easeInOut',
        }}
      />
    </div>
        <motion.span
          className="ml-2 text-sm font-semibold text-gray-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {progress}%
        </motion.span>
      </div>
    </div>
  );
};

ProgressLineChart.propTypes = {
  progress: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};

export default ProgressLineChart;
