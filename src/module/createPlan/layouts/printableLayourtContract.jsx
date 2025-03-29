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
        className="print-container font-sans rtl p-6 mx-auto shadow-lg rounded-lg border border-gray-200 h-[594mm] w-[420mm]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6">
          <div
            style={{ backgroundColor: '#4f46e5' }}
            className="h-2  rounded-t-lg -mt-6 -mx-6 mb-4"
          />
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {/* <img src={LogoSabad} alt="logo" className="w-16 h-auto" />
              <img src={TypeLogo} alt="type logo" className="w-20 h-auto ml-2" /> */}
            </div>

            <div className="flex flex-col gap-1 text-left">
              {headerChildren ||
                headerInfo.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span style={{ color: '#374151' }} className="text-xs font-bold ">
                      {item.label}:
                    </span>
                    <span style={{ color: '#374151' }} className="text-xs ">
                      {item.value}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {(title || subtitle) && (
          <div className="mb-6">
            {title && (
              <p style={{ color: '#374151' }} className="text-sm font-bold mb-2">
                {title}
              </p>
            )}
            {subtitle && (
              <p style={{ color: '#374151' }} className="text-sm font-bold">
                {subtitle}
              </p>
            )}
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
                  style={{ backgroundColor: '#ffffff' }}
                  className="border border-gray-300 rounded-lg  p-3 shadow-sm"
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
              style={{ color: '#374151' }}
              className="text-center text-xs   pt-3"
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
  footerText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  signatureImage: PropTypes.string,
  qrCodeComponent: PropTypes.node,
  headerChildren: PropTypes.node,
  footerChildren: PropTypes.node,
};

export default PrintableContractLayout;
