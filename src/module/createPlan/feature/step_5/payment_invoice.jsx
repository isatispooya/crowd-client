import React from 'react';
import PropTypes from 'prop-types';
import {
  StorefrontOutlined,
  PersonOutlined,
  ReceiptOutlined,
  LocationOnOutlined,
  PhoneOutlined,
  EmailOutlined,
  BusinessOutlined,
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
        totalPrice,
        tax,
      },
    ],
    summary: {
      subtotal: 1336000000,
      totalTax: 125600000,
      totalAmount: 1461600000,
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

  return (
    <div className=" min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <ReceiptOutlined className="text-5xl" />
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-1">صورتحساب</h1>
                <p className="text-blue-100 text-sm">
                  {' '}
                  شماره قرارداد: {invoiceData.investor_request.contract_number}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
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
                      مبلغ کل (ریال)
                    </th>
                    <th className="px-4 py-3 text-left font-bold text-gray-700 text-sm">
                      مالیات (ریال)
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
                      <td className="px-4 py-4 text-left font-bold text-gray-800">
                        {formatNumber(item.totalPrice)}
                      </td>
                      <td className="px-4 py-4 text-left text-gray-600">
                        {formatNumber(item.tax)}
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
                      {formatNumber(invoiceData.investor_request.tax_amount)} ریال
                    </span>
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
            <p className="text-center text-gray-500 text-sm">
              این فاکتور به صورت الکترونیکی صادر شده و معتبر می‌باشد
            </p>
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
