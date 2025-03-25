import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import Loader from 'src/components/loader';
import PrintableContractLayout from 'src/layouts/printableLayourtContract';
import { OnRun } from 'src/api/OnRun';
import { useAgencyContract } from '../hooks';
import { PAGES, TOTAL_PAGES } from '../feature/agancyContract';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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

const AgencyContractPage = () => {
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

  const renderHeaderContent = () => {
    if (!agencyContract) return null;

    return (
      <div className="flex flex-col gap-1 text-left">
        {agencyContract.investor_request?.logo && (
          <div className="mb-1">
            <img
              src={OnRun + agencyContract.investor_request.logo}
              alt="Investor Logo"
              className="h-20 object-contain"
            />
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

  const handlePrint = async () => {
    setPrintMode(true);

    setTimeout(async () => {
      try {
        const pdf = new jsPDF('p', 'mm', 'a4');
        const elements = document.querySelectorAll(
          '.page-break-before, .contract-container > div:first-child'
        );

        for (let i = 0; i < elements.length; i++) {
          const element = elements[i];

          // Convert colors to RGB before capturing
          const allElements = element.getElementsByTagName('*');
          Array.from(allElements).forEach((el) => {
            const style = window.getComputedStyle(el);
            el.style.color = style.color;
            el.style.backgroundColor = style.backgroundColor;
            el.style.borderColor = style.borderColor;
          });

          const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#FFFFFF',
            logging: false,
          });

          // Convert canvas to image
          const imgData = canvas.toDataURL('image/jpeg', 1.0);

          // Calculate dimensions to fit A4
          const pageWidth = pdf.internal.pageSize.getWidth();
          const pageHeight = pdf.internal.pageSize.getHeight();
          const imgWidth = canvas.width;
          const imgHeight = canvas.height;
          const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
          const imgX = (pageWidth - imgWidth * ratio) / 2;
          const imgY = 0;

          // Add new page if not first page
          if (i > 0) {
            pdf.addPage();
          }

          pdf.addImage(imgData, 'JPEG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
        }

        pdf.save('contract.pdf');
      } catch (error) {
        console.error('PDF generation failed:', error);
      }

      setPrintMode(false);
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
    if (!PAGES[currentPage - 1]) return null;
    return React.createElement(PAGES[currentPage - 1], { agencyContract });
  };

  return (
    <div className="contract-container">
      <style>{printStyles}</style>

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
          دانلود PDF قرارداد
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
                  {React.createElement(PageComponent, { agencyContract })}
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

export default AgencyContractPage;
