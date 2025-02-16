import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { OnRun } from 'src/api/OnRun';
import { FaDownload, FaCertificate, FaCalendarAlt } from 'react-icons/fa';

import useCer from './useGetCerSidebar';
import useCerti from './usePostCerSideBar';

const CertificateSideBar = () => {
  const { data } = useCer();
  const { data: response, mutate, error } = useCerti();

  useEffect(() => {
    if (response) {
      if (response.ErrorMessage === 'اطلاعات مشارکت کننده یافت نشد') {
        window.location.href = '/404';
        toast.error(response.ErrorMessage);
      } else {
        window.open(`${OnRun}/${response.url}`, '_blank');
      }
    }
  }, [response, error]);

  if (error) {
    toast.error('اطلاعاتی برای نمایش وجود ندارد');
  }

  if (!data || data.length === 0) {
    return <div className="text-center text-gray-500">اطلاعاتی برای نمایش وجود ندارد</div>;
  }

  return (
    <div className="w-full p-4 sm:p-6 bg-white shadow-2xl rounded-lg">
      <div className="bg-gray-200 w-full text-white rounded-t-md p-2 text-center mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-700">گواهینامه‌های من</h1>
      </div>

      <div className="grid grid-cols-3  gap-4">
        {data.map((item, index) => (
          <motion.div
            key={index}
            className="h-[220px] bg-gray-50 rounded-xl overflow-hidden relative shadow-[0_15px_50px_-15px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] transition-all duration-300"
            whileHover={{
              scale: 1.01,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-300 to-blue-300 shadow-[0_12px_35px_-6px_rgba(0,0,0,0.3)]" />
            <div className="relative h-full flex flex-col justify-between p-5 bg-gradient-to-br from-gray-50 to-white">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-lg shadow-[0_8px_25px_-4px_rgba(0,0,0,0.2)]">
                    <FaCertificate className="text-indigo-600 text-xl" />
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-[15px] font-bold text-gray-800 line-clamp-2 leading-6">
                      {item.persian_name}
                    </h2>
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <FaCalendarAlt className="text-xs" />
                      <span className="text-xs font-medium">
                        {item.persian_creation_date || 'نامشخص'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-gray-700 bg-gray-100 p-2 rounded">
                  این گواهینامه تایید شده و آماده دانلود می‌باشد
                </div>
              </div>
              <div className="flex items-center justify-end">
                <motion.button
                  type="button"
                  onClick={() => mutate(item.trace_code)}
                  className="group flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-700 to-blue-700 hover:from-indigo-800 hover:to-blue-800 text-white transition-all duration-200 shadow-[0_8px_20px_-3px_rgba(99,102,241,0.5)] hover:shadow-[0_12px_30px_-5px_rgba(99,102,241,0.7)]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaDownload className="text-lg group-hover:translate-y-0.5 transition-transform" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CertificateSideBar;
