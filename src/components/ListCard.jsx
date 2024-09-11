import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { OnRun } from 'src/api/OnRun';
import { getCookie } from 'src/api/cookie';
import { FaCheckCircle, FaClock, FaQuestionCircle, FaPlus } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { Button, Chip, Tooltip } from '@mui/material';
import UseCartId from 'src/hooks/use-cartId';
import ConfirmDeleteModal from './ConfirmDeleteModal';

const CardList = ({ statusCart, setCardSelected, handleNext , enableSteps }) => {
  const [cards, setCards] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const {setCartId} = UseCartId()
  const access = getCookie('access');
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get(`${OnRun}/api/cart/`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access}`,
          },
        });

        if (response.data.cart) {
          setCards(response.data.cart);
        }
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    if (access) {
      fetchCards();
    }
  }, [access]);

  const handleCardClick = (id, status) => {
    setCartId(+id);
    setCartId(status);
    enableSteps();
    handleNext();
  };
  const handleNewCardClick = () => { 
    setCartId(null);
  };
  const handleKeyPress = (event, id, status) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleCardClick(id, status);
    }
  };

  // const openDeleteModal = (event, id) => {
  //   event.stopPropagation();
  //   setSelectedCardId(id);
  //   setModalOpen(true);
  // };

  const handleDeleteClick = async () => {
    if (selectedCardId === null) return;
    try {
      await axios.delete(`${OnRun}/api/cart/detail/${selectedCardId}/`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
      setCards((prevCards) => prevCards.filter((card) => card.id !== selectedCardId));
    } catch (error) {
      console.error('Error deleting card:', error);
    } finally {
      setModalOpen(false);
      setSelectedCardId(null);
    }
  };
  const formatNumber = (value) => String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedCardId(null);
  };

  const getStatusChip = (status) => {
    const iconStyle = { fontSize: '18px' };
    const chipStyles = {
      borderRadius: '20px',
      fontWeight: 'bold',
      margin: '2px',
      padding: '4px 8px',
    };

    switch (status) {
      case '1':
        return <Chip icon={<FaClock style={iconStyle} />} label="بررسی شرکت" color="warning" variant="outlined" style={chipStyles} />;
      case '2':
        return <Chip icon={<FaCheckCircle style={iconStyle} />} label="بررسی مدیران" color="success" variant="outlined" style={chipStyles} />;
      case '3':
      case '4':
      case '5':
        return <Chip icon={<FaQuestionCircle style={iconStyle} />} label="بررسی سهامداران" color="info" variant="outlined" style={chipStyles} />;
      default:
        return <Chip icon={<FaQuestionCircle style={iconStyle} />} label="نامشخص" color="default" variant="outlined" style={chipStyles} />;
    }
  };



  return (
    <div className="p-8 bg-transparent min-h-screen flex justify-center items-start">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-7xl w-full">
        <div className="bg-gray-200 text-white rounded-t-md p-2 text-center">
          <h1 className="text-2xl font-bold text-gray-700"> لیست ها</h1>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2  2xl:grid-cols-3 gap-24 xl:gap-8 justify-center">
            <div
              className="bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-center items-center cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gray-100 min-w-[280px] max-w-[320px] h-[350px]"
              onClick={handleNewCardClick}
              onKeyPress={(event) => handleKeyPress(event)}
              tabIndex={0}
              role="button"
              aria-label="افزودن کارت جدید"
            >
              <FaPlus className="text-5xl text-blue-700 mb-4" />
              <h2 className="text-2xl font-bold text-gray-800">افزودن لیست جدید</h2>
            </div>

            {cards.length > 0 ? (
              cards.map((card) => (
                <div
                  key={card.id}
                  className={`bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-between items-center cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gray-100 min-w-[280px] max-w-[320px] h-[350px] ${
                    selectedCardId === card.id ? 'border-4 border-blue-600' : ''
                  }`}
                  onClick={() => handleCardClick(card.id, card.status)}
                  onKeyPress={(event) => handleKeyPress(event, card.id, card.status)}
                  tabIndex={0}
                  role="button"
                  aria-label={`View card ${card.company_name}`}
                >
                  <div className="flex flex-col items-center flex-grow space-y-4">
                    <h2 className="text-2xl font-bold text-gray-800">{card.company_name}</h2>
                    <div className="flex flex-col justify-center items-center space-y-2">
                      <p className="text-base font-medium text-gray-700">شناسه: {card.nationalid}</p>
                      <p className="text-base font-medium text-gray-700">میزان سرمایه :{formatNumber(card.registered_capital)} </p>
                      <p  className="text-base font-medium text-gray-700">شماره ثبت: {card.registration_number}</p>
                    </div>
                    <div className="flex items-center">{getStatusChip(card.status)}</div>
                  </div>
                  <div className="flex justify-center gap-4 mt-6">
                    <Tooltip title="مشاهده و ویرایش">
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ textTransform: 'none', padding: '8px 16px', fontSize: '16px' }}
                      >
                        مشاهده و ویرایش
                      </Button>
                    </Tooltip>
                    {/* <Tooltip title="حذف کارت">
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={(event) => openDeleteModal(event, card.id)}
                        style={{ textTransform: 'none', padding: '8px 16px', fontSize: '16px' }}
                      >
                        حذف
                      </Button>
                    </Tooltip> */}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 text-xl">هیچ لیستی موجود نیست</p>
            )}
          </div>
        </div>
      </div>
      <ConfirmDeleteModal open={modalOpen} onClose={handleModalClose} onConfirm={handleDeleteClick} />
    </div>
  );
};

CardList.propTypes = {
  statusCart: PropTypes.func.isRequired,
  setCardSelected: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  enableSteps: PropTypes.func.isRequired,
};

export default CardList;
