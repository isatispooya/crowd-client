/* eslint-disable react/button-has-type */
/* eslint-disable import/order */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import useNavigateStep from 'src/hooks/use-navigate-step'; // وارد کردن هوک

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCookie } from 'src/api/cookie';
import axios from 'axios';
import { OnRun } from 'src/api/OnRun';
import ValidateRow from './validateRow'; 
import UseCartId from 'src/hooks/use-cartId';

const ValditionList = () => {
  const { cartId } = UseCartId();
  const [validateList, setValidateList] = useState([]);
  // استفاده از useNavigateStep
  const { incrementPage } = useNavigateStep();

  const fetchManagerData = async () => {
    try {
      const access = await getCookie('access');
      const response = await axios.get(`${OnRun}/api/validation/${cartId}/`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
      console.log("vvvv", response.data)
      if (response.data) {
        setValidateList(response.data.managers);
      }
    } catch (error) {
      console.error('خطا در دریافت اطلاعات:', error);
      toast.error('خطا در دریافت اطلاعات');
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append('file_validation', validateList.file_validation || '');

      validateList.forEach((element, index) => {
        if (element.file_manager) {
          formData.append(`managers[${index}][file_manager]`, element.file_manager);
        }
        formData.append(`managers[${index}][name]`, element.name);
        formData.append(`managers[${index}][national_code]`, element.national_code);
      });


      toast.success('اطلاعات با موفقیت ارسال شد!');
      incrementPage(); // انتقال به مرحله بعدی
    } catch (error) {
      console.error('خطا در ارسال اطلاعات:', error);
      toast.error('خطا در ارسال اطلاعات');
    }
  };




  useEffect(() => {
    fetchManagerData();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="bg-gray-200 w-full text-white rounded-t-md p-2 text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-700">اعتبار سنجی</h1>
      </div>
      <ToastContainer />
      <div className="rounded-lg shadow-inner">
        {validateList.map((item, index) => (
          <div key={index}>
            <ValidateRow index={index} list={validateList} item={item} setList={setValidateList} />
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-center items-center mt-10">
        <button
          onClick={handleSubmit}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600 transition-all"
        >
          ثبت
        </button>
      </div>
    </div>
  );
};

export default ValditionList;
