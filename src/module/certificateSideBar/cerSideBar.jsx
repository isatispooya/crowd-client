import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import { OnRun } from 'src/api/OnRun';
import { FaDownload, FaCertificate, FaCalendarAlt } from 'react-icons/fa';

import useCer from './useGetCerSidebar';
import useCerti from './usePostCerSideBar';

const CertificateSideBar = () => {
  const { data } = useCer();
  const { data: response, mutate, error } = useCerti();

  useEffect(() => {
    if (response) {
      window.open(`${OnRun}/${response.url}`, '_blank');
    }
  }, [response]);

  if (error) {
    toast.error('اطلاعاتی برای نمایش وجود ندارد');
  }

  if (!data || data.length === 0) {
    return <div className="text-center text-gray-500">اطلاعاتی برای نمایش وجود ندارد</div>;
  }

  console.log(response, '123456789');
  console.log(data, 'dfghjkjhgfdsdfgh');

  return (
    <div className="flex flex-wrap gap-4 p-3 sm:p-4 md:p-6 w-full">
      <ToastContainer />
      {data.map((item, index) => (
        <motion.div
          key={index}
          className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)] p-4 relative bg-white text-black shadow-lg rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl border border-gray-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            animate={{
              background: [
                'linear-gradient(45deg, #4f46e5, #3b82f6)',
                'linear-gradient(45deg, #3b82f6, #06b6d4)',
                'linear-gradient(45deg, #06b6d4, #4f46e5)',
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            className="absolute inset-0 w-full h-full opacity-70"
          />

          <div className="relative z-10 p-2 sm:p-4">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="flex items-center gap-2">
                <div className="p-1 sm:p-2">
                  <FaCertificate className="text-white text-xl sm:text-2xl" size={24} />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white tracking-wide break-words">
                    {item.persian_name}
                  </h2>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-white/90">
              <FaCalendarAlt className="text-base sm:text-lg" />
              <span className="text-xs sm:text-sm">
                تاریخ ایجاد طرح: {item.persian_creation_date || 'نامشخص'}
              </span>
            </div>

            <motion.button
              type="button"
              onClick={() => mutate(item.trace_code)}
              className="absolute bottom-1 left-2 sm:left-4 bg-white/20 hover:bg-white/30 p-2 sm:p-3 rounded-full backdrop-blur-sm transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaDownload className="text-white text-lg sm:text-xl" />
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CertificateSideBar;
