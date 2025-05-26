/* eslint-disable new-cap */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { toast } from 'react-toastify';
import {
  StorefrontOutlined,
  PersonOutlined,
  ReceiptOutlined,
  LocationOnOutlined,
  PhoneOutlined,
  EmailOutlined,
  BusinessOutlined,
  PrintOutlined,
} from '@mui/icons-material';

const InfoCard = ({ title, icon, children }) => (
  <div className="bg-white rounded-2xl border border-gray-200 p-6 h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
    <div className="flex items-center mb-6">
      <div className="bg-blue-50 text-blue-600 p-3 rounded-xl mr-4">{icon}</div>
      <h3 className="text-lg font-bold text-gray-800">{title}</h3>
    </div>
    {children}
  </div>
);

InfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-start mb-3">
    <div className="text-blue-600 mr-3 mt-0.5 flex-shrink-0">{icon}</div>
    <span className="text-gray-500 text-sm min-w-[100px] mr-2">{label}:</span>
    <span className="text-gray-800 text-sm font-medium">{value}</span>
  </div>
);

InfoRow.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

const PaymentInvoice = ({ invoiceData }) => {
  const invoiceRef = useRef(null);
  const unitPrice = Math.round(invoiceData.investor_request.amount_of_payment / 1.1);
  const totalPrice = invoiceData.investor_request.amount_of_payment;
  const tax = Math.round(unitPrice * 0.1);

  const defaultInvoiceData = {
    invoiceNumber: '233000142146',
    invoiceDate: '1403/08/30',
    dueDate: '1403/09/15',
    status: 'pending',
    seller: {
      name: 'توسعه اطلاعات مالی ایساتیس پویا ',
      registrationNumber: '27707',
      economicCode: '14011926975',
      nationalId: '14011926975',
      address:
        'استان یزد، شهرستان یزد، بخش مرکزی، شهر یزد، وحدت، کوچه بوستان، کوچه 54 جمهوری اسلامی[شرق]، پلاک 0، ساختمان انا، طبقه همکف، واحد 65',
      phone: '0353311',
      email: 'info@isatispooya.com',
      postalCode: '1234567890',
    },
    buyer: {
      name: 'نام شرکت ثبت نشده',
      registrationNumber: 'ثبت نشده',
      economicCode: 'ثبت نشده',
      nationalId: 'ثبت نشده',
      address: 'آدرس ثبت نشده',
      phone: 'تلفن ثبت نشده',
      email: 'وب‌سایت ثبت نشده',
      postalCode: 'کد پستی ثبت نشده',
    },
    items: [
      {
        id: 1,
        code: '2230001115150',
        description: 'پشتیبانی و نگهداری',
        quantity: 1,
        unitPrice,
        discount: 0,
        tax,
        totalPrice,
      },
    ],
    summary: {
      subtotal: unitPrice,
      totalTax: tax,
      totalAmount: totalPrice,
    },
  };

  const data = {
    ...defaultInvoiceData,
    buyer: invoiceData?.investor_request?.company
      ? {
          name: invoiceData.investor_request.company.title || 'نام شرکت ثبت نشده',
          registrationNumber:
            invoiceData.investor_request.company.registration_number?.toString() || 'ثبت نشده',
          economicCode: invoiceData.investor_request.company.economic_code || 'ثبت نشده',
          nationalId: invoiceData.investor_request.company.national_id || 'ثبت نشده',
          address: invoiceData.investor_request.company.address || 'آدرس ثبت نشده',
          phone: invoiceData.investor_request.company.tel || 'تلفن ثبت نشده',
          email: invoiceData.investor_request.company.website || 'وب‌سایت ثبت نشده',
          postalCode: invoiceData.investor_request.company.postal_code || 'کد پستی ثبت نشده',
        }
      : defaultInvoiceData.buyer,
  };

  const formatNumber = (num) => {
    return num?.toLocaleString('fa-IR') || '0';
  };

  const convertColors = () => {
    const elements = document.querySelectorAll('*');
    elements.forEach((el) => {
      const style = window.getComputedStyle(el);
      if (style.color.includes('oklch')) {
        el.style.color = 'rgb(0, 0, 0)';
      }
      if (style.backgroundColor.includes('oklch')) {
        el.style.backgroundColor = 'rgb(255, 255, 255)';
      }
    });
  };

  const handleGeneratePDF = async () => {
    try {
      toast.info('شروع تولید PDF');
      convertColors();

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const element = invoiceRef.current;

      if (!element) {
        throw new Error('عنصر فاکتور یافت نشد');
      }

      const canvas = await html2canvas(element, {
        scale: 1.5, // Reduced scale for better quality/size balance
        useCORS: true,
        logging: false,
        width: element.offsetWidth,
        height: element.offsetHeight,
      });

      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * pageWidth) / canvas.width;

      // If content is taller than A4, we'll need to add pages
      if (imgHeight > pageHeight) {
        const pageCount = Math.ceil(imgHeight / pageHeight);
        for (let i = 0; i < pageCount; i += 1) {
          if (i > 0) {
            pdf.addPage();
          }
          const position = -i * pageHeight;
          pdf.addImage(
            canvas.toDataURL('image/jpeg', 0.95),
            'JPEG',
            0,
            position,
            imgWidth,
            imgHeight
          );
        }
      } else {
        pdf.addImage(canvas.toDataURL('image/jpeg', 0.95), 'JPEG', 0, 0, imgWidth, imgHeight);
      }

      pdf.save('invoice.pdf');
      toast.success('PDF با موفقیت تولید شد');
    } catch (error) {
      toast.error(`خطا در تولید PDF: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <ReceiptOutlined className="text-5xl" />
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-1">صورتحساب</h1>
                <p className="text-blue-100 text-sm">
                  شماره قرارداد: {invoiceData.investor_request.contract_number}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleGeneratePDF}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-50 transition-colors"
            >
              <PrintOutlined />
              <span>چاپ فاکتور</span>
            </button>
          </div>
        </div>

        <div className="p-8" ref={invoiceRef}>
          <div className="text-left ">
            <p className="text-gray-600">
              شماره قرارداد: {`5${invoiceData.investor_request.contract_number}`}
            </p>
          </div>
          {/* Seller and Buyer Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <InfoCard title=" اطلاعات فروشنده " icon={<StorefrontOutlined className="text-2xl" />}>
              <div className="space-y-1">
                <InfoRow
                  icon={<BusinessOutlined fontSize="small" />}
                  label="نام شخص حقوقی "
                  value={data.seller.name}
                />
                <InfoRow
                  icon={<ReceiptOutlined fontSize="small" />}
                  label="شماره ثبت"
                  value={data.seller.registrationNumber}
                />
                <InfoRow
                  icon={<ReceiptOutlined fontSize="small" />}
                  label="کد اقتصادی"
                  value={data.seller.economicCode}
                />
                <InfoRow
                  icon={<LocationOnOutlined fontSize="small" />}
                  label="آدرس"
                  value={data.seller.address}
                />
                <InfoRow
                  icon={<PhoneOutlined fontSize="small" />}
                  label="تلفن"
                  value={data.seller.phone}
                />
                <InfoRow
                  icon={<EmailOutlined fontSize="small" />}
                  label="ایمیل"
                  value={data.seller.email}
                />
              </div>
            </InfoCard>

            <InfoCard title="اطلاعات خریدار" icon={<PersonOutlined className="text-2xl" />}>
              <div className="space-y-1">
                <InfoRow
                  icon={<BusinessOutlined fontSize="small" />}
                  label="نام شخص حقوقی"
                  value={data.buyer.name}
                />
                <InfoRow
                  icon={<ReceiptOutlined fontSize="small" />}
                  label="شماره ثبت"
                  value={data.buyer.registrationNumber}
                />
                <InfoRow
                  icon={<ReceiptOutlined fontSize="small" />}
                  label="کد اقتصادی"
                  value={data.buyer.economicCode}
                />
                <InfoRow
                  icon={<LocationOnOutlined fontSize="small" />}
                  label="آدرس"
                  value={data.buyer.address}
                />
                <InfoRow
                  icon={<PhoneOutlined fontSize="small" />}
                  label="تلفن"
                  value={data.buyer.phone}
                />
                <InfoRow
                  icon={<EmailOutlined fontSize="small" />}
                  label="ایمیل"
                  value={data.buyer.email}
                />
              </div>
            </InfoCard>
          </div>

          {/* Invoice Items */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">کالا یا خدمات مورد معامله </h3>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full">
                <thead>
                  <tr className="bg-blue-50 border-b border-blue-100">
                    <th className="px-4 py-3 text-center font-bold text-gray-700 text-sm">ردیف</th>
                    <th className="px-4 py-3 text-center font-bold text-gray-700 text-sm">
                      کد کالا
                    </th>
                    <th className="px-4 py-3 text-right font-bold text-gray-700 text-sm">
                      شرح کالا/خدمت
                    </th>
                    <th className="px-4 py-3 text-center font-bold text-gray-700 text-sm">
                      تعداد/مقدار
                    </th>
                    <th className="px-4 py-3 text-left font-bold text-gray-700 text-sm">
                      مبلغ واحد (ریال)
                    </th>
                    <th className="px-4 py-3 text-left font-bold text-gray-700 text-sm">
                      تخفیف (ریال)
                    </th>
                    <th className="px-4 py-3 text-left font-bold text-gray-700 text-sm">
                      مالیات (ریال)
                    </th>
                    <th className="px-4 py-3 text-left font-bold text-gray-700 text-sm">
                      مبلغ کل (ریال)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((item, index) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors duration-200"
                    >
                      <td className="px-4 py-4 text-center text-gray-600">{index + 1}</td>
                      <td className="px-4 py-4 text-center text-gray-600">{item.code}</td>
                      <td className="px-4 py-4 text-gray-800">{item.description}</td>
                      <td className="px-4 py-4 text-center text-gray-600">
                        {formatNumber(item.quantity)}
                      </td>
                      <td className="px-4 py-4 text-left text-gray-600">
                        {formatNumber(item.unitPrice)}
                      </td>
                      <td className="px-4 py-4 text-left text-gray-600">
                        {formatNumber(item.discount)}
                      </td>
                      <td className="px-4 py-4 text-left text-gray-600">
                        {formatNumber(item.tax)}
                      </td>
                      <td className="px-4 py-4 text-left font-bold text-gray-800">
                        {formatNumber(item.totalPrice)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary Section */}
          <div className="flex justify-end">
            <div className="w-full lg:w-5/12">
              <div className="bg-blue-50/50 border border-blue-200 rounded-2xl overflow-hidden">
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">جمع کل:</span>
                    <span className="text-lg font-semibold text-gray-800">
                      {formatNumber(invoiceData.investor_request.amount_of_payment)} ریال
                    </span>
                  </div>
                  <div className="border-t border-blue-200" />
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">مالیات:</span>
                    <span className="text-lg font-semibold text-gray-800">
                      {formatNumber(tax)} ریال
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">تخفیف:</span>
                    <span className="text-lg font-semibold text-gray-800">0 ریال</span>
                  </div>
                </div>
                <div className="bg-blue-600 text-white p-6 flex justify-between items-center">
                  <span className="text-lg font-bold">مبلغ پرداخت شده:</span>
                  <span className="text-2xl font-bold">
                    {formatNumber(invoiceData.investor_request.amount_of_payment)} ریال
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-500 text-sm mb-8">
              این فاکتور به صورت الکترونیکی صادر شده و معتبر می‌باشد
            </p>

            {/* Signature Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {/* Seller Signature */}
              <div className="text-center">
                <div className="border-t border-gray-300 w-48 mx-auto mb-2" />
                <p className="text-gray-700 font-medium">امضاء فروشنده</p>
                <p className="text-gray-600 text-sm mt-1">{data.seller.name}</p>
              </div>

              {/* Buyer Signature */}
              <div className="text-center">
                <div className="border-t border-gray-300 w-48 mx-auto mb-2" />
                <p className="text-gray-700 font-medium">امضاء خریدار</p>
                <p className="text-gray-600 text-sm mt-1">{data.buyer.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PaymentInvoice.propTypes = {
  invoiceData: PropTypes.shape({
    investor_request: PropTypes.shape({
      company: PropTypes.shape({
        title: PropTypes.string,
        registration_number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        economic_code: PropTypes.string,
        national_id: PropTypes.string,
        address: PropTypes.string,
        tel: PropTypes.string,
        website: PropTypes.string,
        postal_code: PropTypes.string,
      }),
      amount_of_payment: PropTypes.number,
      tax_amount: PropTypes.number,
      contract_number: PropTypes.string,
    }),
  }),
};

export default PaymentInvoice;
