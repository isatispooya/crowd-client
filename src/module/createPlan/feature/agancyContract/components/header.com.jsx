import React from 'react';
import { OnRun } from 'src/api/OnRun';
import PropTypes from 'prop-types';

const ContractHeader = ({ agencyContract }) => {
  if (!agencyContract) return null;

  return (
    <div className="flex flex-col gap-1 text-left text-[10px] leading-[14px]">
      {agencyContract.investor_request?.logo && (
        <div className="mb-1">
          <img
            src={OnRun + agencyContract.investor_request.logo}
            alt="Investor Logo"
            className="h-20 object-contain"
          />
        </div>
      )}
    </div>
  );
};

ContractHeader.propTypes = {
  agencyContract: PropTypes.object.isRequired,
};

export default ContractHeader;
