/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getStep1, createCart, updateCart } from 'src/api/step1';
import useNavigateStep from 'src/hooks/use-navigate-step';
import UseCartId from 'src/hooks/use-cartId';
import CompanyInputs from 'src/module/companies/components/companyTextInputs';
import CompanyUploads from 'src/module/companies/components/companyUploadInputs';
import { Message } from './massage';

export default function Form() {
  const { cartId, setCartId } = UseCartId();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cartId) {
      mutation.mutateAsync();
      setCartId(cartId);
      console.log(cartId);
    } else {
      mutationUpdate.mutateAsync();
    }
  };

  return (
    <>
      <div className="bg-gray-50  rounded-md mb-10 shadow-inner ">
        <Message cartId={cartId} />
      </div>
       <ToastContainer/>
      <div className="mb-5">
        <div className="bg-gray-200 text-white rounded-t-md p-2 text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-700">اطلاعات شرکت</h1>
        </div>
        <CompanyInputs localData={localData} setLocalData={setLocalData} cartId={cartId} />
      </div>

      <div className="mt-10 ">
        <div className="bg-gray-200 text-white rounded-t-md p-2 text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-700">پیوست اسناد</h1>
        </div>
        <CompanyUploads localData={localData} setLocalData={setLocalData} cartId={cartId} />
      </div>

      <div className=" flex justify-center mt-8">
        <button
          onClick={handleSubmit}
          type="submit"
          className={`bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-8 rounded-full shadow-xl transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {mutation.isLoading ? 'در حال بارگذاری...' : 'درخواست بررسی اولیه'}
        </button>
      </div>
    </>
  );
}
