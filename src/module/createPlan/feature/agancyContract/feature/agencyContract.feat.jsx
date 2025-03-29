import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import Loader from 'src/components/loader';
import PrintableContractLayout from 'src/module/createPlan/layouts/printableLayourtContract';
import { useAgencyContract } from 'src/module/createPlan/hooks';

import {
  ContractHeader,
  ContractFooter,
  PageNavigation,
  CurrentPageContent,
  PrintModeContent,
} from '../components';
import { PrintStyles } from '../styles';
import { PAGES, TOTAL_PAGES } from '../printPages';

const AgencyContract = () => {
  const [searchParams] = useSearchParams();
  const urlUuid = searchParams.get('uuid');
  const [finalUuid, setFinalUuid] = useState(null);
  const [qrValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [printMode, setPrintMode] = useState(false);

  useEffect(() => {
    if (urlUuid && urlUuid !== 'undefined') {
      setFinalUuid(urlUuid);
    }
  }, [urlUuid]);

  const {
    data: agencyContract,
    isLoading,
    refetch,
  } = useAgencyContract(finalUuid !== 'undefined' ? finalUuid : null);

  useEffect(() => {
    if (finalUuid && finalUuid !== 'undefined') {
      refetch();
    }
  }, [finalUuid, refetch]);

  const handlePrint = useCallback(() => {
    setPrintMode(true);
    setTimeout(() => {
      window.print();
      setTimeout(() => {
        setPrintMode(false);
      }, 500);
    }, 100);
  }, []);

  const handlePageChange = useCallback((pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= TOTAL_PAGES) {
      setCurrentPage(pageNumber);
    }
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const headerContent = <ContractHeader agencyContract={agencyContract} />;

  const footerContent = <ContractFooter agencyContract={agencyContract} />;

  const getHeaderForPage = (pageNumber) => {
    return pageNumber === 1 ? headerContent : null;
  };

  return (
    <div className="contract-container">
      <PrintStyles />
      <PageNavigation
        currentPage={currentPage}
        totalPages={TOTAL_PAGES}
        handlePageChange={handlePageChange}
        handlePrint={handlePrint}
      />

      {printMode ? (
        <PrintModeContent
          pages={PAGES}
          agencyContract={agencyContract}
          qrValue={qrValue}
          headerContent={headerContent}
          footerContent={footerContent}
          getHeaderForPage={getHeaderForPage}
        />
      ) : (
        <PrintableContractLayout
          headerChildren={currentPage === 1 ? headerContent : null}
          footerChildren={footerContent}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-5 rounded-lg shadow-sm text-[10px] border border-gray-100 min-h-[60vh]"
          >
            <CurrentPageContent
              currentPage={currentPage}
              pages={PAGES}
              agencyContract={agencyContract}
              qrValue={qrValue}
            />
          </motion.div>
        </PrintableContractLayout>
      )}
    </div>
  );
};

export default AgencyContract;
