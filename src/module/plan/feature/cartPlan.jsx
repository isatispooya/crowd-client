import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProgressLineChart from 'src/components/progressLine';
import { OnRun } from 'src/api/OnRun';
import usePicure from '../service/use-picture';

const CartPlan = ({
  trace_code,
  persianName,
  industryGroup,
  totalUnits,
  totalPrice,
  crowdFundingType,
  projectStatus,
  settlementDescription,
  realPersonMinPrice,
  creation_date,
  crowdFundingtypeDescription,
}) => {
  const navigate = useNavigate();

  const { data: picture } = usePicure(trace_code);

  const handleViewClick = () => {
    navigate(`/plan/${trace_code}`);
  };

  return (
    <div className="flex flex-col  gap-4 bg-white p-6 rounded-lg shadow-lg transition-shadow hover:shadow-xl w-full sm:w-96 h-auto mx-auto">
      <div className="flex-col flex-grow">
        {picture && picture.picture ? (
          <img
            src={`${OnRun}/${picture.picture}`}
            alt={persianName}
            className="w-full h-48 object-cover rounded-lg mb-4 transition-transform hover:scale-105"
          />
        ) : (
          <img
            src="../../.../../public/img/nopic.jpg"
            alt="تصویر موجود نیست"
            className="w-full h-48 object-cover rounded-lg mb-4 transition-transform hover:scale-105"
          />
        )}

        <div className="grid gap-4">
          <h2 className="text-2xl font-bold text-gray-900">{persianName}</h2>
          <p className="text-lg text-gray-600">{crowdFundingtypeDescription}</p>
        </div>

        <div className="grid gap-2 mt-4">
          <p className="text-sm text-gray-700">
            مبلغ کل: <span className="font-semibold">{totalPrice} ریال</span>
          </p>
          <p className="text-sm text-gray-700">
            تعداد گواهی‌های شراکت: <span className="font-semibold">{totalUnits}</span>
          </p>
          <p className="text-sm text-gray-700">
            نوع تامین مالی: <span className="font-semibold">{crowdFundingType}</span>
          </p>
          <p className="text-sm text-gray-700">
            وضعیت پروژه: <span className="font-semibold">{projectStatus ? 'فعال' : 'غیرفعال'}</span>
          </p>
          <p className="text-sm text-gray-700">
            حداقل سرمایه‌گذاری حقیقی:{' '}
            <span className="font-semibold">{realPersonMinPrice} ریال</span>
          </p>
        </div>
        <div className="grid gap-2 mt-4">
          <ProgressLineChart progress={12} label="تامین شده" />
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <button
          type="button"
          className="bg-blue-600 text-white rounded-md px-6 py-3 w-full sm:w-auto transition-transform hover:scale-105 hover:bg-blue-700"
          onClick={handleViewClick}
        >
          مشاهده جزئیات
        </button>
      </div>
    </div>
  );
};

CartPlan.propTypes = {
  trace_code: PropTypes.string.isRequired,
  persianName: PropTypes.string.isRequired,
  industryGroup: PropTypes.string.isRequired,
  totalUnits: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
  crowdFundingType: PropTypes.isRequired,
  projectStatus: PropTypes.bool.isRequired,
  settlementDescription: PropTypes.func.isRequired,
  realPersonMinPrice: PropTypes.func.isRequired,
  creation_date: PropTypes.func.isRequired,
  crowdFundingtypeDescription: PropTypes.func.isRequired,
};

export default CartPlan;
