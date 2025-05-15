import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { ToastContainer, toast } from 'react-toastify';
import { PrintableContractLayout } from 'src/module/createPlan/layouts';
import { useAgencyContract } from 'src/module/createPlan/hooks';
import { PAGES } from './agencyPages';
import 'react-toastify/dist/ReactToastify.css';

const AgencyContract = () => {
  const [searchParams] = useSearchParams();
  const uuid = searchParams.get('uuid');
  const [finalUuid, setFinalUuid] = useState('');
  const pageRefs = useRef([]);

  useEffect(() => {
    console.log('UUID from URL:', uuid);
    if (uuid && uuid !== 'undefined') {
      setFinalUuid(uuid);
    }
    pageRefs.current = Array(PAGES.length)
      .fill()
      .map(() => React.createRef());
  }, [uuid]);

  const { data: agencyContract } = useAgencyContract(finalUuid);

  useEffect(() => {
    console.log('Agency Contract Data:', agencyContract);
  }, [agencyContract]);

  const renderFooterSignatures = () => {
    if (!agencyContract || !agencyContract.company_members) return null;

    const signatoryMembers = agencyContract.company_members.filter(
      (member) => member.signature === true
    );

    const staticUsers = [
      { person_title: 'محسن زارعیان', position_title: 'مدیر عامل' },
      { person_title: 'سیدعلیمحمد خبیری', position_title: 'عضو هیئت مدیره' },
    ];

    return (
      <div className="w-full px-0 mt-2">
        <table className="w-full border-collapse text-xs">
          <tbody>
            <tr>
              <td className="border border-gray-300 p-1 text-center w-1/2 font-bold bg-gray-50">
                <div>عامل</div>
              </td>
              <td className="border border-gray-300 p-1 text-center w-1/2 font-bold bg-gray-50">
                <div>متقاضی</div>
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-1 rounded-lg">
                <div className="flex flex-row justify-between gap-2">
                  {staticUsers.map((user, index) => (
                    <div key={`static-signatory-${index}`} className="text-center flex-1">
                      <p className="font-bold mb-0.5 text-xs">{user.person_title}</p>
                      <p className="text-xs text-gray-600 mb-1">{user.position_title}</p>
                      <div className="border border-gray-300 rounded h-10 w-full mb-0.5">
                        <p className="text-gray-400 text-xs pt-6 border-dotted border-t border-gray-300 w-full">
                          محل امضاء
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </td>
              <td className="border border-gray-300 p-1 rounded-lg">
                <div className="flex flex-row justify-center gap-2">
                  {signatoryMembers.map((member, index) => (
                    <div key={`dynamic-signatory-${index}`} className="text-center flex-1">
                      <p className="font-bold mb-0.5 text-xs">{member.person_title}</p>
                      <p className="text-xs text-gray-600 mb-1">{member.position_title}</p>
                      <div className="border border-gray-300 rounded h-10 w-full mb-0.5">
                        <p className="text-gray-400 text-xs pt-6 border-dotted border-t border-gray-300 w-full">
                          محل امضاء
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const handleGeneratePDF = async () => {
    try {
      toast.info('شروع تولید PDF');
      // eslint-disable-next-line new-cap
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = 210; // A4 width in mm

      const pages = await Promise.all(
        pageRefs.current.map(async (ref, i) => {
          const page = ref.current;
          if (!page) return null;

          const canvas = await html2canvas(page, {
            scale: 2,
            useCORS: true,
            logging: false,
            windowWidth: page.scrollWidth * 1.2,
            windowHeight: page.scrollHeight * 1.2,
          });

          return { canvas, index: i };
        })
      );

      pages.forEach((item) => {
        if (!item) return;
        const { canvas, index } = item;

        if (index > 0) {
          pdf.addPage('a4', 'portrait');
        }

        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const pageHeight = (canvas.height * pageWidth) / canvas.width;
        pdf.addImage(imgData, 'JPEG', 0, 0, pageWidth, pageHeight);
        toast.info(`صفحه ${index + 1} اضافه شد`);
      });

      pdf.save('contract.pdf');
      toast.success('PDF با موفقیت تولید شد');
    } catch (error) {
      toast.error(`خطا در تولید PDF: ${error.message}`);
    }
  };

  if (!uuid) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-semibold mb-2">خطا در بارگذاری</h3>
        <p>شناسه قرارداد (UUID) ارائه نشده است. لطفا از طریق لینک مناسب این صفحه را باز کنید.</p>
      </div>
    );
  }

  if (!agencyContract) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-semibold mb-2">در حال بارگذاری...</h3>
        <p>لطفا صبر کنید</p>
        <p className="mt-2 text-sm text-gray-600">شناسه قرارداد: {uuid}</p>
      </div>
    );
  }

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mx-auto flex justify-center items-center w-80 mb-8"
        type="button"
        onClick={handleGeneratePDF}
      >
        دانلود قرارداد کامل
      </button>
      <div>
        {PAGES.map((PageComponent, index) => {
          const isLastPage = index === PAGES.length - 1;

          return (
            <div
              key={`page-${index}`}
              ref={pageRefs.current[index]}
              className="mb-8 bg-white"
              style={{ breakInside: 'avoid', pageBreakAfter: 'always' }}
            >
              <PrintableContractLayout
                footerChildren={!isLastPage ? renderFooterSignatures() : null}
              >
                <div className="bg-white text-xs">
                  <PageComponent agencyContract={agencyContract} />
                </div>
              </PrintableContractLayout>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AgencyContract;
