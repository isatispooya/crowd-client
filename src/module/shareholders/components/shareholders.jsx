// Shareholders.js
import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useNavigateStep from 'src/hooks/use-navigate-step';
import UseCartId from 'src/hooks/use-cartId';
import Loader from 'src/components/loader';
import ConfirmationDialog from 'src/components/dialogMsg';
import useShareholders from '../hooks/fetchMangers';
import FileSharehold from './fildesharehold';

const Shareholders = () => {
  const { cartId } = UseCartId();
  const singleFile = {
    name: '',
    national_code: '',
    national_id: '',
  };

  const { validite, setValidite, isLoading, postShareholders } = useShareholders(cartId);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const { incrementPage } = useNavigateStep();

  const handleAdd = () => {
    setValidite((prev) => [...prev, singleFile]);
  };

  const handleRemove = (index) => {
    if (validite.length > 1) {
      setDeleteIndex(index);
      setOpenDialog(true);
    }
  };

  const handleDeleteConfirm = () => {
    setValidite((prev) => prev.filter((_, i) => i !== deleteIndex));
    setOpenDialog(false);
  };

  const handlePost = async () => {
    try {
      await postShareholders();
      incrementPage();
    } catch (error) {
      console.error('خطا در ارسال اطلاعات:', error);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col items-center w-full min-h-screen p-8">
      <ToastContainer />

      <div className="w-full max-w-4xl p-6 rounded-lg shadow-2xl bg-white">
        <div className="bg-gray-200 w-full text-white rounded-t-md p-2 text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-700">سهامداران</h1>
        </div>
        <div className="w-full mb-4">
          {validite.map((item, index) => (
            <div key={index} className="relative w-full space-y-2 mb-6">
              <div className="relative p-4 rounded-lg bg-white shadow-md">
                {validite.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className="absolute top-0 left-0 mt-2 ml-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition duration-300"
                  >
                    <FaTimes />
                  </button>
                )}
                <FileSharehold index={index} validite={validite} setValidite={setValidite} />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center mt-6 w-full">
          <button
            onClick={handleAdd}
            type="button"
            className="py-2 px-6 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition duration-200 font-semibold"
          >
            افزودن فرم جدید
          </button>
        </div>
        <div className="flex justify-center items-center mt-6 w-full">
          <button
            onClick={handlePost}
            type="button"
            className="py-2 w-full px-6 bg-blue-500 mx-24 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200 font-semibold"
          >
            ارسال اطلاعات
          </button>
        </div>
      </div>

      <ConfirmationDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleDeleteConfirm}
        title="تایید حذف"
        message="آیا مطمئن هستید که می‌خواهید این فرم را حذف کنید؟"
      />
    </div>
  );
};

export default Shareholders;