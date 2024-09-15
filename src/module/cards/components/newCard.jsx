import React from 'react';
import { FaPlus } from 'react-icons/fa';
import UseCartId from 'src/hooks/use-cartId';
import useNavigateStep from 'src/hooks/use-navigate-step';
import { handleKeyPress } from 'src/utils/enterKey';

const NewCard = () => {
  const { cardId, setCartId } = UseCartId(null);
  const { incrementPage } = useNavigateStep();

  const handleNewCardClick = () => {
    setCartId(null);
    incrementPage();
    setCartId(+cardId);
  };




  return (
    <div
      className="bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-center items-center cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gray-100 min-w-[280px] max-w-[320px] h-[350px]"
      onClick={handleNewCardClick}
      onKeyDown={(e) => handleKeyPress(e, handleNewCardClick)}
      tabIndex={0} 
      role="button" 
      aria-label="افزودن کارت جدید"
    >
      <FaPlus className="text-5xl text-blue-700 mb-4" />
      <h2 className="text-2xl font-bold text-gray-800">افزودن لیست جدید</h2>
    </div>
  );
};

export default NewCard;
