import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie } from 'src/api/cookie';
import moment from 'jalali-moment';
import CartPlan from './cartPlan';
import UsePlans from '../service/use-plans';

const CartPlans = () => {
  const { data } = UsePlans();
  const access = getCookie('access');
  const navigate = useNavigate();

  useEffect(() => {
    if (!access) {
      navigate('/login');
    }
  }, [access, navigate]);

  if (!data || data.length === 0) {
    return <p>هیچ درخواستی یافت نشد.</p>;
  }

  return (
    <div className="flex  justify-between ">
      <div className="max-w-7xl w-full bg-white rounded-lg shadow-2xl p-6">
        <div className="bg-gray-200 text-white rounded-t-md p-4 text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-700">طرح ها</h1>
        </div>
        <div className="flex-col sm:flex space-y-12 gap-12 justify-center text-right ">
          {data.map((item) => {
            const persianCreationDate = moment(item.creation_date)
              .locale('fa')
              .format('YYYY/MM/DD');

            return (
              <CartPlan
                key={item.id}
                trace_code={item.trace_code}
                persianName={item.persian_name}
                englishName={item.english_name}
                industryGroup={item.industry_group_description}
                totalUnits={item.total_units}
                totalPrice={item.total_price}
                crowdFundingType={item.crowd_funding_type_description}
                projectStatus={item.project_status_description}
                settlementDescription={item.settlement_description}
                realPersonMinPrice={item.real_person_minimum_availabe_price}
                realPersonMaxPrice={item.real_person_maximum_available_price}
                crowdFundingtypeDescription={item.crowd_funding_type_description}
                creation_date={persianCreationDate}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CartPlans;
