import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useGetPlan from '../service/use-plan';
import Registere from './registered';



const InvestorPlan = () => {
  const [openAccordion, setOpenAccordion] = useState(null);
  const { traceCode } = useParams();
  const { data } = useGetPlan(traceCode);
  const handleOpen = (accordionId) => {
    setOpenAccordion((prev) => (prev === accordionId ? null : accordionId));
  };
  const renderComponents = [
    {
      label: 'اطلاعات ثبتی شرکت متقاضی',
      component: data.plan.total_price || 'اطلاعاتی ثبتی شرکت متقاضی ',
    },
    {
      label: 'اطلاعات سهام داران بالای 10درصد',
      component: data.plan.industry_group_description || 'اطلاعات سهام دارن بالای 10 درصد',
    },
    {
      label: 'اطلاعات مدیر عامل و اعضای هیئت مدیره',
      component:<Registere/> || 'اطلاعات مدیرعامل و اعضای هیئت مدیره',
    },
  ];

  return (
    <div id="accordion-flush" className="shadow-lg rounded-lg overflow-hidden">
      {renderComponents.map((item, index) => (
        <div key={index}>
          <button
            type="button"
            className="flex items-center justify-between w-full py-5 px-6 font-semibold rtl:text-right text-gray-900 bg-gray-100 border-b border-gray-300 hover:bg-gray-300 transition-all duration-300"
            onClick={() => handleOpen(index)}
            aria-expanded={openAccordion === index}
          >
            <span>{item.label}</span>
            <span className={`text-2xl transition-transform duration-300 ${openAccordion}`} />
          </button>
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out bg-white ${
              openAccordion === index ? 'max-h-screen py-4 px-6' : 'max-h-0'
            }`}
          >
            {item.component}
          </div>
        </div>
      ))}
    </div>
  );
};

export default InvestorPlan;
