import PropTypes from 'prop-types';
import { useState, useEffect, useMemo } from 'react';
import DropButton from 'src/module/plan/filtering/dropButton';

const FilterPlans = ({ setFilterStatusSecond }) => {
  const planStatusOptions = useMemo(
    () => [
      { id: "1", label: 'شروع شده', color: 'bg-green-500' },
      { id: "2", label: 'شروع نشده', color: 'bg-gray-500' },
      { id: "3", label: 'تمدید شده', color: 'bg-yellow-500' },
      { id: "4", label: 'سررسید ناموفق', color: 'bg-red-500' },
      { id: "5", label: 'تکمیل شده', color: 'bg-blue-500' },
      { id: "6", label: 'خاتمه یافته', color: 'bg-blue-500' },
    ],
    []
  );

  const [selectedStatuses, setSelectedStatuses] = useState(
    planStatusOptions.map((option) => option.id)
  );

  useEffect(() => {
    if (typeof setFilterStatusSecond === 'function') {
      setFilterStatusSecond(planStatusOptions.map((option) => option.id));
    }
  }, [setFilterStatusSecond, planStatusOptions]);

  const handleSelectStatus = (status) => {
    if (selectedStatuses.includes(status)) {
      const updatedStatuses = selectedStatuses.filter((s) => s !== status);
      setSelectedStatuses(updatedStatuses);
      if (typeof setFilterStatusSecond === 'function') {
        setFilterStatusSecond(updatedStatuses);
      }
    } else {
      const updatedStatuses = [...selectedStatuses, status];
      setSelectedStatuses(updatedStatuses);
      if (typeof setFilterStatusSecond === 'function') {
        setFilterStatusSecond(updatedStatuses);
      }
    }
  };

  return (
    <div className="">
      <DropButton
        planStatusOptions={planStatusOptions}
        onSelectStatus={handleSelectStatus}
        selectedStatuses={selectedStatuses}
      />
    </div>
  );
};

FilterPlans.propTypes = {
  setFilterStatusSecond: PropTypes.func.isRequired,
};

export default FilterPlans;
