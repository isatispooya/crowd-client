import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { UploadInput } from '../../components/step_3';
import { useUploadContract } from '../../hooks/step_3';

const Contract = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const { mutate: uploadContract, isPending } = useUploadContract();

  const links = [
    { id: 1, title: 'قرارداد پایه', path: '/contracts/basic', icon: '📄' },
    { id: 2, title: 'قرارداد ویژه', path: '/contracts/premium', icon: '📋' },
    { id: 3, title: 'قرارداد سازمانی', path: '/contracts/enterprise', icon: '📑' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    hover: {
      scale: 1.03,
      boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)',
      transition: {
        duration: 0.2,
      },
    },
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Updated upload labels to match the form data fields from the screenshot
  const uploadLabels = [
    { id: 'account_number_letter', label: 'نامه شماره حساب', icon: '📝' },
    { id: 'financial_exel', label: 'اکسل مالی', icon: '📊' },
    { id: 'auditor_response', label: 'پاسخ حسابرس', icon: '📈' },
    { id: 'warranty', label: 'ضمانت نامه', icon: '🔒' },
  ];

  return (
    <div className="max-w-3xl mx-auto p-8" dir="rtl">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-lg border border-blue-100">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            انتخاب نوع قرارداد
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contract Types Section */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-xl font-semibold mb-5 text-gray-700 border-b pb-3 flex items-center">
              <span className="bg-blue-100 text-blue-600 p-2 rounded-full mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                  <path d="M3 8a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                </svg>
              </span>
              انواع قرارداد
            </h3>

            <motion.ul
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {links.map((link) => (
                <motion.li key={link.id} variants={itemVariants} whileHover="hover">
                  <Link
                    to={link.path}
                    className="block bg-white rounded-lg shadow-sm p-4 border border-gray-200 hover:border-blue-500 transition-all duration-200 hover:bg-blue-50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-2xl ml-3">{link.icon}</span>
                        <span className="text-lg font-medium text-gray-700">{link.title}</span>
                      </div>
                      <div className="bg-blue-100 rounded-full p-1.5 text-blue-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Upload Documents Section */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-xl font-semibold mb-5 text-gray-700 border-b pb-3 flex items-center">
              <span className="bg-indigo-100 text-indigo-600 p-2 rounded-full mr-2">
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
              آپلود اسناد مورد نیاز
            </h3>

            <motion.div
              className="space-y-5"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {uploadLabels.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="mb-4 bg-gray-50 p-4 rounded-lg border border-gray-100 hover:border-indigo-200 transition-all duration-200"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center mb-2">
                    <span className="text-xl ml-2">{item.icon}</span>
                    <p className="text-sm font-medium text-gray-700">{item.label}</p>
                  </div>
                  <UploadInput
                    name={item.id}
                    accept=".png,.jpg,.jpeg,.pdf,.xlsx,.xls"
                    className="w-full"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
          >
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
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Contract;
