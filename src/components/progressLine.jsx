import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const ProgressLineChart = ({ progress, label }) => {
  return (
    <div className="flex w-full items-center space-x-2">
      <label htmlFor="progress" className="flex items-center justify-center text-sm text-gray-900">
        {label}
      </label>

      <div className="w-full flex items-center space-x-2">
        <div
          className="flex w-full h-4 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <motion.div
            className="flex flex-col bg-white justify-center rounded-full overflow-hidden  text-xs text-white text-center whitespace-nowrap dark:bg-blue-500 transition duration-500"
            style={{ width: `${progress}%` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {progress}
          </motion.div>
        </div>


      </div>
    </div>
  );
};

ProgressLineChart.propTypes = {
  progress: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};

export default ProgressLineChart;
