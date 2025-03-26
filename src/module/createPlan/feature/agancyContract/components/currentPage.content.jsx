import React from 'react';
import PropTypes from 'prop-types';

const CurrentPageContent = ({ currentPage, pages, agencyContract, qrValue }) => {
  const CurrentPageComponent = pages[currentPage - 1];
  return <CurrentPageComponent agencyContract={agencyContract} qrValue={qrValue} />;
};

CurrentPageContent.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pages: PropTypes.array.isRequired,
  agencyContract: PropTypes.object.isRequired,
  qrValue: PropTypes.string.isRequired,
};
export default CurrentPageContent;
