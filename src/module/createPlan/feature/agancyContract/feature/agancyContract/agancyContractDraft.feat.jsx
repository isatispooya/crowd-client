/* eslint-disable new-cap */
import React, { useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { ToastContainer, toast } from 'react-toastify';
import { PrintableContractLayout } from 'src/module/createPlan/layouts';
import 'react-toastify/dist/ReactToastify.css';
import { PAGES } from './agancyContractDraft';

const AgencyContractDraft = () => {
  // مقداردهی اولیه به ref ها
  const pageRefs = useRef([]);
  if (pageRefs.current.length !== PAGES.length) {
    pageRefs.current = Array(PAGES.length)
      .fill()
      .map(() => React.createRef());
  }

  const renderFooterSignatures = () => (
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
                <div className="text-center flex-1">
                  <p className="font-bold mb-0.5 text-xs">........</p>
                  <p className="text-xs text-gray-600 mb-1">........</p>
                  <div className="border border-gray-300 rounded h-10 w-full mb-0.5">
                    <p className="text-gray-400 text-xs pt-6 border-dotted border-t border-gray-300 w-full">
                      محل امضاء
                    </p>
                  </div>
                </div>
              </div>
            </td>
            <td className="border border-gray-300 p-1 rounded-lg">
              <div className="flex flex-row justify-center gap-2">
                <div className="text-center flex-1">
                  <p className="font-bold mb-0.5 text-xs">......</p>
                  <p className="text-xs text-gray-600 mb-1">......</p>
                  <div className="border border-gray-300 rounded h-10 w-full mb-0.5">
                    <p className="text-gray-400 text-xs pt-6 border-dotted border-t border-gray-300 w-full">
                      محل امضاء
                    </p>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const convertColors = () => {
    const elements = document.querySelectorAll('*');
    elements.forEach((el) => {
      const style = window.getComputedStyle(el);
      if (style.color.includes('oklch')) {
        el.style.color = 'rgb(0, 0, 0)'; // جایگزین با رنگ پیش‌فرض
      }
      if (style.backgroundColor.includes('oklch')) {
        el.style.backgroundColor = 'rgb(255, 255, 255)'; // جایگزین با رنگ پیش‌فرض
      }
    });
  };

  const handleGeneratePDF = async () => {
    try {
      toast.info('شروع تولید PDF');
      convertColors();
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
          const isLastPage = index === PAGES.length;

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
                  <PageComponent />
                </div>
              </PrintableContractLayout>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AgencyContractDraft;
