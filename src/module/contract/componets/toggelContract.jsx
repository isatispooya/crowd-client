import React from 'react';
import PropTypes from 'prop-types';

const ToggleContract = ({ label, checked, handle, disabled  , contractData }) => {
  return (
    <div className="collapse p-3 collapse-close border rounded-lg border-none shadow-md">
      <div className="collapse-title flex justify-between items-center text-md font-medium bg-white">
        <span>{label}</span>
        <div className="flex items-center">
          <span className="mx-2">خیر</span>
          <input
            type="checkbox"
            name="role_141"
            className="toggle toggle-info bg-white "
            checked={contractData}
            onChange={handle}
            disabled={disabled}
          />
          <span className="mx-2">بله</span>
        </div>
      </div>
    </div>
  );
};

ToggleContract.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.isRequired,
  handle: PropTypes.isRequired,
  disabled: PropTypes.isRequired,
  contractData : PropTypes.isRequired
};

export default ToggleContract;
