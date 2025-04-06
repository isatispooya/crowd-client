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
    <div className="fixed inset-x-0 top-0 sm:top-6 sm:relative sm:left-36 z-50 p-2 sm:p-6 min-h-screen sm:min-h-0">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="rounded-xl sm:rounded-3xl p-4 sm:p-8 md:p-12 w-full max-w-7xl mx-auto shadow-lg sm:shadow-2xl relative overflow-hidden max-h-[100vh] sm:max-h-[85vh] flex flex-col bg-white"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-300/10 to-indigo-300/10 pointer-events-none rounded-xl sm:rounded-3xl" />

        <motion.div
          variants={headerVariants}
          className="bg-gradient-to-r from-gray-100 to-gray-300 text-gray-700 rounded-lg sm:rounded-xl p-4 sm:p-6 text-center relative shadow-md sm:shadow-lg"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            لیست ها
          </h1>
          <motion.button
            whileHover={{ scale: 1.15, rotate: 90 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-white text-indigo-600 p-2 sm:p-3 rounded-full shadow-md transition-all duration-300 flex items-center justify-center"
          >
            <FiPlus className="w-5 h-5 sm:w-7 sm:h-7" />
          </motion.button>
        </motion.div>

        <div className="mt-4 sm:mt-8 overflow-y-auto flex-1 relative">
          <Cards />
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-gray-500/50 backdrop-blur-sm flex items-center justify-center z-50"
              onClick={() => setIsOpen(false)}
            >
              <motion.div
                variants={popupVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative bg-transparent mx-4 sm:m-8 w-full max-w-lg"
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
