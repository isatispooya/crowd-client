import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Cards = ({ data = {} }) => {
  const navigate = useNavigate();
  
  const {
    companyId = '۱۲۳۴۵۶۷۸۹۰',
    amount = '۵۰۰,۰۰۰,۰۰۰ تومان',
    status = 'برسی',
    description = 'اینجا متن توضیحات قرار می‌گیرد. می‌توانید این متن را با محتوای دلخواه خود جایگزین کنید.',
    logo = './public/img/bevisa.png',
  } = data;

  const handleClick = () => {
    navigate('/cardsDetail');
  };

  return (
    <div
      className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto border border-blue-100 transition-all duration-300 hover:shadow-xl hover:border-blue-300 cursor-pointer"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          if (handleClick) handleClick(e);
        }
      }}
    >
      <div className=" rounded-t-lg p-6 text-center">
        <div className="flex justify-center mb-3">
          <img src={logo} alt="لوگوی طرح" className="h-16 w-16 object-contain" />
        </div>
        <p className="text-blue-600 mt-2"> طرح توسعه فناوری</p>
      </div>
      <div className="p-6">
        <div className="mb-4">
          <p className="text-gray-700 font-medium">
            شماره شناسه شرکت: <span className="text-gray-600">{companyId}</span>
          </p>
        </div>
        <div className="mb-4">
          <p className="text-gray-700 font-medium">
            میزان مبلغ تامین مالی: <span className="text-blue-600 font-semibold">{amount}</span>
          </p>
        </div>
        <div className="mb-4">
          <p className="text-gray-700 font-medium">
            وضعیت: <span className="text-green-600 font-semibold">{status}</span>
          </p>
        </div>

        <p className="text-gray-600 mt-4 text-sm text-center">{description}</p>
      </div>
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
