/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { OnRun } from 'src/api/OnRun';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getStep1, createCart, updateCart } from 'src/api/step1';
import useNavigateStep from 'src/hooks/use-navigate-step';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import UseCartId from 'src/hooks/use-cartId';
import { Message } from './massage';
import Input from './input/input';

export default function Form() {
  const { cartId, setCartId } = UseCartId()
  
  // استفاده از useNavigateStep
  const { incrementPage } = useNavigateStep();

  const { data, error, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['cartDetail', cartId],
    queryFn: () => getStep1(cartId),
  });

  const mutation = useMutation({ mutationFn: () => createCart(localData, incrementPage) });
  const mutationUpdate = useMutation({
    mutationFn: () => updateCart(localData, incrementPage, cartId),
  });

  const [localData, setLocalData] = useState(() => data || {});

  useEffect(() => {

    if (isSuccess && data) {
      setLocalData(data.data.cart);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      toast.warning(error);
    }
  }, [isError]);

  const companyTypes = [
    { type: '8', title: ' سهامی خاص' },
    { type: '1', title: 'سهامی عام ' },
    { type: '3', title: 'تضامنی' },
    { type: '2', title: 'با مسئولیت محدود' },
    { type: '4', title: 'مختلط(سهامی عام و سهامی خاص) ' },
    { type: '6', title: ' تعاونی' },
    { type: '7', title: ' دانش بنیان ' },
    { type: '5', title: ' نسبی  ' },
  ];

  const formatNumber = (value) => String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const cleanNumber = (value) => String(value).replace(/,/g, '');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const cleanedValue = cleanNumber(value);
    setLocalData({ ...localData, [name]: cleanedValue });
  };

  const handleFileRemove = (type) => {
    setLocalData((prev) => {
      const updated = { ...prev };
      delete updated[type];
      return updated;
    });
  };

  const handleCompanyNameKeyDown = (e) => {
    if (!/^[A-Za-z\u0600-\u06FF\s]*$/.test(e.key)) {
      e.preventDefault();
    }
  };
  const handleNumberInput = (e) => {
    if (
      !/^[0-9]*$/.test(e.key) &&
      e.key !== 'Backspace' &&
      e.key !== 'ArrowLeft' &&
      e.key !== 'ArrowRight'
    ) {
      e.preventDefault();
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cartId) {
      mutation.mutateAsync();
      setCartId(cartId)
      console.log(cartId)


    } else {
      mutationUpdate.mutateAsync();

    }
  };


  if (isLoading) {
    return <p>loading ....</p>;
  }
  if (isError) {
    return <p>error ....</p>;
  }
  if (!data) {
    return <p>data ....</p>;
  }
  return (
    <>
      <div className="bg-gray-50  rounded-md mb-10 shadow-inner ">
        <Message cartId={cartId} />
      </div>
      <ToastContainer />
      <form
        dir="rtl"
        className="max-w-5xl  overflow-y-auto mx-auto p-8  bg-white rounded-lg shadow-xl"
      >
        <div className="bg-gray-200 text-white rounded-t-md p-2 text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-700">اطلاعات شرکت</h1>
        </div>

        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 text-nowrap gap-6 p-6 bg-white rounded-lg ">
          <div className="mb-6">
            <label className="block text-gray-800 text-xs font-semibold mb-2"
            >
              نام شرکت:

            </label>
            <input
              type="text"
              name="company_name"
              value={localData.company_name}
              disabled={localData.Lock_company_name}
              onChange={handleInputChange}
              onKeyDown={handleCompanyNameKeyDown}
              required
              className="shadow appearance-none disabled:bg-gray-200 border border-gray-300 rounded-lg w-full py-3 px-4 text-black leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-300 hover:border-indigo-300 transition-colors"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-800 text-xs font-semibold mb-2">نوع شرکت: </label>

            <select
              name="company_kind"
              value={localData.company_kind}
              disabled={localData.Lock_company_kind}
              onChange={handleInputChange}
              className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-black disabled:bg-slate-200 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-300 hover:border-indigo-300 transition-colors"
            >
              <option value="">انتخاب کنید</option>
              {companyTypes.map((typeObj, index) => (
                <option key={index} value={typeObj.type}>
                  {typeObj.title}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-800 text-xs font-semibold mb-2">شماره شناسه:</label>
            <input
              type="text"
              name="nationalid"
              disabled={localData.Lock_nationalid}
              value={localData.nationalid}
              onChange={handleInputChange}
              onKeyDown={handleNumberInput}
              maxLength={11}
              className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-black leading-tight disabled:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 hover:border-indigo-300 transition-colors"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-800 text-xs font-semibold mb-2">شماره ثبت:</label>
            <input
              type="text"
              name="registration_number"
              value={localData.registration_number}
              disabled={localData.Lock_registration_number}
              onChange={handleInputChange}
              onKeyDown={handleNumberInput}
              maxLength={11}
              className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-black leading-tight disabled:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 hover:border-indigo-300 transition-colors"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-800 text-xs font-semibold mb-2">
              سرمایه ثبتی (ریال):
            </label>
            <input
              type="text"
              name="registered_capital"
              value={formatNumber(localData.registered_capital)}
              disabled={localData.Lock_registered_capital}
              onChange={handleInputChange}
              className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-black leading-tight disabled:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 hover:border-indigo-300 transition-colors"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-800 text-xs font-semibold mb-2">
              شماره روزنامه رسمی آخرین مدیران:
            </label>
            <input
              type="number"
              name="newspaper"
              value={(localData.newspaper)}
              disabled={localData.Lock_newspaper}
            onChange={handleInputChange}
            className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-black leading-tight disabled:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 hover:border-indigo-300 transition-colors"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-800 text-xs font-semibold mb-2">
              تاریخ روزنامه رسمی:
            </label>
            <input
              type="number"
              name="date_newspaper"
              value={(localData.date_newspaper)}
              disabled={localData.Lock_date_newspaper}
              onChange={handleInputChange}
              className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-black leading-tight disabled:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 hover:border-indigo-300 transition-colors"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-800 text-xs font-semibold mb-2">تعداد کارکنان:</label>
            <input
              type="number"
              name="personnel"
              value={localData.personnel}
              disabled={localData.Lock_personnel}
              onChange={handleInputChange}
              className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-black leading-tight disabled:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 hover:border-indigo-300 transition-colors"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-800 text-xs font-semibold mb-2"> شهر:</label>
            <input
              type="text"
              name="city"
              value={localData.city}
              disabled={localData.Lock_city}
              onChange={handleInputChange}
              className="shadow  border border-gray-300 rounded-lg w-full py-3 px-4 text-black leading-tight disabled:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 hover:border-indigo-300 transition-colors"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-800 text-xs font-semibold mb-2">آدرس شرکت:</label>
            <input
              type="text"
              name="address"
              value={localData.address}
              disabled={localData.Lock_address}
              onChange={handleInputChange}
              className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-black leading-tight disabled:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 hover:border-indigo-300 transition-colors"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-800 text-xs font-semibold mb-2"> کدپستی:</label>
            <input
              type="text"
              name="postal_code"
              value={localData.postal_code}
              disabled={localData.Lock_postal_code}
              onChange={handleInputChange}
              onKeyDown={handleNumberInput}
              maxLength={10}
              className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-black leading-tight disabled:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 hover:border-indigo-300 transition-colors"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-800 text-xs font-semibold mb-2">ایمیل شرکت:</label>
            <input
              type="email"
              name="email"
              value={localData.email}
              disabled={localData.Lock_email}
              onChange={handleInputChange}
              className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-black leading-tight disabled:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 hover:border-indigo-300 transition-colors"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-800 text-xs font-semibold mb-2">
              موضوع فعالیت شرکت:
            </label>
            <input
              name="activity_industry"
              value={localData.activity_industry}
              disabled={localData.Lock_activity_industry}
              onChange={handleInputChange}
              className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-black leading-tight disabled:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 hover:border-indigo-300 transition-colors"
            />
          </div>

          <div className="col-span-full mt-8 flex flex-col justify-center items-center">
            <label className="block disabled:bg-gray-200 text-black text-xs font-medium mb-4 text-center">
              میزان منابع درخواستی (ریال):
            </label>
            <input
              type="range"
              name="amount_of_request"
              min={10000000000}
              max={250000000000}
              step={10000000000}
              value={localData.amount_of_request}
              disabled={localData.Lock_amount_of_request}
              onChange={handleInputChange}
              className="w-1/2"
            />
            <span className="block text-gray-700 text-xs mt-4 text-center font-medium">
              {formatNumber(localData.amount_of_request)} ریال
            </span>
          </div>
        </div>

        <div className="mt-10 ">
          <div className="bg-gray-200 text-white rounded-t-md p-2 text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-700">پیوست اسناد</h1>
          </div>

          <div className="flex flex-col items-center justify-center mb-8">
            <div className="flex items-center justify-center mb-8">
              <AiOutlineInfoCircle className="text-2xl text-red-600 mr-2" />
              <p className="text-xl text-red-600 font-semibold">
                حجم فایل می تواند 20 مگابایت باشد
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {/* Card for 1402 Reports */}
              <div className="bg-white p-6">
                <h2 className="text-center text-gray-700 text-xl border-b font-bold mb-6  pb-4">
                  گزارشات و مستندات منتهی به سال 1402
                </h2>

                {/* Financial Report */}
                <div className="mb-6">
                  <label className="block text-gray-700 text-xs font-medium mb-2">صورت مالی:</label>
                  {typeof localData.financial_report_lastyear === 'string' ? (
                    <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-inner">
                      <a
                        href={
                          localData.Lock_financial_report_lastyear
                            ? null
                            : `${OnRun}/${localData.financial_report_lastyear}`
                        }
                        onClick={(e) =>
                          localData.Lock_financial_report_lastyear && e.preventDefault()
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-xs font-medium ${localData.Lock_financial_report_lastyear
                            ? 'text-gray-400'
                            : 'text-blue-600 hover:text-blue-800'
                          }`}
                      >
                        1402 فایل صورت مالی
                      </a>
                      <button
                        type="button"
                        className="text-red-400 hover:text-red-600 disabled:text-gray-200"
                        onClick={() => handleFileRemove('financial_report_lastyear')}
                        disabled={localData.Lock_financial_report_lastyear}
                      >
                        حذف
                      </button>
                    </div>
                  ) : (
                    <input
                      name="financial_report_lastyear"
                      type="file"
                      onChange={(e) =>
                        setLocalData({ ...localData, financial_report_lastyear: e.target.files[0] })
                      }
                      disabled={localData.Lock_financial_report_lastyear}
                      className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                  )}
                </div>

                {/* Audit Report */}
                <div className="mb-6">
                  <label className="block text-gray-700 text-xs font-medium mb-2">
                    حسابرسی گزارش:
                  </label>
                  {typeof localData.audit_report_lastyear === 'string' ? (
                    <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-inner">
                      <a
                        href={
                          localData.Lock_audit_report_lastyear
                            ? null
                            : `${OnRun}/${localData.audit_report_lastyear}`
                        }
                        onClick={(e) => localData.Lock_audit_report_lastyear && e.preventDefault()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-xs font-medium ${localData.Lock_audit_report_lastyear
                            ? 'text-gray-400'
                            : 'text-blue-600 hover:text-blue-800'
                          }`}
                      >
                        1402فایل گزارش حسابرسی
                      </a>
                      <button
                        type="button"
                        className="text-red-400 hover:text-red-600 disabled:text-gray-200"
                        onClick={() => handleFileRemove('audit_report_lastyear')}
                        disabled={localData.Lock_audit_report_lastyear}
                      >
                        حذف
                      </button>
                    </div>
                  ) : (
                    <input
                      name="audit_report_lastyear"
                      type="file"
                      onChange={(e) =>
                        setLocalData({ ...localData, audit_report_lastyear: e.target.files[0] })
                      }
                      disabled={localData.Lock_audit_report_lastyear}
                      className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                  )}
                </div>

                {/* Statement */}
                <div className="mb-6">
                  <label className="block text-gray-700 text-xs font-medium mb-2">اظهارنامه:</label>
                  {typeof localData.statement_lastyear === 'string' ? (
                    <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-inner">
                      <a
                        href={
                          localData.Lock_statement_lastyear
                            ? null
                            : `${OnRun}/${localData.statement_lastyear}`
                        }
                        onClick={(e) => localData.Lock_statement_lastyear && e.preventDefault()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-xs font-medium ${localData.Lock_statement_lastyear
                            ? 'text-gray-400'
                            : 'text-blue-600 hover:text-blue-800'
                          }`}
                      >
                        1402 فایل اظهارنامه
                      </a>
                      <button
                        type="button"
                        className="text-red-400 hover:text-red-600 disabled:text-gray-200"
                        onClick={() => handleFileRemove('statement_lastyear')}
                        disabled={localData.Lock_statement_lastyear}
                      >
                        حذف
                      </button>
                    </div>
                  ) : (
                    <input
                      name="statement_lastyear"
                      type="file"
                      onChange={(e) =>
                        setLocalData({ ...localData, statement_lastyear: e.target.files[0] })
                      }
                      disabled={localData.Lock_statement_lastyear}
                      className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                  )}
                </div>
              </div>

              {/* Card for 1401 Reports */}
              <div className="bg-white   p-6">
                <h2 className="text-center text-gray-700 text-xl font-bold mb-6 border-b pb-4">
                  گزارشات و مستندات منتهی به سال 1401
                </h2>

                {/* Financial Report */}
                <div className="mb-6">
                  <label className="block text-gray-700 text-xs font-medium mb-2">صورت مالی:</label>
                  {typeof localData.financial_report_yearold === 'string' ? (
                    <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-inner">
                      <a
                        href={
                          localData.Lock_financial_report_yearold
                            ? null
                            : `${OnRun}/${localData.financial_report_yearold}`
                        }
                        onClick={(e) =>
                          localData.Lock_financial_report_yearold && e.preventDefault()
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-xs font-medium ${localData.Lock_financial_report_yearold
                            ? 'text-gray-400'
                            : 'text-blue-600 hover:text-blue-800'
                          }`}
                      >
                        1401 فایل صورت مالی
                      </a>
                      <button
                        type="button"
                        className="text-red-400 hover:text-red-600 disabled:text-gray-200"
                        onClick={() => handleFileRemove('financial_report_yearold')}
                        disabled={localData.Lock_financial_report_yearold}
                      >
                        حذف
                      </button>
                    </div>
                  ) : (
                    <input
                      name="financial_report_yearold"
                      type="file"
                      onChange={(e) =>
                        setLocalData({ ...localData, financial_report_yearold: e.target.files[0] })
                      }
                      disabled={localData.Lock_financial_report_yearold}
                      className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                  )}
                </div>

                {/* Audit Report */}
                <div className="mb-6">
                  <label className="block text-gray-700 text-xs font-medium mb-2">
                    حسابرسی گزارش:
                  </label>
                  {typeof localData.audit_report_yearold === 'string' ? (
                    <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-inner">
                      <a
                        href={
                          localData.Lock_audit_report_yearold
                            ? null
                            : `${OnRun}/${localData.audit_report_yearold}`
                        }
                        onClick={(e) => localData.Lock_audit_report_yearold && e.preventDefault()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-xs font-medium ${localData.Lock_audit_report_yearold
                            ? 'text-gray-400'
                            : 'text-blue-600 hover:text-blue-800'
                          }`}
                      >
                        1401فایل گزارش حسابرسی
                      </a>
                      <button
                        type="button"
                        className="text-red-400 hover:text-red-600 disabled:text-gray-200"
                        onClick={() => handleFileRemove('audit_report_yearold')}
                        disabled={localData.Lock_audit_report_yearold}
                      >
                        حذف
                      </button>
                    </div>
                  ) : (
                    <input
                      name="audit_report_yearold"
                      type="file"
                      onChange={(e) =>
                        setLocalData({ ...localData, audit_report_yearold: e.target.files[0] })
                      }
                      disabled={localData.Lock_audit_report_yearold}
                      className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                  )}
                </div>

                {/* Statement */}
                <div className="mb-6">
                  <label className="block text-gray-700 text-xs font-medium mb-2">اظهارنامه:</label>
                  {typeof localData.statement_yearold === 'string' ? (
                    <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-inner">
                      <a
                        href={
                          localData.Lock_statement_yearold
                            ? null
                            : `${OnRun}/${localData.statement_yearold}`
                        }
                        onClick={(e) => localData.Lock_statement_yearold && e.preventDefault()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-xs font-medium ${localData.Lock_statement_yearold
                            ? 'text-gray-400'
                            : 'text-blue-600 hover:text-blue-800'
                          }`}
                      >
                        1401 فایل اظهارنامه
                      </a>
                      <button
                        type="button"
                        className="text-red-400 hover:text-red-600 disabled:text-gray-200"
                        onClick={() => handleFileRemove('statement_yearold')}
                        disabled={localData.Lock_statement_yearold}
                      >
                        حذف
                      </button>
                    </div>
                  ) : (
                    <input
                      name="statement_yearold"
                      type="file"
                      onChange={(e) =>
                        setLocalData({ ...localData, statement_yearold: e.target.files[0] })
                      }
                      disabled={localData.Lock_statement_yearold}
                      className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                  )}
                </div>
              </div>

              {/* Card for Up-to-Date Reports */}
              <div className="bg-white  p-6">
                <h2 className="text-center text-gray-700 text-xl font-bold mb-6 border-b pb-4">
                  گزارشات و مستندات به روز
                </h2>

                {/* Alignment 6 Columns */}

                <div className="mb-6">
                  <label className="block text-gray-700 text-xs font-medium mb-2">
                    تراز6ستونی:
                  </label>
                  {typeof localData.alignment_6columns_thisyear === 'string' ? (
                    <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-inner">
                      <a
                        href={
                          localData.Lock_alignment_6columns_thisyear
                            ? null
                            : `${OnRun}/${localData.alignment_6columns_thisyear}`
                        }
                        onClick={(e) =>
                          localData.Lock_alignment_6columns_thisyear && e.preventDefault()
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-xs font-medium ${localData.Lock_alignment_6columns_thisyear
                            ? 'text-gray-400'
                            : 'text-blue-600 hover:text-blue-800'
                          }`}
                      >
                        فایل تراز 6ستونی
                      </a>
                      <button
                        type="button"
                        className="text-red-400 hover:text-red-600 disabled:text-gray-200"
                        onClick={() => handleFileRemove('alignment_6columns_thisyear')}
                        disabled={localData.Lock_alignment_6columns_thisyear}
                      >
                        حذف
                      </button>
                    </div>
                  ) : (
                    <input
                      name="alignment_6columns_thisyear"
                      type="file"
                      onChange={(e) =>
                        setLocalData({
                          ...localData,
                          alignment_6columns_thisyear: e.target.files[0],
                        })
                      }
                      disabled={localData.Lock_alignment_6columns_thisyear}
                      className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                  )}
                </div>
              </div>
              <div className="bg-white  p-6">
                <h2 className="text-center text-gray-700 text-xl font-bold mb-6 border-b pb-4">
                  لوگوی شرکت
                </h2>

                {/* Alignment 6 Columns */}

                <div className="mb-6">
                  <label className="block text-gray-700 text-xs font-medium mb-2">
                    لوگو:
                  </label>
                  {typeof localData.logo === 'string' ? (
                    <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-inner">
                      <a
                        href={
                          localData.Lock_logo
                            ? null
                            : `${OnRun}/${localData.logo}`
                        }
                        onClick={(e) =>
                          localData.Lock_logo && e.preventDefault()
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-xs font-medium ${localData.Lock_logo
                            ? 'text-gray-400'
                            : 'text-blue-600 hover:text-blue-800'
                          }`}
                      >
                        فایل  لوگو
                      </a>
                      <button
                        type="button"
                        className="text-red-400 hover:text-red-600 disabled:text-gray-200"
                        onClick={() => handleFileRemove('logo')}
                        disabled={localData.Lock_logo}
                      >
                        حذف
                      </button>
                    </div>
                  ) : (
                    <input
                      name="logo"
                      type="file"
                      onChange={(e) =>
                        setLocalData({
                          ...localData,
                          logo: e.target.files[0],
                        })
                      }
                      disabled={localData.Lock_logo}
                      className="shadow appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" flex justify-center mt-8">
          <button
            onClick={handleSubmit}
            type="submit"
            className={`bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-8 rounded-full shadow-xl transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
          >
            {mutation.isLoading ? 'در حال بارگذاری...' : 'درخواست بررسی اولیه'}
          </button>
        </div>
      </form>
    </>
  );
}
