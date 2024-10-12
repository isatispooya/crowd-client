import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie } from 'src/api/cookie';
import moment from 'jalali-moment';
import CartPlan from './cartPlan';
import UsePlans from '../service/use-plans';

const calculateDateDifference = (startDate, endDate) => {
  const today = new Date(); 
  const StartDate = new Date(startDate);
  const EndeDate = new Date(endDate);

  let differenceInDays;
  let message;

  if (StartDate > today) {
    const differenceInTime = StartDate.getTime() - today.getTime(); 
    differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    message = ` ${differenceInDays} روز مانده به شروع `;
  } else if (EndeDate > today){
    const differenceInTime = EndeDate.getTime() - today.getTime(); 
    differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    message = ` ${differenceInDays} روز مانده به پایان `;
  }else {
    message = 'طرح مورد نظر منقضی شده .';
  }

  return { differenceInDays, message };
};

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
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-7xl w-full bg-white rounded-lg shadow-2xl p-6">
        <div className="bg-gray-200 text-white rounded-t-md p-4 text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-700">طرح ها</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 justify-center text-right">
          {data.map((item) => {
            const { differenceInDays, message } = calculateDateDifference(
              item.plan.approved_underwriting_start_date,
              item.plan.approved_underwriting_end_date
            );

            const persianCreationDate = item.plan.creation_date
              ? moment(item.plan.creation_date).locale('fa').format('YYYY/MM/DD')
              : 'تاریخ نامعتبر';

            return (
              <div key={item.plan.id}>
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
                  company={item?.company[0]?.name}
                  date={differenceInDays}
                  message={message}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CartPlans;
