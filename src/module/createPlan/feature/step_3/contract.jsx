import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { HiDocument, HiArrowUpTray, HiChevronLeft, HiArrowRight } from 'react-icons/hi2';
import { UploadInput } from '../../components'; 
import { useUploadContract } from '../../hooks/step_3';

const Contract = () => {
  const { id } = useParams();
  const [files, setFiles] = useState({
    account_number_letter: null,
    financial_exel: null,
    auditor_response: null,
    warranty: null,
  });

  const { mutate: uploadContract, isPending } = useUploadContract(id);

  const links = [
    { id: 1, title: 'قرارداد عاملیت', path: '/contracts/basic', icon: '📄' },
    { id: 2, title: 'نامه حسابرسی', path: '/contracts/premium', icon: '📋' },
    { id: 3, title: 'نامه بانکی', path: '/contracts/enterprise', icon: '📑' },
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

  const handleFileChange = (name, file) => {
    setFiles((prev) => ({
      ...prev,
      [name]: file,
    }));
  };

  const handleSubmit = () => {
    const formData = new FormData();

    Object.entries(files).forEach(([key, file]) => {
      if (file) {
        formData.append(key, file);
      }
    });

    uploadContract(formData);
  };

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
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-xl font-semibold mb-5 text-gray-700 border-b pb-3 flex items-center">
              <span className="bg-blue-100 text-blue-600 p-2 rounded-full mr-2">
                <HiDocument className="h-5 w-5" />
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
                        <HiChevronLeft className="h-5 w-5" />
                      </div>
                    </div>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-xl font-semibold mb-5 text-gray-700 border-b pb-3 flex items-center">
              <span className="bg-indigo-100 text-indigo-600 p-2 rounded-full mr-2">
                <HiArrowUpTray className="h-5 w-5" />
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
                  className={`mb-4 bg-gray-50 p-4 rounded-lg border ${
                    files[item.id] ? 'border-green-200 bg-green-50' : 'border-gray-100'
                  } hover:border-indigo-200 transition-all duration-200`}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
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
                  <UploadInput
                    name={item.id}
                    accept=".png,.jpg,.jpeg,.pdf,.xlsx,.xls"
                    className="w-full"
                    onChange={(file) => handleFileChange(item.id, file)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

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
                <div className="animate-spin h-5 w-5 ml-2 border-2 border-white border-t-transparent rounded-full" />
                در حال ارسال...
              </span>
            ) : (
              <>
                ثبت و ادامه
                <HiArrowRight className="h-5 w-5 inline mr-2" />
              </>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Contract;
