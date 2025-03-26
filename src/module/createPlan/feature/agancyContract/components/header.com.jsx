import React from 'react';
import { OnRun } from 'src/api/OnRun';
import PropTypes from 'prop-types';

const ContractHeader = ({ agencyContract }) => {
  if (!agencyContract) return null;

  return (
    <div className="w-full flex flex-col items-center justify-center py-8">
      <div className="flex justify-between items-center w-full">
        {agencyContract.investor_request?.logo && (
          <div>
            <img
              src={OnRun + agencyContract.investor_request.logo}
              alt="Investor Logo"
              className="h-20 object-contain"
            />
          </div>
        )}

        <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-[10px] ">بسمه تعالی</p>
          <p className="text-[10px]">قرارداد عاملیت</p>
          <p className="text-[10px]">
            شماره قرارداد: {agencyContract.investor_request?.contract_number}
          </p>
        </div>

        <div className="invisible">
          {/* Placeholder to balance the logo */}
          <div className="h-20 w-20" />
        </div>
      </div>
    </div>
  );
};

ContractHeader.propTypes = {
  agencyContract: PropTypes.object.isRequired,
};

export default ContractHeader;
