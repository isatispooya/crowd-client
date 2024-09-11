import React, { useState  } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { getCookie } from 'src/api/cookie';
import { OnRun } from 'src/api/OnRun';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

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
import Fildemnager from './fildemaneger';

const ManegersDetails = () => {
  const {cartId} = UseCartId()

  const singleFile = {
    name: '',
    position: '',
    national_code: '',
    national_id: '',
    representative: '',
    is_legal: false,
    is_obliged: false,
  };

  const [field, setField] = useState([singleFile]);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);


  
  const fetchManager = async () => {
    const access = await getCookie('access');
    if (cartId) {
      const response = await axios.get(`${OnRun}/api/manager/${cartId}/`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
      if (response.data.data?.length > 0) {
        setField(response.data.data);
      }
      return response.data;
    }
    return null;
  };

  const { isLoading } = useQuery({
    queryKey: ['fetchMessage', cartId],
    queryFn: () => fetchManager(cartId),
  });
  if (isLoading)
    return <p className="text-gray-600 animate-pulse">در حال بارگذاری...</p>;

  const handleAdd = () => {
    setField((prevField) => [...prevField, singleFile]);
  };

  const handleRemove = (index) => {
    if (field.length > 1) {
      setDeleteIndex(index);
      setOpenDialog(true);
    }
  };

  const handleDeleteConfirm = () => {
    setField((prevField) => prevField.filter((_, i) => i !== deleteIndex));
    setOpenDialog(false);
  };

  const validateFields = () => {
    let hasError = false;
    field.forEach((manager) => {
      if (manager.name.trim() === '') {
        toast.error('فیلد نام نباید خالی باشد');
        hasError = true;
      }
      if (manager.position.trim() === '') {
        toast.error('فیلد سمت نباید خالی باشد');
        hasError = true;
      }
      if (manager.national_code.trim() === '') {
        toast.error('فیلد کد ملی نباید خالی باشد');
        hasError = true;
      }
      if (manager.is_legal === null) {
        toast.error('وضعیت حقوقی باید مشخص شود');
        hasError = true;
      }
      if (manager.is_obliged === null) {
        toast.error('وضعیت تعهد باید مشخص شود');
        hasError = true;
      }
    });
    return hasError;
  };

  const handlePost = async () => {
    if (validateFields()) return;

    const access = await getCookie('access');
    const sanitizedField = field.map((manager) => ({
      ...manager,
      national_id: manager.national_id || '',
      representative: manager.representative || '',
    }));

    try {
      await axios.post(
        `${OnRun}/api/manager/${cartId}/`,
        { managers: sanitizedField },
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
      console.error('Error Response:', error.response.data);
      toast.error('خطا در ارسال اطلاعات');
    }
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen p-8">
      <ToastContainer />

      <div className="w-full max-w-4xl p-6 rounded-lg  bg-white shadow-xl">
        <div className="bg-gray-200 w-full text-white rounded-t-md p-2 text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-700">اطلاعات مدیران</h1>
        </div>
        {field.map((item, index) => (
          <div key={index} className="relative w-full mb-8">
            {field.length > 1 && (
              <button
                onClick={() => handleRemove(index)}
                type="button"
                className="absolute top-0 left-0 mt-2 ml-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition duration-300"
              >
                <FaTimes />
              </button>
            )}
            <Fildemnager index={index} field={field} setField={setField} />
          </div>
        ))}

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

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle sx={{ textAlign: 'center' }}>تایید حذف</DialogTitle>
        <DialogContent>
          <DialogContentText>
            آیا مطمئن هستید که می‌خواهید این بخش را حذف کنید؟
          </DialogContentText>
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


export default ManegersDetails;
