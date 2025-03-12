import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie } from 'src/api/cookie';
import FilterPlans from 'src/components/filtring';
import Loader from 'src/components/loader';
import useGetPlans from '../service/use-plans';
import PlanCart from './paln.cart';

const CartPlans = () => {
  const { data } = useGetPlans();
  const access = getCookie('access');
  const navigate = useNavigate();
  const [ setFilterStatusSecond] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (!access) {
      navigate('/login');
    }
  }, [access, navigate]);

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }

  if (!data || data.length === 0) {
    return <p>هیچ یافت نشد.</p>;
  }

  const filteredPlans = data.filter((item) => item?.information_complete?.status_second === '1');

  let displayPlans = filteredPlans.slice().reverse();

  if (showAll) {
    displayPlans = data.slice().reverse();
  } else if (displayPlans.length < 6) {
    const completedPlans = data
      .filter((item) => item?.information_complete?.status_show === true)
      .slice()
      .reverse();

    const uniqueAdditionalPlans = completedPlans.filter(
      (plan) => !displayPlans.some((existing) => existing.plan.id === plan.plan.id)
    );

    const additionalPlans = uniqueAdditionalPlans.slice(0, 6 - displayPlans.length);
    displayPlans = [...displayPlans, ...additionalPlans];
  }

  const handleShowMore = () => {
    setShowAll(true);
  };

  const handleShowLess = () => {
    setShowAll(false);
  };

  return (
    <>
      <div className="bg-gray-200 text-white rounded-t-md p-2 md:p-4 lg:p-6 text-center">
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-gray-700">طرح‌ها</h1>
      </div>
      <div className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-700 z-10">
        <FilterPlans setFilterStatusSecond={setFilterStatusSecond} />
      </div>
      <div className="bg-white rounded-lg shadow-2xl p-4">
        <div className="flex flex-wrap flex-row justify-around">
          {displayPlans.length > 0 ? (
            displayPlans.map((item) => {
              if (item?.information_complete?.status_show === true) {
                return (
                  <div key={item.plan.id} className="flex gap-6 p-4">
                    <PlanCart
                      plan={item}
                      handleDetailsClick={() => navigate(`/plan/${item.plan.trace_code}`)}
                    />
                  </div>
                );
              }
              return null;
            })
          ) : (
            <p className="text-center col-span-full text-gray-600 text-lg">
              هیچ طرحی برای این فیلتر یافت نشد.
            </p>
          )}
        </div>
        {!showAll ? (
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={handleShowMore}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              مشاهده بیشتر
            </button>
          </div>
        ) : (
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={handleShowLess}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
            >
              مشاهده کمتر
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPlans;
