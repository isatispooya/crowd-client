/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { getCookie } from 'src/api/cookie';
import { OnRun } from 'src/api/OnRun';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';
import UseCartId from 'src/hooks/use-cartId';
import FileSharehold from './fildesharehold';

const Shareholders = () => {
  const {cartId} = UseCartId()
  const singleFile = {
    name: '',
    national_code: '',
    national_id: '',
  };

  const [validite, setValidite] = useState([singleFile]);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const fetchManager = async (cartId) => {
    const access = await getCookie('access');
    if (cartId) {
      const response = await axios.get(`${OnRun}/api/shareholder/${cartId}/`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
      if (response.data.data && response.data.data.length > 0) {
        setValidite(response.data.data);
      }
      return response.data;
    }
    return null;
  };

  const { isLoading } = useQuery({
    queryKey: ['fetchMessage', cartId],
    queryFn: () => fetchManager(cartId),
  });
  if (isLoading) return <p className="text-gray-600 animate-pulse">در حال بارگذاری...</p>;

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
    const access = await getCookie('access');
    try {
      await axios.post(
        `${OnRun}/api/shareholder/${cartId}/`,
        { shareholder: validite },
        {
          headers: {
            Authorization: `Bearer ${access}`,
            'Content-Type': 'application/json',
          },
        }
      );
      toast.success('اطلاعات با موفقیت ارسال شد');
    } catch (error) {
      console.error('خطا :', error);
      toast.error('خطا در ارسال اطلاعات');
    }
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen p-8">
      <ToastContainer />

      <div className="w-full max-w-4xl p-6 rounded-lg shadow-2xl bg-white ">
        <div className="bg-gray-200 w-full text-white rounded-t-md p-2 text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-700">سهامداران</h1>
        </div>
        <div className="w-full mb-4">
          {validite.map((item, index) => (
            <div key={index} className="relative w-full space-y-2 mb-6">
              <div className="relative p-4 rounded-lg bg-white shadow-md">
                {validite.length > 1 && (
                  <button
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
        <div className="flex justify-between w-full">
          <button
            className="flex items-center justify-center py-2 px-6 bg-green-600 hover:bg-green-700 text-lg font-bold text-white rounded-md transition duration-300"
            onClick={handleAdd}
          >
            افزودن
          </button>
          <button
            onClick={handlePost}
            className="flex items-center justify-center py-2 px-6 bg-blue-500 hover:bg-blue-600 text-lg font-bold text-white rounded-md transition duration-300"
          >
            ارسال
          </button>
        </div>
      </div>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle sx={{ textAlign: 'center' }}>تایید حذف</DialogTitle>
        <DialogContent>
          <DialogContentText>آیا مطمئن هستید که می‌خواهید این بخش را حذف کنید؟</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            انصراف
          </Button>
          <Button onClick={handleDeleteConfirm} color="error">
            حذف
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Shareholders;
