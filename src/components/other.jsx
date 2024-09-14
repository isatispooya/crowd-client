/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState , useEffect} from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import { OnRun } from 'src/api/OnRun';
import { getCookie } from 'src/api/cookie';
import UseCartId from 'src/hooks/use-cartId';
import useNavigateStep from 'src/hooks/use-navigate-step'; // وارد کردن هوک


const getFormData = (data) => {
  const formData = new FormData();

  const fileFields = [
    'claims_status',
    'latest_insurance_staf',
    'assets_and_liabilities',
    'statutes',
    'bank_account_turnover',
    'announcement_of_changes_capital',
    'announcement_of_changes_managers',
  ];

  fileFields.forEach((field) => {
    if (data[field] && typeof data[field] !== 'string') {
      formData.append(field, data[field]);
    }
  });

  return formData;
};

const Other = () => {
  const {cartId} = UseCartId()
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
  // استفاده از useNavigateStep
  const { incrementPage } = useNavigateStep();

  // eslint-disable-next-line no-shadow
  const fetchData = async (cartId) => {

    const access = await getCookie('access');
      const response = await axios.get(`${OnRun}/api/addinformation/${cartId}/`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
      return  response.data;
  };
const {isLoading, data}=useQuery({
    queryKey: ['fetchData', cartId],
    queryFn: () => fetchData(cartId),
  });


  useEffect(()=>{
if (data && !isLoading){
  setData(data)

}
  },[data])

  if (isLoading && !Data && !data)
    return <p className="text-gray-600 animate-pulse">در حال بارگذاری...</p>;

  const handleFileRemove = (field) => {
    setData({ ...Data, [field]: null });
  };


  const handleSubmit = async () => {
    try {
      const formData = getFormData(Data);

      const access = await getCookie('access');
      
      await axios.post(`${OnRun}/api/addinformation/${cartId}/`,formData, {
        
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${access}`,
        },

        maxBodyLength: Infinity,
      });

      toast.success('اطلاعات با موفقیت ارسال شد!');
      // بعد از ارسال موفقیت‌آمیز، به مرحله بعدی بروید
      incrementPage();
    } catch (error) {
      console.error('خطا در ارسال اطلاعات:', error);
      toast.error('خطا در ارسال اطلاعات');
    }
  };

  // useEffect(() => {
  //   fetchData(cardSelected);
  // }, [cardSelected]);

  return (
    <div>
      <div className="flex items-center justify-center">
        <ToastContainer />
        <div className="bg-white w-1/2 items-center  shadow-2xl rounded-lg p-6 ">
          <div className="bg-gray-200 w-full text-white rounded-t-md p-2 text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-700"> پیوست موارد دیگر</h1>
          </div>

          {/* Financial Report */}

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2"> وضعیت دعاوی:</label>

            { Data && Data.claims_status && typeof Data.claims_status === 'string' ? (

              <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-inner">
                <a
                  href={Data.Lock_claims_status
                    ? null : `${OnRun}/${Data.claims_status
                  }`}
                  onClick={(e) => Data.Lock_claims_status
                    && e.preventDefault()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm font-medium ${
                    Data.Lock_claims_status
                    ? 'text-gray-400' : 'text-blue-600 hover:text-blue-800'
                  }`}
                >
                  فایل وضعیت دعاوی
                </a>
                <button
                  type="button"
                  className="text-red-400 hover:text-red-600 disabled:text-gray-200"
                  onClick={() => handleFileRemove('claims_status')}
                  disabled={Data.Lock_claims_status}
                >
                  حذف
                </button>
              </div>
            ) : (
              <input
                name="financial_report_yearold"
                type="file"
                onChange={(e) => setData({ ...Data, claims_status: e.target.files[0] })}
                disabled={Data.claims_status}
                className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            )}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              آخرین لیست بیمه کارکنان:
            </label>
            {Data && typeof Data.latest_insurance_staf === 'string' ? (
              <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-inner">
                <a
                  href={
                    Data.Lock_latest_insurance_staf
                      ? null
                      : `${OnRun}/${Data.latest_insurance_staf}`
                  }
                  onClick={(e) => Data.Lock_latest_insurance_staf && e.preventDefault()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm font-medium ${
                    Data.Lock_latest_insurance_staf
                      ? 'text-gray-400'
                      : 'text-blue-600 hover:text-blue-800'
                  }`}
                >
                  فایل لیست بیمه کارکنان
                </a>
                <button
                  type="button"
                  className="text-red-400 hover:text-red-600 disabled:text-gray-200"
                  onClick={() => handleFileRemove('latest_insurance_staf')}
                  disabled={Data.Lock_latest_insurance_staf}
                >
                  حذف
                </button>
              </div>
            ) : (
              <input
                name="latest_insurance_staf"
                type="file"
                onChange={(e) => setData({ ...Data, latest_insurance_staf: e.target.files[0] })}
                disabled={Data.Lock_latest_insurance_staf}
                className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            )}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              لیست دارایی ها و بدهی ها:
            </label>
            {Data && typeof Data.assets_and_liabilities === 'string' ? (
              <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-inner">
                <a
                  href={
                    Data.Lock_assets_and_liabilities
                      ? null
                      : `${OnRun}/${Data.assets_and_liabilities}`
                  }
                  onClick={(e) => Data.Lock_assets_and_liabilities && e.preventDefault()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm font-medium ${
                    Data.Lock_assets_and_liabilities
                      ? 'text-gray-400'
                      : 'text-blue-600 hover:text-blue-800'
                  }`}
                >
                  فایل لیست دارایی ها و بدهی ها
                </a>
                <button
                  type="button"
                  className="text-red-400 hover:text-red-600 disabled:text-gray-200"
                  onClick={() => handleFileRemove('assets_and_liabilities')}
                  disabled={Data.Lock_assets_and_liabilities}
                >
                  حذف
                </button>
              </div>
            ) : (
              <input
                name="statement_yearold"
                type="file"
                onChange={(e) => setData({ ...Data, assets_and_liabilities: e.target.files[0] })}
                disabled={Data.Lock_assets_and_liabilities}
                className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2"> اساسنامه:</label>
            {Data && typeof Data.statutes === 'string' ? (
              <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-inner">
                <a
                  href={Data.Lock_statutes ? null : `${OnRun}/${Data.statutes}`}
                  onClick={(e) => Data.Lock_statutes && e.preventDefault()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm font-medium ${
                    Data.Lock_statutes ? 'text-gray-400' : 'text-blue-600 hover:text-blue-800'
                  }`}
                >
                  فایل اساسنامه
                </a>
                <button
                  type="button"
                  className="text-red-400 hover:text-red-600 disabled:text-gray-200"
                  onClick={() => handleFileRemove('statutes')}
                  disabled={Data.Lock_statutes}
                >
                  حذف
                </button>
              </div>
            ) : (
              <input
                name="statutes"
                type="file"
                onChange={(e) => setData({ ...Data, statutes: e.target.files[0] })}
                disabled={Data.statutes}
                className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            )}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              {' '}
              گردش حسابهای مالی اصلی شرکت:
            </label>
            {Data && typeof Data.bank_account_turnover === 'string' ? (
              <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-inner">
                <a
                  href={
                    Data.Lock_bank_account_turnover
                      ? null
                      : `${OnRun}/${Data.bank_account_turnover}`
                  }
                  onClick={(e) => Data.Lock_bank_account_turnover && e.preventDefault()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm font-medium ${
                    Data.Lock_bank_account_turnover
                      ? 'text-gray-400'
                      : 'text-blue-600 hover:text-blue-800'
                  }`}
                >
                  فایل گردش حسابهای بانکی اصلی شرکت
                </a>
                <button
                  type="button"
                  className="text-red-400 hover:text-red-600 disabled:text-gray-200"
                  onClick={() => handleFileRemove('bank_account_turnover')}
                  disabled={Data.Lock_bank_account_turnover}
                >
                  حذف
                </button>
              </div>
            ) : (
              <input
                name="bank_account_turnover"
                type="file"
                onChange={(e) => setData({ ...Data, bank_account_turnover: e.target.files[0] })}
                disabled={Data.Lock_bank_account_turnover}
                className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            )}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              {' '}
              آگهی آخرین تغییرات سرمایه ای:
            </label>
            {Data && typeof Data.announcement_of_changes_capital === 'string' ? (
              <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-inner">
                <a
                  href={
                    Data.Lock_announcement_of_changes_capital
                      ? null
                      : `${OnRun}/${Data.announcement_of_changes_capital}`
                  }
                  onClick={(e) => Data.Lock_announcement_of_changes_capital && e.preventDefault()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm font-medium ${
                    Data.Lock_announcement_of_changes_capital
                      ? 'text-gray-400'
                      : 'text-blue-600 hover:text-blue-800'
                  }`}
                >
                  فایل آگهی آخرین تغییرات سرمایه ای
                </a>
                <button
                  type="button"
                  className="text-red-400 hover:text-red-600 disabled:text-gray-200"
                  onClick={() => handleFileRemove('announcement_of_changes_managers ')}
                  disabled={Data.Lock_announcement_of_changes_capital}
                >
                  حذف
                </button>
              </div>
            ) : (
              <input
                name="announcement_of_changes_capital"
                type="file"
                onChange={(e) =>
                  setData({
                    ...Data,
                    announcement_of_changes_capital: e.target.files[0],
                  })
                }
                disabled={Data.Lock_announcement_of_changes_capital}
                className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            )}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              {' '}
              آگهی آخرین تغییرات مدیران:
            </label>
            {Data && typeof Data.announcement_of_changes_managers === 'string' ? (
              <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-inner">
                <a
                  href={
                    Data.Lock_announcement_of_changes_managers
                      ? null
                      : `${OnRun}/${Data.announcement_of_changes_managers}`
                  }
                  onClick={(e) => Data.Lock_announcement_of_changes_managers && e.preventDefault()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm font-medium ${
                    Data.Lock_announcement_of_changes_managers
                      ? 'text-gray-400'
                      : 'text-blue-600 hover:text-blue-800'
                  }`}
                >
                  فایل آگهی آخرین تغییرات مدیران
                </a>
                <button
                  type="button"
                  className="text-red-400 hover:text-red-600 disabled:text-gray-200"
                  onClick={() => handleFileRemove('announcement_of_changes_managers')}
                  disabled={Data.Lock_announcement_of_changes_managers}
                >
                  حذف
                </button>
              </div>
            ) : (
              <input
                name="statement_yearold"
                type="file"
                onChange={(e) =>
                  setData({
                    ...Data,
                    announcement_of_changes_managers: e.target.files[0],
                  })
                }
                disabled={Data.Lock_announcement_of_changes_managers}
                className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            )}
          </div>
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
