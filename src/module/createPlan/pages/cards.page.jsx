import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import NewCards from '../feature/cards/createCard';
import { Cards } from '../feature';
import { containerVariants, headerVariants, backdropVariants, popupVariants } from '../animations';

const CardsPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute top-0 md:top-6 left-0 md:left-36 right-0 md:right-auto z-50 flex p-2 sm:p-4 md:p-6 w-full md:w-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 w-full max-w-8xl mx-auto shadow-xl md:shadow-2xl relative overflow-hidden max-h-[90vh] md:max-h-[85vh] flex flex-col"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-300/10 to-indigo-300/10 pointer-events-none rounded-2xl md:rounded-3xl" />

        <motion.div
          variants={headerVariants}
          className="bg-gradient-to-r from-gray-100 to-gray-300 text-gray-700 rounded-lg md:rounded-xl p-3 sm:p-4 md:p-6 text-center relative shadow-md md:shadow-lg"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">لیست ها</h1>
          <motion.button
            whileHover={{ scale: 1.15, rotate: 90 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 bg-white text-indigo-600 p-2 md:p-3 rounded-full shadow-md transition-all duration-300 flex items-center justify-center"
          >
            <FiPlus className="w-5 h-5 md:w-7 md:h-7" />
          </motion.button>
        </motion.div>

        <div className="mt-4 md:mt-8 overflow-y-auto flex-1">
          <Cards />
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-gray-500/50 flex items-center justify-center z-50"
              onClick={() => setIsOpen(false)}
            >
              <motion.div
                variants={popupVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative bg-transparent m-2 sm:m-4 md:m-8 w-[95%] md:w-auto max-w-4xl"
                onClick={(e) => e.stopPropagation()}
              >
                <NewCards setIsOpen={setIsOpen} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default CardsPage;
