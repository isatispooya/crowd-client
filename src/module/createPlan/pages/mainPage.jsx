import * as React from 'react';
import NewCards from '../feature/newCards';
import { Cards } from '../feature';

const MainPage = () => {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-12 max-w-7xl w-full">
        <div className="bg-gradient-to-r from-gray-200 to-gray-300 text-gray-900 rounded-xl p-4 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold">لیست ها</h1>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NewCards />
          <Cards />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
