import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Loader from 'src/components/loader';
import SmallError from 'src/components/smallError';
import useComplaints from '../hooks/useComplaints';
import Feedback from './feedback';

const Complaints = () => {
  const { traceCode } = useParams();
  const { data, isLoading, isError } = useComplaints(traceCode);
  const [displayCount, setDisplayCount] = useState(5);

  if (isLoading) return <Loader />;
  if (isError) return <SmallError />;

  const handleShowMore = () => {
    setDisplayCount(data.length);
  };

  return (
    <>
      <Feedback />
      <div className="p-4 max-w-3xl mx-auto">
        {data.slice(0, displayCount).map((item, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="mb-4 overflow-hidden"
            key={index}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex flex-col gap-4 bg-gradient-to-br from-blue-50 to-gray-50 p-6 rounded-xl shadow-sm border border-blue-100"
            >
              <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <div className="w-8 h-8 text-center rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold shadow-sm">
                    {item.id}
                  </div>
                  <span className="text-lg font-medium text-gray-800">{item.title}</span>
                </div>
                <motion.div whileHover={{ scale: 1.05 }} className="flex items-center">
                  <span
                    className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                      item.send_farabourse
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {item.send_farabourse ? 'ارسال شده به فرابورس' : 'در حال رسیدگی'}
                  </span>
                </motion.div>
              </div>

              <div className="space-y-2">
                <p className="text-gray-700 leading-relaxed">{item.message}</p>
              </div>
            </motion.div>
          </motion.div>
        ))}
        {data.length > 8 && displayCount === 5 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleShowMore}
            className="w-full mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-sm"
          >
            نمایش موارد بیشتر
          </motion.button>
        )}
      </div>
    </>
  );
};

export default Complaints;
