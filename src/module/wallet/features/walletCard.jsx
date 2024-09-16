import { useState } from 'react';
import { GoPlus } from 'react-icons/go';
import { IoIosArrowRoundUp } from 'react-icons/io';
import UseCartId from 'src/hooks/use-cartId';
import { formatNumber } from 'src/utils/formatNumbers';
// eslint-disable-next-line import/no-extraneous-dependencies
import Modal from 'react-modal';
import Loader from 'src/components/loader';
import { useFetchWallet } from '../hooks/getWalletData';
import TransactionOptions from './transaction';
import TransactionModal from './transactionHistory';

const WalletCard = () => {
  const { cartId } = UseCartId();
  const { data: walletData, isLoading } = useFetchWallet(cartId);
  const [openTransaction, setOpenTransaction] = useState(false);
  const [openTranHistory, setOpenTranHistory] = useState(false);

  const openModal = () => {
    setOpenTransaction(true);
  };

  const openTranHistoryModal = () => {
    setOpenTranHistory(true);
  };
  if (isLoading) {
    return <Loader />;
  }

  const { adjustment_balance, credit, remaining } = walletData || {};

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-2xl p-6 flex flex-col">
        <div className="bg-gray-100 w-full text-white rounded-t-md p-2 text-center mb-4">
          <h1 className="text-2xl font-bold text-gray-700">کیف پول</h1>
        </div>

        <div className="w-full max-w-md mx-auto p-4 mb-6">
          <div dir="rtl" className="w-full">
            <div className="flex flex-col items-center pb-10 rounded-lg bg-gradient-to-r from-[#004ff9] to-[#000000] shadow-2xl">
              <div className="flex justify-end px-4 pt-4" />

              <h5 className="mb-1 text-xl font-medium text-white mt-6">مانده کیف پول</h5>
              <h5 className="mb-1 font-medium text-4xl text-white">
                {formatNumber(remaining) || 0}
              </h5>

              <div className="flex mt-4">
                <button
                  type="button"
                  onClick={openModal}
                  className="py-2 flex items-center px-4 ms-2 text-sm font-medium text-white rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:outline-none dark:border-gray-600 dark:hover:bg-white-700 duration-300"
                >
                  <GoPlus className="ml-1 text-2xl" />
                  افزایش
                </button>
                <button
                  type="button"
                  onClick={openModal}
                  href="#"
                  className="py-2 flex items-center px-4 ms-2 text-sm font-medium text-white rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:outline-none dark:border-gray-600 dark:hover:bg-white-700 duration-300"
                >
                  <IoIosArrowRoundUp className="ml-1 text-2xl" />
                  برداشت
                </button>
                <button
                  type="button"
                  onClick={openTranHistoryModal}
                  className="py-2 flex items-center px-4 ms-2 text-sm font-medium text-white rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:outline-none dark:border-gray-600 dark:hover:bg-white-700 duration-300"
                >
                  <GoPlus className="ml-1 text-2xl" />
                  تراکنش ها
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center mt-6 space-y-4">
          <div className="w-full p-4 rounded-lg shadow-lg flex justify-between items-center">
            <h2 className="text-lg font-bold text-black">اعتبار:</h2>
            <p className="text-2xl font-bold text-black">{formatNumber(credit)}</p>
          </div>
          <div className="w-full p-4 rounded-lg shadow-lg flex justify-between items-center">
            <h2 className="text-lg font-bold text-black">مانده تعلیلی:</h2>
            <p className="text-2xl font-bold text-black">{formatNumber(adjustment_balance)}</p>
          </div>
        </div>
      </div>

      {openTransaction && (
        <Modal
          isOpen={openTransaction}

          contentLabel="Transaction Options Modal"
          className="flex items-center justify-center"
          overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
        >
          <div className="relative bg-white rounded-lg p-8 w-96">
            <TransactionOptions setOpenTransaction={setOpenTransaction} />
          </div>
        </Modal>
      )}

      {openTranHistory && (
        <Modal
          isOpen={openTranHistory}
          
          contentLabel="Transaction history Modal"
          className="flex items-center justify-center"
          overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
        >
          <div className="relative bg-white rounded-lg p-8 w-96">
            <TransactionModal setOpenTransaction={setOpenTransaction} />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default WalletCard;
