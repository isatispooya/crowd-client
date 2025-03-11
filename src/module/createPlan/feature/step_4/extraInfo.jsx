import { motion } from 'framer-motion';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { UploadExtraInfo } from '../../components/step_4';
import { useUploadExtraInfo } from '../../hooks/step_4';

const ExtraInfo = () => {
  const { id } = useParams();
  const [files, setFiles] = useState({
    tax_return: null,
    salary_list_for_the_last_3_months: null,
    trial_balance_current_year: null,
    balance_sheet: null,
    account_turnover: null,
    shareholder_list: null,
    three_recent_buying_and_selling_factors: null,
    company_articles_of_association: null,
    announcement_of_establishment: null,
    announcement_of_the_latest_managers: null,
    announcement_of_the_latest_changes: null,
  });

  const { mutate: uploadExtraInfo, isPending } = useUploadExtraInfo(id);

  const uploadLabels = [
    { id: 'tax_return', label: 'اظهارنامه مالیاتی', icon: '📊' },
    { id: 'salary_list_for_the_last_3_months', label: 'لیست حقوق 3 ماه اخیر', icon: '📑' },
    { id: 'trial_balance_current_year', label: 'تراز آزمایشی سال جاری', icon: '📈' },
    { id: 'balance_sheet', label: 'ترازنامه', icon: '📋' },
    { id: 'account_turnover', label: 'گردش حساب', icon: '💰' },
    { id: 'shareholder_list', label: 'لیست سهامداران', icon: '👥' },
    {
      id: 'three_recent_buying_and_selling_factors',
      label: 'سه فاکتور خرید و فروش اخیر',
      icon: '🧾',
    },
    { id: 'company_articles_of_association', label: 'اساسنامه شرکت', icon: '📜' },
    { id: 'announcement_of_establishment', label: 'آگهی تاسیس', icon: '📢' },
    { id: 'announcement_of_the_latest_managers', label: 'آگهی آخرین مدیران', icon: '👔' },
    { id: 'announcement_of_the_latest_changes', label: 'آگهی آخرین تغییرات', icon: '📝' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  const handleFileChange = (fileType, file) => {
    setFiles((prev) => ({
      ...prev,
      [id]: file,
    }));
  };

  const handleSubmit = () => {
    const formData = new FormData();
    Object.entries(files).forEach(([key, file]) => {
      if (file) {
        formData.append(key, file);
      }
    });
    uploadExtraInfo(formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-8" dir="rtl">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-lg border border-blue-100">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            اطلاعات تکمیلی
          </span>
        </h2>

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold mb-5 text-gray-700 border-b pb-3 flex items-center">
            <span className="bg-indigo-100 text-indigo-600 p-2 rounded-full ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            بارگذاری مدارک مورد نیاز
          </h3>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {uploadLabels.map((item, index) => (
              <motion.div
                key={item.id}
                className={`bg-gray-50 p-4 rounded-lg border ${
                  files[item.id] ? 'border-green-200 bg-green-50' : 'border-gray-100'
                } hover:border-indigo-200 transition-all duration-200`}
                variants={itemVariants}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <span className="text-xl ml-2">{item.icon}</span>
                    <p className="text-sm font-medium text-gray-700">{item.label}</p>
                  </div>
                  {files[item.id] && (
                    <span className="text-green-600 text-sm">✓ فایل انتخاب شد</span>
                  )}
                </div>
                <UploadExtraInfo
                  id={item.id}
                  label=""
                  fileType="file"
                  onChange={handleFileChange}
                  variant="outlined"
                  size="small"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 text-center">
          <motion.button
            onClick={handleSubmit}
            disabled={isPending}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              bg-gradient-to-r from-blue-600 to-indigo-600 
              text-white px-8 py-3 rounded-lg font-medium 
              shadow-lg hover:shadow-xl transition-all duration-200
              ${isPending ? 'opacity-70 cursor-not-allowed' : ''}
            `}
          >
            {isPending ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 ml-2" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                در حال ارسال...
              </span>
            ) : (
              <>
                ثبت و ادامه
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 inline mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ExtraInfo;
