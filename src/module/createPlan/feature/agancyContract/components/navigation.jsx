import React from 'react';
import PropTypes from 'prop-types';

const PageNavigation = ({ currentPage, totalPages, handlePageChange, handlePrint }) => {
  return (
    <div className="print:hidden mb-4 flex justify-between items-center">
      <div className="flex space-x-2">
        <button
          type="button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          صفحه قبل
        </button>
        <button
          type="button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          صفحه بعد
        </button>
        <span className="px-4 py-2">
          صفحه {currentPage} از {totalPages}
        </span>
      </div>
      <button
        type="button"
        onClick={handlePrint}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        چاپ تمام صفحات قرارداد
      </button>
    </div>
  );
};

PageNavigation.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  handlePrint: PropTypes.func.isRequired,
};
export default PageNavigation;
