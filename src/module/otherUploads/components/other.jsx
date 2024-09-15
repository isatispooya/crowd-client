/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState} from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

import { OnRun } from 'src/api/OnRun';
import { getCookie } from 'src/api/cookie';
import UseCartId from 'src/hooks/use-cartId';
import useNavigateStep from 'src/hooks/use-navigate-step';
import SmallLoader from 'src/components/SmallLoader';
import { getFormData } from '../utils/getFormData';
import useFetchData from '../hooks/fetchData';
import Inputs from '../Feature/inputs';

const Other = () => {
  const { cartId } = UseCartId();
  const { incrementPage } = useNavigateStep();

  const [Data, setData] = useState({
    Lock_claims_status: false,
    Lock_announcement_of_changes_managers: false,
    Lock_announcement_of_changes_capital: false,
    Lock_bank_account_turnover: false,
    Lock_statutes: false,
    Lock_assets_and_liabilities: false,
    Lock_latest_insurance_staf: false,
    claims_status: null,
    latest_insurance_staf: null,
    assets_and_liabilities: null,
    statutes: null,
    bank_account_turnover: null,
    announcement_of_changes_capital: null,
    announcement_of_changes_managers: null,
  });

  const { isLoading, data } = useFetchData(cartId);

  if (isLoading && !data) {
    return <SmallLoader />;
  }

  if (data && !Data) {
    setData(data);
  }

  const handleFileRemove = (field) => {
    setData({ ...Data, [field]: null });
  };

  const handleSubmit = async () => {
    try {
      const formData = getFormData(Data);

      const access = await getCookie('access');

      await axios.post(`${OnRun}/api/addinformation/${cartId}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${access}`,
        },

        maxBodyLength: Infinity,
      });

      toast.success('اطلاعات با موفقیت ارسال شد!');

      incrementPage();
    } catch (error) {
      console.error('خطا در ارسال اطلاعات:', error);
      toast.error('خطا در ارسال اطلاعات');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        <ToastContainer />
        <div className="bg-white w-1/2 items-center  shadow-2xl rounded-lg p-6 ">
          <div className="bg-gray-200 w-full text-white rounded-t-md p-2 text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-700"> پیوست موارد دیگر</h1>
          </div>

          {/* Financial Report */}
           
          <Inputs Data={Data} setData={setData}/>
   
          <div className="flex  flex-col  w-full justify-center  items-center ">
            <button
              onClick={handleSubmit}
              className=" items-center text-center w-full px-4 py-2 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600 transition-all"
            >
              ثبت
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Other;
