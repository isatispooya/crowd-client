import React from 'react';
import { motion } from 'framer-motion';


const NoSejamModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(event) => event.key === 'Enter' && onkeypress()}
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="bg-white rounded-lg p-6 w-11/12 max-w-md mx-auto"
      >
        <h2 className="text-xl font-bold mb-4">Access Profile Sejam</h2>
        <p className="mb-4">Please click the link below to access your Sejam profile.</p>
        <a
          href="https://profilesejam.csdiran.ir/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          https://profilesejam.csdiran.ir/
        </a>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
};


export default NoSejamModal;
