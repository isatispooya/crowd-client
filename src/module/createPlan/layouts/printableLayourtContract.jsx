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
        className="print-container font-sans rtl p-3 md:p-6 mx-auto shadow-lg rounded-lg border border-gray-200 min-h-screen w-full md:w-[210mm] lg:w-[297mm] xl:w-[420mm]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-4 md:mb-6">
          <div
            style={{ backgroundColor: '#4f46e5' }}
            className="h-1 md:h-2 rounded-t-lg -mt-3 md:-mt-6 -mx-3 md:-mx-6 mb-2 md:mb-4"
          />

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
            <div className="flex items-center">
              {/* <img src={LogoSabad} alt="logo" className="w-16 h-auto" />
              <img src={TypeLogo} alt="type logo" className="w-20 h-auto ml-2" /> */}
            </div>

            <div className="flex flex-col gap-1 text-left w-full md:w-auto">
              {headerChildren ||
                headerInfo.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span style={{ color: '#374151' }} className="text-xs md:text-sm font-bold">
                      {item.label}:
                    </span>
                    <span style={{ color: '#374151' }} className="text-xs md:text-sm">
                      {item.value}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {(title || subtitle) && (
          <div className="mb-4 md:mb-6">
            {title && (
              <p style={{ color: '#374151' }} className="text-xs md:text-sm font-bold mb-1 md:mb-2">
                {title}
              </p>
            )}
            {subtitle && (
              <p style={{ color: '#374151' }} className="text-xs md:text-sm font-bold">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className="text-xs md:text-sm">{children}</div>

        {(signatureImage || qrCodeComponent) && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-4 md:mt-8 flex flex-col md:flex-row-reverse justify-between items-center gap-4 md:gap-0"
          >
            {signatureImage && (
              <div className="w-full md:w-6/12">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="border border-gray-300 rounded-lg p-2 md:p-3 shadow-sm bg-white"
                >
                  <img
                    src={signatureImage}
                    alt="امضای بانک"
                    className="w-full h-16 md:h-32 object-contain"
                  />
                </motion.div>
              </div>
            )}

            {qrCodeComponent && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="w-full md:w-5/12 flex justify-center md:justify-start"
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
              className="text-center text-xs md:text-sm pt-2 md:pt-3"
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
