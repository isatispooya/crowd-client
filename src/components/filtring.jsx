import PropTypes from 'prop-types';
import { useState } from 'react';
import DropButton from 'src/module/plan/filtering/dropButton'; // Adjust this import based on your folder structure

const FilterPlans = ({ setFilterStatusSecond }) => {
  const planStatusOptions = [
    { id: '1', label: 'شروع شده' },
    { id: '2', label: 'جمع آوری شده' },
    { id: '3', label: 'تمدید شده' },
    { id: '4', label: 'تکمیل شده' },
    { id: '5', label: 'سررسید ناموفق' },
  ];

  // Use state to track multiple selected statuses
  const [selectedStatuses, setSelectedStatuses] = useState([]);

  const handleSelectStatus = (status) => {
    // Check if the status is already selected
    if (selectedStatuses.includes(status)) {
      // Remove it if it is already selected
      const updatedStatuses = selectedStatuses.filter((s) => s !== status);
      setSelectedStatuses(updatedStatuses);
      setFilterStatusSecond(updatedStatuses); // Update the parent component with the new list
    } else {
      // Otherwise, add the new status
      const updatedStatuses = [...selectedStatuses, status];
      setSelectedStatuses(updatedStatuses);
      setFilterStatusSecond(updatedStatuses); // Update the parent component with the new list
    }
  };

  return (
    <div className="flex flex-col w-full bg-transparent z-50">
      <DropButton
        planStatusOptions={planStatusOptions}
        onSelectStatus={handleSelectStatus}
        selectedStatuses={selectedStatuses}
      />

      {/* Display selected statuses below the dropdown */}
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
