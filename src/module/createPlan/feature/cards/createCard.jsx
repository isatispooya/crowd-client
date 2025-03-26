import React, { useState } from 'react';
import { FiSearch, FiLoader, FiArrowLeft } from 'react-icons/fi';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import useFetchCompanyId from '../../hooks/companyId';
import CompanyDetailsPopUp from './companyDetailsPopUp';

const CreateCard = ({ setIsOpen }) => {
  const [isSearching, setIsSearching] = useState(false);
  const [companyId, setCompanyId] = useState('');
  const { submitCompanyData, data: responseData } = useFetchCompanyId();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
    submitCompanyData(
      { national_id: Number(companyId) },
      {
        onSuccess: () => {
          toast.success('شناسه شرکت یافت شد');
          setIsSearching(false);
          setIsPopupOpen(true);
        },
        onError: () => {
          toast.error('شناسه شرکت یافت نشد');
          setIsSearching(false);
        },
      }
    );
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleInputChange = (e) => {
    setCompanyId(e.target.value);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg"
    >
      <div className="space-y-4">
        <div className="space-y-4">
          <input
            type="text"
            placeholder="شناسه شرکت"
            value={companyId}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border bg-gray-100 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
          />

          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSearch}
              disabled={isSearching}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white ${
                isSearching ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              } transition-colors duration-200`}
            >
              {isSearching ? (
                <FiLoader className="animate-spin w-5 h-5" />
              ) : (
                <FiSearch className="w-5 h-5" />
              )}
              <span>{isSearching ? 'در حال جستجو...' : 'جستجو'}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(false)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              <span>بازگشت</span>
              <FiArrowLeft className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>

      <CompanyDetailsPopUp isOpen={isPopupOpen} onClose={handleClosePopup} data={responseData} />
    </motion.div>
  );
};

CreateCard.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
};

export default CreateCard;
