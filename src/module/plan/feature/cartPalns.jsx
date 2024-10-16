import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie } from 'src/api/cookie';
import moment from 'jalali-moment';
import FilterPlans from 'src/components/filtring';
import useGetPlans from '../service/use-plans';
import CartPlan from './cartPlan';

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
    return <p className="text-center text-lg mt-4">هیچ درخواستی یافت نشد.</p>;
  }

  const filteredPlans =
    filterStatusSecond.length > 0
      ? data.filter((item) =>
          filterStatusSecond.includes(item?.information_complete?.status_second)
        )
      : data;

  return (
    <div className="flex  items-center min-h-screen bg-gray-50 p-4">
      <div className="max-w-8xl w-full bg-white rounded-lg shadow-2xl p-6">
        <div className="bg-gray-200 text-white rounded-t-md p-4 text-center shadow-2xl">
          <h1 className="text-3xl font-bold text-gray-700">طرح ها</h1>
        </div>

        <div className="bg-gray-100 shadow-inner p-4 text-center mb-10">
          <div className="text-2xl font-semibold text-gray-700">
            <FilterPlans setFilterStatusSecond={setFilterStatusSecond} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans.length > 0 ? (
            filteredPlans.map((item) => {
              const persianCreationDate = item.plan?.creation_date
                ? moment(item.plan?.creation_date).locale('fa').format('YYYY/MM/DD')
                : 'تاریخ نامعتبر';

              if (item?.information_complete?.status_show === true) {

                return (
                  <div
                    key={item.plan.id}
                    className=" p-4  transition-transform transform hover:scale-105"
                  >
                    <CartPlan
                      trace_code={item.plan.trace_code}
                      persianName={item.plan.persian_name}
                      englishName={item.plan.english_name}
                      industryGroup={item.plan.industry_group_description}
                      totalUnits={item.plan.total_units}
                      totalPrice={item.plan.total_price}
                      crowdFundingType={item.plan.crowd_funding_type_description}
                      projectStatus={item.plan.project_status_description}
                      settlementDescription={item.plan.settlement_description}
                      realPersonMinPrice={item.plan.real_person_minimum_availabe_price}
                      realPersonMaxPrice={item.plan.real_person_maximum_available_price}
                      crowdFundingtypeDescription={item.plan.crowd_funding_type_description}
                      creation_date={persianCreationDate}
                      persoanApprovedSymbol={item.plan.persoan_approved_symbol}
                      statusSecond={item?.information_complete?.status_second}
                      amountCollectedNow={item?.information_complete?.amount_collected_now}
                      rateOfReturn={item?.information_complete?.rate_of_return}
                      company={item?.company[0]?.name}
                      startDate={item.plan.suggested_underwriting_start_date}
                      endDate={item.plan.suggested_underwriting_end_date}
                      statusShow={item?.information_complete?.status_show}
                    />
                  </div>
                );
              }
              return null;
            })
          ) : (
            <p className="text-center text-lg mt-4">هیچ طرحی برای این فیلتر یافت نشد.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPlans;
