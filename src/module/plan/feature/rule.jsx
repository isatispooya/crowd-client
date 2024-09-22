/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';

const RulesModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">قوانین و مقررات</h2>
        <p className="text-gray-700 mb-4">
          لطفاً قبل از درخواست، قوانین و مقررات را به دقت مطالعه کنید. این قوانین شامل حقوق و تعهدات شما و نحوه استفاده از خدمات است.
        </p>
        <p className="text-gray-700 mb-6">
          با کلیک بر روی موافقتنامه، شما تمامی شرایط را قبول می‌کنید.
        </p>
        <button
          onClick={onClose}
          className="bg-blue-500 justify-center items-center self-center flex text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          بستن
        </button>
      </div>
    </div>
  );
};
RulesModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,  
    onClose: PropTypes.func.isRequired, 
  };
export default RulesModal;
