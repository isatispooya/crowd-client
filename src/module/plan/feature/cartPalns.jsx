import React, { useEffect, useState, Suspense, lazy, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie } from 'src/api/cookie';
import FilterPlans from 'src/components/filtring';
import Loader from 'src/components/loader';
import useGetPlans from '../service/use-plans';

const PlanCart = lazy(() => import('./paln.cart'));

const CartPlans = () => {
  const { data } = useGetPlans();
  const access = getCookie('access');
  const navigate = useNavigate();
  const [setFilterStatusSecond] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [displayedPlans, setDisplayedPlans] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    if (!access) {
      navigate('/login');
    }
  }, [access, navigate]);

  const updateDisplayedPlans = useCallback(() => {
    if (!data) return;

    const plans = data
      .filter((item) => item?.information_complete?.status_show === true)
      .slice()
      .reverse();

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = plans.slice(indexOfFirstItem, indexOfLastItem);

    setDisplayedPlans(currentItems);
  }, [data, currentPage, itemsPerPage]);

  useEffect(() => {
    if (data) {
      setIsLoading(false);
      updateDisplayedPlans();
    }
  }, [data, currentPage, updateDisplayedPlans]);

  const totalPages = Math.ceil(
    (data?.filter((item) => item?.information_complete?.status_show === true) || []).length /
      itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!data || data.length === 0) {
    return <p>هیچ یافت نشد.</p>;
  }

  return (
    <>
      <div className="bg-gray-200 text-white rounded-t-md p-2 md:p-4 lg:p-6 text-center">
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-gray-700">طرح‌ها</h1>
      </div>
      <div className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-700 z-10">
        <FilterPlans setFilterStatusSecond={setFilterStatusSecond} />
      </div>
      <div className="bg-white rounded-lg shadow-2xl p-4">
        <div className="flex flex-wrap flex-row justify-around">
          {displayedPlans.length > 0 ? (
            displayedPlans.map((item) => {
              if (item?.information_complete?.status_show === true) {
                return (
                  <div key={item.plan.id} className="flex gap-6 p-4">
                    <Suspense fallback={<Loader />}>
                      <PlanCart
                        plan={item}
                        handleDetailsClick={() => navigate(`/plan/${item.plan.trace_code}`)}
                      />
                    </Suspense>
                  </div>
                );
              }
              return null;
            })
          ) : (
            <p className="text-center col-span-full text-gray-600 text-lg">
              هیچ طرحی برای این فیلتر یافت نشد.
            </p>
          )}
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-6">
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  type="button"
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded ${
                    currentPage === page
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPlans;
