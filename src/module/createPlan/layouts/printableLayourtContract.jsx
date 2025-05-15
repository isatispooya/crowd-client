import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const PrintableContractLayout = ({
  children,
  title,
  subtitle,
  headerInfo = [],
  footerText,
  signatureImage,
  qrCodeComponent,
  headerChildren,
  footerChildren,
}) => {
  const printRef = useRef();

  return (
    <div>
      <motion.div
        ref={printRef}
        className="print-container font-sans rtl p-6 mx-auto bg-white shadow-lg rounded-lg border border-gray-200 h-[594mm] w-[420mm]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6">
          <div className="h-2 bg-gradient-to-l from-purple-600 to-indigo-700 rounded-t-lg -mt-6 -mx-6 mb-4" />
          <div className="flex justify-between items-center">
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

        <div className="flex flex-col h-full">
          <div className="flex-grow">{children}</div>
          {footerChildren && <div className="mt-auto">{footerChildren}</div>}
        </div>

        {(signatureImage || qrCodeComponent) && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
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
                transition={{ delay: 1.2 }}
                className="w-5/12 flex justify-start"
              >
                {qrCodeComponent}
              </motion.div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

PrintableContractLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  headerInfo: PropTypes.array,
  footerText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  signatureImage: PropTypes.string,
  qrCodeComponent: PropTypes.node,
  headerChildren: PropTypes.node,
  footerChildren: PropTypes.node,
};

export default PrintableContractLayout;
