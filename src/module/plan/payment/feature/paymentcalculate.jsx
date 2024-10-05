import React from 'react';
import Loader from 'src/components/loader';
import { useParams } from 'react-router-dom';
import moment from 'jalali-moment';
import { FaCheck } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import useGetPayment from '../service/use-getpayment';

const PaymentCalculate = () => {
  const { traceCode } = useParams();

  const { data, isLoading } = useGetPayment(traceCode);

  if (isLoading) {
    return <Loader />;
  }

  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500">شما هنوز دارایی ندارید</p>;
  }

  return (
    <div className="flex flex-col gap-6 bg-gray-100 p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h4 className="text-3xl text-center font-bold text-gray-900 mb-6">دارایی‌ها</h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((item) => {
          const persianCreationDate = moment(item.create_date).locale('fa').format('YYYY/MM/DD');

          return (
            <div key={item.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-6">
                <div className="flex-1">
                  <p className="text-gray-700 font-semibold">
                    مبلغ:{' '}
                    <span className="text-blue-600">{item.amount.toLocaleString()} تومان</span>
                  </p>
                  <p className="text-gray-700 font-semibold">
                    مقدار: <span className="text-blue-600">{item.value.toLocaleString()}</span>
                  </p>
                  <p className="text-gray-700 font-semibold">
                    تاریخ: <span className="text-blue-600">{persianCreationDate}</span>
                  </p>
                  <p className=" flex text-gray-700 font-semibold">
                    وضعیت:
                    <span className={item.status ? 'text-green-600' : 'text-red-600'}>
                      {item.status ? <FaCheck className="w-6 h-6" /> : <IoClose />}
                    </span>
                  </p>
                  <p className="text-gray-700 font-semibold">
                    نوع پرداخت:{' '}
                    <span className={item.document ? 'text-blue-600' : 'text-red-600'}>
                      {item.document ? 'فیش بانکی' : ''}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentCalculate;
