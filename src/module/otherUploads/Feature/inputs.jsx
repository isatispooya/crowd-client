/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { OnRun } from 'src/api/OnRun';

const Inputs = ({ Data, setData }) => {
  const handleFileRemove = (field) => {
    setData({ ...Data, [field]: null });
  };
  return (
    <>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-medium mb-2"> وضعیت دعاوی:</label>

        {Data && Data.claims_status && typeof Data.claims_status === 'string' ? (
          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-inner">
            <a
              href={Data.Lock_claims_status ? null : `${OnRun}/${Data.claims_status}`}
              onClick={(e) => Data.Lock_claims_status && e.preventDefault()}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm font-medium ${
                Data.Lock_claims_status ? 'text-gray-400' : 'text-blue-600 hover:text-blue-800'
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
                Data.Lock_latest_insurance_staf ? null : `${OnRun}/${Data.latest_insurance_staf}`
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
                Data.Lock_assets_and_liabilities ? null : `${OnRun}/${Data.assets_and_liabilities}`
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
                Data.Lock_bank_account_turnover ? null : `${OnRun}/${Data.bank_account_turnover}`
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
    </>
  );
};

Inputs.propTypes = {
  Data: PropTypes.isRequired,
  setData: PropTypes.isRequired,
};

export default Inputs;
