import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import { OnRun } from 'src/api/OnRun';
import {
  FaDownload,
  FaCertificate,
  FaCalendarAlt,
  FaSearch,
  FaDollarSign,
  FaBalanceScale,
} from 'react-icons/fa';
import SmallLoader from 'src/components/SmallLoader';
import useCer from './useGetCerSidebar';
import useCerti from './usePostCerSideBar';
import { getCerByTraceCode } from './useGetCerSidebarBytraceCode';

const CertificateSideBar = () => {
  const { data } = useCer();
  const { data: response, error } = useCerti();
  // const traceCode = data && data.length > 0 ? data[0].trace_code_payment_farabourse : null;
  // const { data: responseByTraceCode } = getCerByTraceCode(traceCode);

  const [loadingTraceCode, setLoadingTraceCode] = useState(null);

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

  const handleDownloadClick = async (downloadTraceCode) => {
    setLoadingTraceCode(downloadTraceCode);
    try {
      const downloadData = await getCerByTraceCode(downloadTraceCode);
  
      window.open(OnRun + downloadData.url, '_blank');
    } catch (downloadError) {
      toast.error(downloadError.response.data.ErrorMessage);
    } finally {
      setLoadingTraceCode(null);
      toast.dismiss();
    }
  };

  const generateRandomTraceCode = () => {
    return Math.floor(Math.random() * 1000000);
  };

  if (error) {
    toast.error('اطلاعاتی برای نمایش وجود ندارد');
  }

  if (!data || data.length === 0) {
    return <div className="text-center text-gray-500">اطلاعاتی برای نمایش وجود ندارد</div>;
  }

  return (
    <>
      <ToastContainer />
      <div className="w-full p-4 sm:p-6 bg-white shadow-2xl rounded-lg">
        <div className="bg-gray-200 w-full text-white rounded-t-md p-2 text-center mb-8">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-700">
            گواهینامه‌های من
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.map((item, index) => (
            <motion.div
              key={index}
              className="h-[260px] bg-gray-50 rounded-xl overflow-hidden relative shadow-[0_15px_50px_-15px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)]"
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
                        {item.plan_details}
                      </h2>
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <FaBalanceScale className="text-xs" />
                        <span className="text-xs font-medium">
                          مقدار:
                          {item.amount || 'نامشخص'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <FaDollarSign className="text-xs" />
                        <span className="text-xs font-medium">ارزش :{item.value || 'نامشخص'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 p-4 bg-blue-50 rounded-lg border border-blue-100 hover:bg-blue-100 cursor-pointer shadow-sm hover:shadow">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-indigo-500 text-sm" />
                      <span className="text-xs font-semibold text-gray-700">
                        کد پیگیری فرابورس:
                      </span>
                    </div>
                    <div className="flex items-center justify-between sm:flex-1">
                      <span className="text-xs font-medium text-indigo-600 bg-white px-2 py-1 rounded-md w-full sm:w-auto text-center">
                        {item.trace_code_payment_farabourse || 'نامشخص'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <motion.button
                    type="button"
                    onClick={() => window.open('https://cf.ifb.ir/home/trackParticipation')}
                    className="group flex items-center px-8 justify-center h-10 rounded-lg bg-gradient-to-r from-indigo-700 to-blue-700 hover:from-indigo-800 hover:to-blue-800 text-white transition-all duration-200 shadow-[0_8px_20px_-3px_rgba(99,102,241,0.5)] hover:shadow-[0_12px_30px_-5px_rgba(99,102,241,0.7)]"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaSearch className="text-lg group-hover:translate-y-0.5 transition-transform" />
                    استعلام
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() =>
                      handleDownloadClick(
                        item.trace_code_payment_farabourse || generateRandomTraceCode()
                      )
                    }
                    className={`group flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-700 to-blue-700 hover:from-indigo-800 hover:to-blue-800 text-white transition-all duration-200 shadow-[0_8px_20px_-3px_rgba(99,102,241,0.5)] hover:shadow-[0_12px_30px_-5px_rgba(99,102,241,0.7)] ${
                      loadingTraceCode === item.trace_code_payment_farabourse ? 'loading' : ''
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loadingTraceCode === item.trace_code_payment_farabourse}
                  >
                    {loadingTraceCode === item.trace_code_payment_farabourse ? (
                      <SmallLoader />
                    ) : (
                      <FaDownload className="text-lg group-hover:translate-y-0.5 transition-transform" />
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CertificateSideBar;
