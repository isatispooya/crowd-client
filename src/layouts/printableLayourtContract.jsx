import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import LogoSabad from '../module/createPlan/Artboard 1 copy 3.png';
import TypeLogo from '../module/createPlan/typography.png';

const PrintableContractLayout = ({
  children,
  title,
  subtitle,
  headerInfo = [],
  printButtonText = 'دانلود و پرینت',
  footerText,
  signatureImage,
  qrCodeComponent,
  headerChildren,
  footerChildren,
}) => {
  const printRef = useRef();

  const handlePrint = () => {
    const content = printRef.current;
    const originalContents = document.body.innerHTML;

    const printStyles = `
      <style>
        @media print {
          body {
            font-family: Arial, sans-serif;
            direction: rtl;
          }
          .print-container {
            padding: 20px;
            max-width: 100%;
          }
          .no-print {
            display: none !important;
          }
          @page {
            size: A4;
            margin: 1.5cm;
          }
        }
      </style>
    `;

    document.body.innerHTML = printStyles + content.outerHTML;
    window.print();
    document.body.innerHTML = originalContents;
  };

  return (
    <div>
      <motion.div
        className="flex justify-center mb-4 no-print"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <button
          type="button"
          onClick={handlePrint}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
            />
          </svg>
          {printButtonText}
        </button>
      </motion.div>

      <motion.div
        ref={printRef}
        className="print-container font-sans rtl p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg border border-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6">
          <div className="h-2 bg-gradient-to-l from-purple-600 to-indigo-700 rounded-t-lg -mt-6 -mx-6 mb-4" />
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img src={LogoSabad} alt="logo" className="w-16 h-auto" />
              <img src={TypeLogo} alt="type logo" className="w-20 h-auto ml-2" />
            </div>

            <div className="flex flex-col gap-1 text-left">
              {headerChildren ||
                headerInfo.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-700">{item.label}:</span>
                    <span className="text-xs text-gray-700">{item.value}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>



        {(title || subtitle) && (
          <div className="mb-6">
            {title && <p className="text-sm font-bold text-gray-800 mb-2">{title}</p>}
            {subtitle && <p className="text-sm font-bold text-gray-800">{subtitle}</p>}
          </div>
        )}

        {children}

        {(signatureImage || qrCodeComponent) && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 flex flex-row-reverse justify-between items-center"
          >
            {signatureImage && (
              <div className="w-6/12">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="border border-gray-300 rounded-lg bg-white p-3 shadow-sm"
                >
                  <img
                    src={signatureImage}
                    alt="امضای بانک"
                    className="w-full max-h-32 object-contain"
                  />
                </motion.div>
              </div>
            )}

            {qrCodeComponent && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="w-5/12 flex justify-start"
              >
                {qrCodeComponent}
              </motion.div>
            )}
          </motion.div>
        )}

        {footerChildren ||
          (footerText && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 text-center text-xs text-gray-500 border-t border-gray-200 pt-3"
            >
              {typeof footerText === 'string' ? <p>{footerText}</p> : footerText}
            </motion.div>
          ))}
      </motion.div>
    </div>
  );
};

PrintableContractLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  headerInfo: PropTypes.array,
  printButtonText: PropTypes.string,
  footerText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  signatureImage: PropTypes.string,
  qrCodeComponent: PropTypes.node,
  headerChildren: PropTypes.node,
  footerChildren: PropTypes.node,
};

export default PrintableContractLayout;
