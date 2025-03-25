import React from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useInvestor } from '../hooks';
import { backdroppVariants, dialogVariants } from '../animations';
import BoardMembersSection from './BoardMembersSection';
import { InfoItem } from '../components';

const CompanyDetailsPopUp = ({ isOpen, onClose, data }) => {
  const { mutate: mutateInvestor } = useInvestor();
  const navigate = useNavigate();

  const handleClose = () => onClose(false);

  const handleConfirm = () => {
    mutateInvestor(
      { company_id: data?.company?.id },
      {
        onSuccess: (response) => {
          navigate(`/cardsDetail/${response?.id}`);
          onClose(false);
        },
      }
    );
  };

  const fields = [
    { label: 'شناسه ملی', value: data?.company?.national_id },
    { label: 'شماره ثبت', value: data?.company?.registration_number },
    { label: 'تاریخ ثبت', value: data?.company?.persian_registration_date },
    { label: 'سرمایه', value: data?.company?.capital?.toLocaleString() || 'نامشخص' },
    { label: 'کد اقتصادی', value: data?.company?.economic_code },
    { label: 'کد پستی', value: data?.company?.postal_code },
    { label: 'وضعیت', value: data?.company?.status },
    { label: 'واحد ثبت', value: data?.company?.registration_unit },
    { label: 'آدرس', value: data?.company?.address },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdroppVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleClose}
        >
          <motion.div
            variants={dialogVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full max-w-2xl mx-4 bg-white rounded-lg shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex items-center justify-between p-4 text-white bg-gradient-to-r from-indigo-600 to-purple-600">
              <h2 className="text-xl font-semibold">{data?.company?.title || 'اطلاعات شرکت'}</h2>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClose}
                className="text-white transition-colors duration-200 hover:text-gray-200"
              >
                ✕
              </motion.button>
            </header>

            <main className="p-6 space-y-6">
              <section>
                <h3 className="mb-4 text-lg font-medium text-indigo-700">اطلاعات اصلی شرکت</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {fields.map((field) => (
                    <InfoItem key={field.label} {...field} />
                  ))}
                </div>
              </section>

              <div className="my-4 border-t border-gray-200" />

              <BoardMembersSection members={data?.members} />
            </main>

            <footer className="flex justify-end gap-3 p-4 bg-gray-50 border-t border-gray-200">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClose}
                className="px-4 py-2 font-medium text-red-600 transition-colors duration-200 bg-red-100 rounded-lg hover:bg-red-200"
              >
                رد
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleConfirm}
                className="px-4 py-2 font-medium text-white transition-colors duration-200 bg-indigo-600 rounded-lg hover:bg-indigo-700"
              >
                تایید
              </motion.button>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

CompanyDetailsPopUp.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default CompanyDetailsPopUp;
