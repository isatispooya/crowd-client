import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MyCalendar from './calenderYear';
import Clander from './clander';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('calendarYear');

  return (
    <div className="w-full p-4">
      <div className="flex justify-center mb-4">
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setActiveTab('calendarYear')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'calendarYear' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            تقویم سال
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('clander')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'clander' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            تقویم
          </button>
        </div>
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'calendarYear' && <MyCalendar />}
        {activeTab === 'clander' && <Clander />}
      </motion.div>
    </div>
  );
};

export default Tabs;
