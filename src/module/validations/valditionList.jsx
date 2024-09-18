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
  const { incrementPage } = useNavigateStep();

  const fetchManagerData = async () => {
    try {
      const access = await getCookie('access');
      const response = await axios.get(`${OnRun}/api/validation/${cartId}/`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });   

      if (response.data) {
        setValidateList(response.data.data.managers);
      }
    } catch (error) {
      console.error('خطا در دریافت اطلاعات:', error);
      toast.error('خطا در دریافت اطلاعات');
    }
  };

  console.log(validateList);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      let hasFile = false; // Track if at least one file is selected

      validateList.forEach((element) => {
        if (element.file) {
          formData.append(element.national_code, element.file);
          hasFile = true; // A file has been selected
        }
      });

      // If no files were selected, show a toast info and return
      if (!hasFile) {
        toast.info('لطفا فایل‌ مورد نیاز را بارگذاری کنید');
        return;
      }

      const access = await getCookie('access');
      await axios.post(`${OnRun}/api/validation/${cartId}/`, formData, {
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
