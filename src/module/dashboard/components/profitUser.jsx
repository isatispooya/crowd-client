import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeftCircle } from 'react-icons/fi';

const ProfitUser = ({ dashbord }) => {
  const { profit } = dashbord;

  const navigate = useNavigate();

  const handleNavigate = (traceCode) => navigate(`/plan/${traceCode}`);

  return (
    <>
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800 ">
        گزارش پیش‌بینی مشارکت در طرح‌ها
      </h1>
      <div dir="rtl" className="flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="overflow-x-auto w-full lg:w-4/5 relative shadow-2xl rounded-xl border border-gray-100 "
        >
          <table className="w-full text-sm text-left bg-white  text-gray-700 ">
            <thead className="text-lg bg-gray-100 ">
              <tr>
                <th scope="col" className="py-4 px-6 font-bold">
                  مبلغ
                </th>
                <th scope="col" className="py-4 px-6 font-bold">
                  تاریخ سررسید
                </th>
                <th scope="col" className="py-4 px-6 font-bold">
                  نوع
                </th>
                <th scope="col" className="py-4 px-6 font-bold">
                  وضعیت
                </th>
                <th scope="col" className="py-4 px-6 font-bold">
                  طرح
                </th>
              </tr>
            </thead>
            <tbody>
              {profit && profit.length > 0 ? (
                profit.map((item, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="border-b border-gray-300  text-gray-800  hover:bg-gray-100  transition-colors duration-200"
                  >
                    <td className="py-4 px-6 font-semibold">{item.amount.toLocaleString()} ریال</td>
                    <td className="py-4 px-6">{item?.date?.replace(/-/g, '/')}</td>
                    <td className="py-4 px-6">
                      {item.type === '1' ? 'اصل مشارکت' : 'پیش‌بینی سود'}
                    </td>
                    <td className="py-4 px-6">
                      {item.profit_payment_completed ? 'واریز شده' : 'در انتظار واریز'}
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleNavigate(item.trace_code)}
                        className="  text-white    px-4 py-2 transition-all duration-300"
                        type="button"
                      >
                        <FiArrowLeftCircle className="text-xl  text-blue-600" />
                      </button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td className="py-10 px-6 text-center text-gray-500 " colSpan="4">
                    گزارشی موجود نیست
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </motion.div>
      </div>
    </>
  );
};

ProfitUser.propTypes = {
  dashbord: PropTypes.object.isRequired,
};

export default ProfitUser;
