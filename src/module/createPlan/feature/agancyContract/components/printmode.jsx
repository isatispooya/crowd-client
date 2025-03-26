import React from 'react';
import PrintableContractLayout from 'src/module/createPlan/layouts/printableLayourtContract';
import PropTypes from 'prop-types';

export const PrintModeContent = ({
  pages,
  agencyContract,
  qrValue,
  headerContent,
  footerContent,
}) => {
  return (
    <>
      {pages.map((PageComponent, index) => {
        const pageNumber = index + 1;
        return (
          <div key={`print-page-${pageNumber}`} className={index > 0 ? 'page-break-before' : ''}>
            <PrintableContractLayout
              headerChildren={index === 0 ? headerContent : null}
              footerChildren={footerContent}
            >
              <div className="bg-white p-5 rounded-lg shadow-sm text-[10px] leading-[14px] border border-gray-100 min-h-[60vh]">
                <PageComponent agencyContract={agencyContract} qrValue={qrValue} />
              </div>
            </PrintableContractLayout>
          </div>
        );
      })}
    </>
  );
};

PrintModeContent.propTypes = {
  pages: PropTypes.array.isRequired,
  agencyContract: PropTypes.object.isRequired,
  qrValue: PropTypes.string.isRequired,
  headerContent: PropTypes.node.isRequired,
  footerContent: PropTypes.node.isRequired,
};
