import { GoPlus } from 'react-icons/go';

import { IoIosArrowRoundUp } from 'react-icons/io';

const WalletBerif = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      {/* Large Container */}
      <div className="w-full max-w-2xl bg-white  rounded-lg shadow-2xl  p-6 flex flex-col">
        <div className="bg-gray-100 w-full text-white rounded-t-md p-2 text-center mb-4">
          <h1 className="text-2xl font-bold text-gray-700">کیف پول</h1>
        </div>

        <div className="w-full max-w-md mx-auto p-4 mb-6">
          <div dir="rtl" className="w-full ">
            <div className="flex flex-col items-center pb-10 rounded-lg  bg-gradient-to-r from-[#004ff9] to-[#000000] shadow-2xl ">
              <div className="flex justify-end px-4 pt-4" />

              <h5 className="mb-1 text-xl font-medium  text-white mt-6">مانده کیف پول</h5>
              <h5 className="mb-1  font-medium text-4xl text-white">0</h5>

              <div className="flex mt-4">
                <a
                  href="#"
                  className="py-2 flex items-center px-4 ms-2 text-sm font-medium text-white  rounded-lg  hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:outline-none     dark:border-gray-600  dark:hover:bg-white-700 duration-300"
                >
                  <GoPlus className=" ml-1 text-2xl" />
                  افزایش
                </a>
                <a
                  href="#"
                  className="py-2 flex items-center px-4 ms-2 text-sm font-medium text-white  rounded-lg  hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:outline-none     dark:border-gray-600  dark:hover:bg-white-700 duration-300"
                >
                  <IoIosArrowRoundUp className=" ml-1 text-2xl" />
                  برداشت
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center mt-6 space-y-4">
          {/* Credit Card */}
          <div className="w-full bg-gradient-to-r from-[#004ff9] to-[#000000] p-4 rounded-lg shadow-lg flex justify-between items-center">
            <h2 className="text-lg font-bold text-white">اعتبار:</h2>
            <p className="text-2xl font-bold text-white">1,000,000,000,000</p>
          </div>

          {/* Suspended Balance Card */}
          <div className="w-full bg-gradient-to-r from-[#004ff9] to-[#000000] p-4 rounded-lg shadow-lg flex justify-between items-center">
            <h2 className="text-lg font-bold text-white">مانده تعلیلی:</h2>
            <p className="text-2xl font-bold text-white">1,000,000,000,000,000,000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletBerif;
