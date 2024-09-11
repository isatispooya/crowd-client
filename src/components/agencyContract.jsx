/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';

const AgencyContract = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Handle form submission
  };

  return (
    <div className="flex justify-center items-center  ">
      <div className="bg-white shadow-lg rounded-3xl p-12 w-full max-w-3xl">
        <div className="bg-gray-200 w-full text-white rounded-t-md p-2 text-center mb-10">
          <h1 className="text-2xl font-bold text-gray-700">قرارداد عاملیت</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                نام و نام خانوادگی
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
              placeholder="نام خود را وارد کنید"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              ایمیل
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
              placeholder="ایمیل خود را وارد کنید"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobile">
              موبایل
            </label>
            <input
              type="tel"
              name="mobile"
              id="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
              placeholder="شماره موبایل خود را وارد کنید"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
              آدرس
            </label>
            <textarea
              name="address"
              id="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
              placeholder="آدرس خود را وارد کنید"
              rows="4"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
              آپلود فایل قرارداد
            </label>
            <div className="relative w-full">
              <input
                type="file"
                name="file"
                id="file"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="bg-gray-300 border border-gray-300 rounded-lg p-4 flex justify-between items-center cursor-pointer hover:bg-gray-400">
                {formData.file ? (
                  <span className="text-gray-700">{formData.file.name}</span>
                ) : (
                  <span className="text-gray-500">فایلی انتخاب نشده است</span>
                )}
                <span className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                  انتخاب فایل
                </span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white py-4 rounded-lg w-full hover:bg-indigo-700 transition duration-200"
            >
              ارسال قرارداد
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgencyContract;
