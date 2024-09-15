/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

import { Button, Tooltip } from '@mui/material';
import { getCookie } from 'src/api/cookie';
import UseCartId from 'src/hooks/use-cartId';
import useNavigateStep from 'src/hooks/use-navigate-step';
import Loader from 'src/components/loader';
import { useFetchCards } from '../hooks/useFetchCards';
import { formatNumber } from '../../../utils/formatNumbers';
import NewCard from './newCard';

const CardList = () => {
  const { cardId, setCartId } = UseCartId(null);
  const access = getCookie('access');
  const { incrementPage } = useNavigateStep();


  const { data: cards = [], isLoading, error } = useFetchCards(access);

  const handleCardClick = (id, status) => {
    incrementPage();
    setCartId(+id);
    setCartId(status);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>خطا در بارگیری کارت‌ها: {error.message}</p>;
  }
  return (
    <div className="p-8 bg-transparent min-h-screen flex justify-center items-start">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-7xl w-full">
        <div className="bg-gray-200 text-white rounded-t-md p-2 text-center">
          <h1 className="text-2xl font-bold text-gray-700">لیست ها</h1>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-24 xl:gap-8 justify-center">
            <NewCard />
            {cards.length > 0 ? (
              cards.map((card) => (
                <div
                  key={card.id}
                  className={`bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-between items-center cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gray-100 min-w-[280px] max-w-[320px] h-[350px] ${
                    cardId === card.id ? 'border-4 border-blue-600' : ''
                  }`}
                  onClick={() => handleCardClick(card.id, card.status)}
                  tabIndex={0}
                  role="button"
                  aria-label={`View card ${card.company_name}`}
                >
                  <div className="flex flex-col items-center flex-grow space-y-4">
                    <h2 className="text-2xl font-bold text-gray-800">{card.company_name}</h2>
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <p className="text-base font-medium text-gray-700">
                        شناسه: {card.nationalid}
                      </p>
                      <p className="text-base font-medium text-gray-700">
                        میزان سرمایه: {formatNumber(card.registered_capital)}
                      </p>
                      <p className="text-base font-medium text-gray-700">
                        شماره ثبت: {card.registration_number}
                      </p>
                    </div>
                    <div className="flex items-center"> دانلود قرارداد</div>
                  </div>
                  <div className="flex justify-center gap-4 mt-6">
                    <Tooltip title="مشاهده و ویرایش">
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ textTransform: 'none', padding: '8px 16px', fontSize: '16px' }}
                      >
                        مشاهده و ویرایش
                      </Button>
                    </Tooltip>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 text-xl">هیچ لیستی موجود نیست</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardList;
