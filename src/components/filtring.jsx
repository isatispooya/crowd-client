import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import DropButton from 'src/module/plan/filtering/dropButton'; 

const FilterPlans = ({ setFilterStatusSecond }) => {
  const planStatusOptions = [
    { id: '1', label: 'شروع شده' },
    { id: '2', label: 'جمع آوری شده' },
    { id: '3', label: 'تمدید شده' },
    { id: '4', label: 'تکمیل شده' },
    { id: '5', label: 'سررسید ناموفق' },
  ];


  const [selectedStatuses, setSelectedStatuses] = useState(['1']);

  useEffect(() => {

    setFilterStatusSecond(['1']);
  }, [setFilterStatusSecond]);

  const handleSelectStatus = (status) => {

    if (selectedStatuses.includes(status)) {
      const updatedStatuses = selectedStatuses.filter((s) => s !== status);
      setSelectedStatuses(updatedStatuses);
      setFilterStatusSecond(updatedStatuses); 
    } else {
      const updatedStatuses = [...selectedStatuses, status];
      setSelectedStatuses(updatedStatuses);
      setFilterStatusSecond(updatedStatuses); 
    }
  };

  return (
    <div className="flex flex-col w-full bg-transparent z-50">
      <DropButton
        planStatusOptions={planStatusOptions}
        onSelectStatus={handleSelectStatus}
        selectedStatuses={selectedStatuses}
      />


      <nav className="bg-gray-100 p-3 mt-4 w-full shadow-inner">
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-700 mb-1">وضعیت‌های انتخاب شده</p>
          <div className="flex flex-wrap justify-center gap-2">
            {selectedStatuses.length > 0 ? (
              selectedStatuses.map((status) => (
                <span
                  key={status}
                  className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full"
                >
                  {planStatusOptions.find((option) => option.id === status)?.label}
                </span>
              ))
            ) : (
              <span className="text-sm text-gray-500">هیچ فیلتری انتخاب نشده است</span>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

FilterPlans.propTypes = {
  setFilterStatusSecond: PropTypes.func.isRequired,
};

export default FilterPlans;
