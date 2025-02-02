import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie } from 'src/api/cookie';
import moment from 'jalali-moment';
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
      <div className="flex justify-center items-center ">
        <div className="max-w-8xl w-full bg-white rounded-lg shadow-2xl p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center text-right">
            {reversedPlans.length > 0 ? (
              reversedPlans.map((item) => {
                const persianCreationDate = item.plan?.creation_date
                  ? moment(item.plan?.creation_date).locale('fa').format('YYYY/MM/DD')
                  : 'تاریخ نامعتبر';

                if (item?.information_complete?.status_show === true) {
                  return (
                    <div key={item.plan.id}>
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
              <p>هیچ طرحی برای این فیلتر یافت نشد.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPlans;
