import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import Loader from 'src/components/loader';
import moment from 'moment';
import PrintableContractLayout from 'src/layouts/printableLayourtContract';
import { useAgencyContract } from '../hooks';
import { Page1, Page2, PAGES, TOTAL_PAGES } from '../feature/agancyContract';


const printStyles = `
  @media print {
    .page-break-before {
      page-break-before: always;
    }
    
    @page {
      size: A4;
      margin: 0.5cm;
    }
    
    body {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  }
`;

const AgencyContract = () => {
  const [searchParams] = useSearchParams();
  const urlUuid = searchParams.get('uuid');
  const [finalUuid, setFinalUuid] = useState(null);
  const [qrValue, setQrValue] = useState('');
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
    if (finalUuid && finalUuid !== 'undefined' && agencyContract) {
      setQrValue('https://app.isatiscrowd.ir/agencyContract');
    }
  }, [finalUuid, agencyContract]);

  useEffect(() => {
    if (finalUuid && finalUuid !== 'undefined') {
      refetch();
    }
  }, [finalUuid, refetch]);

  const renderHeaderContent = () => {
    if (!agencyContract) return null;

    return (
      <div className="flex flex-col gap-1 text-left">
        {agencyContract.investor_request?.logo && (
          <div className="mb-1">
            <img
              src={agencyContract.investor_request.logo}
              alt="Investor Logo"
              className="h-10 object-contain"
            />
          </div>
        )}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-700">شماره قرارداد:</span>
          <span className="text-xs text-gray-700">
            {agencyContract.contract_number || 'تعیین نشده'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-700">تاریخ قرارداد:</span>
          <span className="text-xs text-gray-700">
            {agencyContract.agency_agreement_date
              ? moment(agencyContract.agency_agreement_date).format('jYYYY/jMM/jDD')
              : 'تعیین نشده'}
          </span>
        </div>
        {agencyContract.company && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-700">شرکت:</span>
            <span className="text-xs text-gray-700">{agencyContract.company.title}</span>
          </div>
        )}
      </div>
    );
  };

  const renderFooterSignatures = () => {
    if (!agencyContract || !agencyContract.company_members) return null;

    const signatoryMembers = agencyContract.company_members.filter(
      (member) => member.signature === true
    );

    const staticUsers = [
      { person_title: 'سیدعلیمحمد خبیری', position_title: 'مدیر عامل' },
      { person_title: 'محسن زارعیان', position_title: 'رئیس هیئت مدیره' },
    ];

    const allSignatories = [...staticUsers];

    if (signatoryMembers.length > 0) {
      signatoryMembers.forEach((member) => {
        const isDuplicate = staticUsers.some((user) => user.person_title === member.person_title);

        if (!isDuplicate) {
          allSignatories.push({
            person_title: member.person_title,
            position_title: member.position_title,
          });
        }
      });
    }
    return (
      <div className="mt-4">
        <h3 className="text-xs font-bold mb-2 text-center border-b pb-1">
          امضاء صاحبان امضای مجاز
        </h3>

        <div className="flex justify-between gap-1">
          {allSignatories.map((user, index) => (
            <div key={`signatory-${index}`} className="flex-1">
              <div className="border border-gray-300 rounded p-1 w-full">
                <div className="text-center">
                  <p className="font-bold text-[10px]">{user.person_title}</p>
                  <p className="text-[8px] text-gray-600">{user.position_title}</p>
                </div>
                <div className="h-10 border-dashed border border-gray-300 rounded flex items-center justify-center mt-1">
                  <p className="text-gray-400 text-[8px]">محل امضاء</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const handlePrint = () => {
    setPrintMode(true);
    // Use setTimeout to ensure the print view is rendered before printing
    setTimeout(() => {
      window.print();
      // Reset to normal view after printing
      setTimeout(() => {
        setPrintMode(false);
      }, 500);
    }, 100);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= TOTAL_PAGES) {
      setCurrentPage(pageNumber);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  const renderCurrentPage = () => {
    const CurrentPageComponent = PAGES[currentPage - 1];
    return <CurrentPageComponent agencyContract={agencyContract} qrValue={qrValue} />;
  };

  return (
    <div className="contract-container">
      {/* Add print styles */}
      <style>{printStyles}</style>

      {/* Navigation controls - hidden when printing */}
      <div className="print:hidden mb-4 flex justify-between items-center">
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            صفحه قبل
          </button>
          <button
            type="button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === TOTAL_PAGES}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            صفحه بعد
          </button>
          <span className="px-4 py-2">
            صفحه {currentPage} از {TOTAL_PAGES}
          </span>
        </div>
        <button
          type="button"
          onClick={handlePrint}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          چاپ تمام صفحات قرارداد
        </button>
      </div>

      {printMode ? (
        <>
          {PAGES.map((PageComponent, index) => (
            <div key={`print-page-${index + 1}`} className={index > 0 ? 'page-break-before' : ''}>
              <PrintableContractLayout
                headerChildren={renderHeaderContent()}
                footerChildren={renderFooterSignatures()}
              >
                <div className="bg-white p-5 rounded-lg shadow-sm text-sm border border-gray-100 min-h-[60vh]">
                  <PageComponent agencyContract={agencyContract} qrValue={qrValue} />
                </div>
              </PrintableContractLayout>
            </div>
          ))}
        </>
      ) : (
        <PrintableContractLayout
          headerChildren={renderHeaderContent()}
          footerChildren={renderFooterSignatures()}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-5 rounded-lg shadow-sm text-sm border border-gray-100 min-h-[60vh]"
          >
            {renderCurrentPage()}
          </motion.div>
        </PrintableContractLayout>
      )}
    </div>
  );
};

export default AgencyContract;
