import React from 'react';
import PropTypes from 'prop-types';
import { OnRun } from 'src/api/OnRun';
import { useNavigate } from 'react-router-dom';
import { formatNumber } from 'src/utils/formatNumbers';
import { useAllCompany } from '../hooks';

const Cards = () => {
  const { data: allCompany } = useAllCompany();
  const navigate = useNavigate();
  console.log(allCompany);

  const handleClick = (e) => {
    navigate(`/create-plan/${allCompany?.investor_requests[e.target.id]?.id}`);
  };

  return (
    <div>
      {allCompany?.investor_requests?.map((request, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto border border-blue-100 transition-all duration-300 hover:shadow-xl hover:border-blue-300 cursor-pointer"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              if (handleClick) handleClick(e);
            }
          }}
        >
          <div className="rounded-t-lg p-6 text-center">
            <div className="flex justify-center mb-3">
              <img
                src={OnRun + request.logo}
                alt="لوگوی طرح"
                className="h-16 w-16 object-contain"
              />
            </div>
            <p className="text-blue-600 mt-2">
              {request.suggestion_plan_name || 'طرح توسعه فناوری'}
            </p>
          </div>
          <div className="p-6">
            <div className="mb-4">
              <p className="text-gray-700 font-medium">
                شماره شناسه شرکت:{' '}
                <span className="text-gray-600">{request.company?.national_id}</span>
              </p>
            </div>
            <div className="mb-4">
              <p className="text-gray-700 font-medium">
                میزان مبلغ تامین مالی:{' '}
                <span className="text-blue-600 font-semibold">
                  {formatNumber(request.amount_of_investment)}
                </span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

Cards.propTypes = {
  data: PropTypes.shape({
    companyId: PropTypes.string,
    amount: PropTypes.string,
    status: PropTypes.string,
    description: PropTypes.string,
    logo: PropTypes.string,
  }),
};

export default Cards;
