import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserCircle, FaMoneyCheck, FaFileAlt, FaHandshake, FaChartLine, FaCheckCircle } from 'react-icons/fa';
import { sections } from './components/accordianChilds';

const icons = {
  'سرمایه گذاری': [
    <FaUserCircle  className='text-2xl'/>,
    <FaMoneyCheck className='text-2xl'/>,
    <FaFileAlt className='text-2xl'/>,
    <FaHandshake className='text-2xl'/>,
    <FaChartLine className='text-2xl'/>,
    <FaCheckCircle className='text-2xl'/>,
  ],
  'سرمایه پذیری': [
    <FaFileAlt />,
    <FaHandshake className='text-2xl'/>,
    <FaCheckCircle className='text-2xl'/>,
    <FaMoneyCheck className='text-2xl'/>,
    <FaChartLine className='text-2xl'/>,
    <FaCheckCircle className='text-2xl'/>,
    <FaMoneyCheck className='text-2xl'/>,
  ],
};

const descriptions = {
  'سرمایه گذاری': [
    'ثبت اطلاعات شخصی و مشخصات کاربری',
    'انتخاب طرح مناسب برای سرمایه‌گذاری',
    'تعیین روش پرداخت برای سرمایه‌گذاری',
    'تعیین تعداد گواهی‌های مشارکت مورد نظر',
    'پرداخت یا بارگذاری فیش برای تأیید',
    'پیگیری وضعیت درخواست‌ها در پنل کاربری',
  ],
  'سرمایه پذیری': [
    'ایجاد یک طرح جدید در پنل کاربری شما',
    'ارسال مدارک و مستندات مورد نیاز',
    'ارزیابی مدارک و تهیه گزارشات فنی',
    'عقد قرارداد همکاری',
    'دریافت نماد رسمی از فرابورس',
    'شروع کمپین جذب سرمایه برای طرح',
    'انتقال وجوه به حساب متقاضی',
  ],
};

const Training = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleSection = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const collapseVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto' },
  };

  const listItemAnimation = {
    hover: {
      scale: 1.02,
      transition: {
        yoyo: Infinity,
        duration: 0.5,
      },
    },
  };

  return (
    <div className="p-6 space-y-6  min-h-screen">
      {sections.map((section, index) => (
        <div key={index} className="bg-white  shadow-lg rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection(index)}
            className="flex  items-center justify-between w-full p-4 bg-gradient-to-r from-blue-200 via-blue-100 to-blue-200 hover:from-blue-300 hover:to-blue-200 transition-colors rounded-t-lg"
          >
            <span className="text-xl  font-semibold text-blue-900">{section.title}</span>
            <span
              className={`transform transition-transform ${
                openIndex === index ? 'rotate-180' : 'rotate-0'
              } text-blue-600`}
            >
              ▼
            </span>
          </button>

          <AnimatePresence initial={false}>
            {openIndex === index && (
              <motion.div
                className="px-6 py-4 bg-gray-50 border-t border-gray-200"
                variants={collapseVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <ol className="list-decimal   list-inside space-y-4">
                  {section.content.map((paragraph, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-center  space-x-3 text-gray-700 bg-white p-3 rounded-lg shadow-md cursor-pointer transition-colors"
                      variants={listItemAnimation}
                      whileHover="hover"
                    >
                      <span className="text-blue-500 p-8 text-4xl">{icons[section.title][idx]}</span>
                      <div>
                        <p>{paragraph}</p>
                        <small className="text-sm text-gray-500">{descriptions[section.title][idx]}</small>
                      </div>
                    </motion.li>
                  ))}
                </ol>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default Training;
