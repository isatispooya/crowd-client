import React from 'react';
import { FaSquareCheck } from 'react-icons/fa6';
import { ImCheckboxUnchecked } from 'react-icons/im';
import { useParams } from 'react-router-dom';
import SmallLoader from 'src/components/SmallLoader';
import useGetPlan from '../service/use-plan';

const Roadmap = () => {
  const { traceCode } = useParams();
  const { data, isLoading } = useGetPlan(traceCode);

  console.log(data);

  if (isLoading) {
    return <SmallLoader />;
  }

  return (
    <div className="">
      <ul className="timeline timeline-vertical bg-white text-right">
        <li>
          <hr />
          <div className="timeline-start bg-white">تاریخ ایجاد:</div>
          <div className="timeline-middle bg-white">
            {data.project_status_id === 5 ? <FaSquareCheck /> : <ImCheckboxUnchecked />}
          </div>
          <div className="timeline-end bg-white">
            {data.plan.persian_suggested_underwiring_start_date || 'وضعیت نامشخص'}
          </div>
          <hr />
        </li>
        <li>
        <hr />
          <div className="timeline-start bg-white">
            {data.plan.persian_suggested_underwiring_start_date}
          </div>
          <div className="timeline-middle bg-white">
            {data.plan.project_status_id === 15 ? <FaSquareCheck /> : <ImCheckboxUnchecked />}
          </div>
          <div className="timeline-end timeline-box bg-white">تاریخ شروع جمع آوری وجوه</div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-start timeline-box bg-white">تاریخ پایان جمع آوری وجوه</div>
          <div className="timeline-middle bg-white">
            {data.plan.project_status_id === 14 ? <FaSquareCheck /> : <ImCheckboxUnchecked />}
          </div>
          <div className="timeline-end bg-white">
            {data.plan.persian_suggested_underwriting_end_date || 'وضعیت نامشخص'}
          </div>
          <hr />
        </li>
        <li>
        <hr />
          <div className="timeline-start bg-white">{data.plan.persian_project_start_date}</div>
          <div className="timeline-middle bg-white">
            {data.plan.project_status_id === 15 ? <FaSquareCheck /> : <ImCheckboxUnchecked />}
          </div>
          <div className="timeline-end timeline-box bg-white">تاریخ شروع اجرا طرح</div>
          <hr />
        </li>
        <li>
        <hr />
          <div className="timeline-start timeline-box bg-white">تاریخ پایان اجرا طرح</div>
          <div className="timeline-middle bg-white">
            {data?.plan?.project_status_id === 14 ? <FaSquareCheck /> : <ImCheckboxUnchecked />}
          </div>
          <div className="timeline-end bg-white">{data.plan.persian_project_end_date}</div>
          <hr />
        </li>

        {data?.date_profit?.map((profit, index) => (
          <li key={index}>
            <hr />
            <div
              className={`  ${
                (index + 1) % 2 === 1 ? 'timeline-start' : ' timeline-end'
              }`}
            >
              {profit?.date}
            </div>
            <div className="timeline-middle bg-white">
              {profit?.type === '0' ? <FaSquareCheck /> : <ImCheckboxUnchecked />}
            </div>
            <div
            
              className={`timeline-box bg-white  ${
                (index + 1) % 2 === 1 ? ' timeline-end' : ' timeline-start'
              }`}
            >
              {profit?.type === '1' ? 'اصل پول' : 'پرداخت سود'}
            </div>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Roadmap;
