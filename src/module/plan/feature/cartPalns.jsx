import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie } from 'src/api/cookie';
import FilterPlans from 'src/components/filtring';
import useGetPlans from '../service/use-plans';
import PlanCart from './paln.cart';

const CartPlans = () => {
  const { data } = useGetPlans();
  const access = getCookie('access');
  const navigate = useNavigate();
  const [filterStatusSecond, setFilterStatusSecond] = useState([]);

  useEffect(() => {
    if (!access) {
      navigate('/login');
    }
  }, [access, navigate]);

  if (!data || data.length === 0) {
    return <p>هیچ درخواستی یافت نشد.</p>;
  }

  const filteredPlans =
    filterStatusSecond.length > 0
      ? data.filter((item) =>
          filterStatusSecond.includes(item?.information_complete?.status_second)
        )
      : data;

  const reversedPlans = filteredPlans.slice().reverse();

  return (
    <>
      <div className="bg-gray-200  text-white rounded-t-md p-2 md:p-4 lg:p-6 text-center ">
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-gray-700">طرح‌ها</h1>
      </div>
      <div className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-700 z-10">
        <FilterPlans setFilterStatusSecond={setFilterStatusSecond} />
      </div>
      <div className="container mx-auto px-4 py-8 ">
        <div className="bg-white rounded-lg shadow-2xl p-4">
          <div className="flex flex-wrap grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reversedPlans.length > 0 ? (
              reversedPlans.map((item) => {
                if (item?.information_complete?.status_show === true) {
                  return (
                    <div key={item.plan.id} className="flex">
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
        </div>
      </div>
    </>
  );
};

export default CartPlans;
