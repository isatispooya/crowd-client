/* eslint-disable react/button-has-type */
/* eslint-disable import/order */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import Row from '../component/row';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCookie } from 'src/api/cookie';
import axios from 'axios';
import { OnRun } from 'src/api/OnRun';
import UseCartId from 'src/hooks/use-cartId';
import useNavigateStep from 'src/hooks/use-navigate-step';
import { useFinishCart } from 'src/hooks/useFinishCart';

const Attachement = () => {
  const { cartId } = UseCartId();
  const [resumeList, setResumeList] = useState([]);

  const { incrementPage } = useNavigateStep();

  const fetchManagerData = async () => {
    try {
      const access = await getCookie('access');
      const response = await axios.get(`${OnRun}/api/resume/${cartId}/`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });

      if (response.data && response.data.manager) {
        setResumeList(response.data.manager);
      }
    } catch (error) {
      console.error('خطا در دریافت اطلاعات:', error);
      toast.error('خطا!! مدیران یافت نشد , یک مدیر ایجاد کنید');
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      let hasFile = false;

      resumeList.forEach((element) => {
        if (element.file) {
          formData.append(element.national_code, element.file);
          hasFile = true;
        }
      });

      if (!hasFile) {
        toast.info('لطفا فایل‌ مورد نیاز را بارگذاری کنید');
        return;
      }

      const access = await getCookie('access');
      await axios.post(`${OnRun}/api/resume/${cartId}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${access}`,
        },
        maxBodyLength: Infinity,
      });

      toast.success('اطلاعات با موفقیت ارسال شد!');
      incrementPage();
    } catch (error) {
      console.error('خطا :', error);
      toast.error('خطا در ارسال اطلاعات');
    }
  };

  const { data: finishCart, isLoading: loader } = useFinishCart(cartId);

  console.log(finishCart ,  loader, 'finishCart');

  const isDisabled = loader || finishCart?.cart?.finish_cart === true;

  useEffect(() => {
    fetchManagerData();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <ToastContainer />
      <div className="bg-gray-200 w-full text-white rounded-t-md p-2 text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-700">لیست رزومه ها</h1>
      </div>

      <div className="rounded-lg">
        {resumeList.map((item, index) => (
          <div key={index}>
            <Row index={index} list={resumeList} item={item} setList={setResumeList} />
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

export default Attachement;
