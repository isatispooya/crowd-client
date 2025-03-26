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
    <div className=" absolute top-6 left-36 z-50 flex p-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="rounded-3xl p-8 sm:p-12 max-w-7xl w-full shadow-2xl relative overflow-hidden max-h-[85vh] flex flex-col"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-300/10 to-indigo-300/10 pointer-events-none rounded-3xl" />

        <motion.div
          variants={headerVariants}
          className="bg-gradient-to-r from-gray-100 to-gray-300 text-gray-700 rounded-xl p-6 text-center relative shadow-lg"
        >
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">لیست ها</h1>
          <motion.button
            whileHover={{ scale: 1.15, rotate: 90 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="absolute top-4 right-4 bg-white text-indigo-600 p-3 rounded-full shadow-md  transition-all duration-300 flex items-center justify-center"
          >
            <FiPlus className="w-7 h-7" />
          </motion.button>
        </motion.div>

        <div className="mt-8 overflow-y-auto flex-1">
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
                className="relative bg-transparent m-8"
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
