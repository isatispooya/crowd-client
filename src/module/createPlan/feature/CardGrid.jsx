import React from 'react';
import PropTypes from 'prop-types';
import Cards from './cards';
import NewCards from './newCards';

const CardGrid = ({ cards = [] }) => {
  if (cards.length === 0) {
    return (
      <div className="flex justify-center items-center w-full">
        <div className="w-full max-w-md">
          <NewCards />
        </div>
      </div>
    );
  }

  const allCards = [...cards, { isNewCard: true }];
  const rows = [];
  for (let i = 0; i < allCards.length; i += 3) {
    rows.push(allCards.slice(i, i + 3));
  }
  return (
    <div className="w-full">
      {rows.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex flex-wrap justify-center gap-6 mb-8">
          {row.map((card, cardIndex) => {
            if (card.isNewCard) {
              return (
                <div key="new-card" className="w-full max-w-md">
                  <NewCards />
                </div>
              );
            }

            return (
              <div key={`card-${card.id || cardIndex}`} className="w-full max-w-md">
                <Cards data={card} />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

CardGrid.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      companyId: PropTypes.string,
      amount: PropTypes.string,
      status: PropTypes.string,
      description: PropTypes.string,
      isNewCard: PropTypes.bool,
    })
  ),
};

export default CardGrid;
