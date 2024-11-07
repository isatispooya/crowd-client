import React from 'react';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import useCer from './useGetCerSidebar';
import useCerti from './usePostCerSideBar';
import imgs from './overlay_3.jpg';

const CertificateSideBar = () => {
  const { data } = useCer();
  const { data: response, mutate } = useCerti();

  if (!data || data.length === 0) {
    return <div className="text-center text-gray-500">اطلاعاتی برای نمایش وجود ندارد</div>;
  }

  if (response) {
    toast.error('اطلاعات مشارکت کننده یافت نشد');
  }

  return (
    <div className="flex flex-wrap gap-6 p-6">
      <ToastContainer />
      {data.map((item, index) => (
        <motion.div
          key={index}
          className="w-full md:w-1/2 lg:w-1/3 p-6 relative bg-gray-300 text-black shadow-lg rounded-2xl overflow-hidden transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src={imgs}
            alt="dsssss"
            className="absolute inset-0 w-full h-full object-cover opacity-70"
          />

          <div className="relative z-10 p-4">
            <h2 className="text-xl font-bold mb-4 text-white">{item.persian_name}</h2>
            <motion.button
              type="button"
              onClick={() => mutate(item.trace_code)}
              className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold opacity-0 hover:opacity-100 transition-opacity"
            >
              دانلود
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CertificateSideBar;
