import React, { useState } from 'react';
import { FiPlus, FiSearch, FiArrowLeft, FiLoader } from 'react-icons/fi';
import useFetchCompanyId from '../hooks/companyId';
import CompanyDetailsPopUp from './companyDetailsPopUp';

const NewCards = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [companyId, setCompanyId] = useState('');
  const { submitCompanyData, data: responseData } = useFetchCompanyId();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  console.log(responseData);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleSearch = () => {
    setIsSearching(true);

    submitCompanyData(
      { national_id: companyId },
      {
        onSuccess: () => {
          setIsSearching(false);
          setIsPopupOpen(true);
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

  const cardStyle = {
    perspective: '1000px',
    minHeight: '300px',
  };

  const cardInnerStyle = {
    transformStyle: 'preserve-3d',
    transition: 'transform 0.8s',
    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
    height: '100%',
  };

  const cardFrontStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
  };

  const cardBackStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    transform: 'rotateY(180deg)',
  };

  return (
    <div className="h-full w-full" style={cardStyle}>
      <div className="w-full h-full" style={cardInnerStyle}>
        <div
          className="bg-white shadow-lg rounded-lg p-4 sm:p-6 border border-blue-100 flex items-center justify-center h-full"
          style={cardFrontStyle}
        >
          <div className="text-center w-full">
            <button
              type="button"
              onClick={handleFlip}
              className="bg-[#bae6fd] text-[#0369a1] rounded-full w-16 h-16 sm:w-20 sm:h-20 shadow-sm text-3xl sm:text-4xl hover:bg-[#93c5fd] transform hover:scale-105 transition-all duration-300 focus:outline-none flex items-center justify-center mx-auto"
            >
              <FiPlus className="w-8 h-8 sm:w-10 sm:h-10" />
            </button>
            <p className="mt-4 sm:mt-6 text-[#6c757d] text-sm sm:text-base font-medium flex items-center justify-center">
              برای افزودن طرح جدید کلیک کنید
            </p>
          </div>
        </div>

        <div
          className="bg-white shadow-lg rounded-lg p-4 sm:p-6 border border-blue-100 flex flex-col justify-center h-full"
          style={cardBackStyle}
        >
          <p className="text-[#6c757d] text-sm sm:text-base font-medium text-center mb-4 sm:mb-6 flex items-center justify-center">
            لطفا شماره شناسه را وارد کنید
          </p>

          <div className="text-center w-full">
            <div className="relative">
              <input
                type="text"
                placeholder="شناسه شرکت"
                className="w-full bg-white px-3 py-2 sm:px-4 sm:py-3 mb-4 sm:mb-6 border border-[#e9ecef] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#93c5fd] pr-10"
                value={companyId}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex justify-between mt-2 sm:mt-3">
              <button
                type="button"
                onClick={handleSearch}
                disabled={isSearching}
                className="bg-[#bae6fd] text-[#0369a1] px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-[#93c5fd] transition-all duration-300 flex items-center justify-center min-w-[80px] sm:min-w-[90px] text-xs sm:text-sm"
              >
                {isSearching ? (
                  <FiLoader className="animate-spin ml-1.5" />
                ) : (
                  <FiSearch className="ml-1.5" />
                )}
                {isSearching ? 'در حال جستجو...' : 'جستجو'}
              </button>
              <button
                type="button"
                onClick={handleFlip}
                className="bg-[#f1f3f5] text-[#6c757d] px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-[#e9ecef] transition-all duration-300 flex items-center text-xs sm:text-sm"
              >
                <FiArrowLeft className="ml-1.5" /> بازگشت
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <CompanyDetailsPopUp 
        isOpen={isPopupOpen} 
        onClose={handleClosePopup} 
        data={responseData}
      />
    </div>
  );
};

export default NewCards;
