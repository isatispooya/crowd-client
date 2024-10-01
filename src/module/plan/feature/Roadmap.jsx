import React from 'react';
import { FaSquareCheck } from 'react-icons/fa6';
import { ImCheckboxUnchecked } from 'react-icons/im';
import { useParams } from 'react-router-dom';
import moment from 'moment-jalaali';
import SmallLoader from 'src/components/SmallLoader';
import useRoadMap from '../comment/service/useRoadMap';

const Roadmap = () => {
  const { id } = useParams();
  const { isLoading, data } = useRoadMap(id);
  console.log(data)
  if (isLoading) {
    return <SmallLoader />;
  }

  const convertToJalali = (date) => {
    if (!date) return 'تاریخ موجود نیست';
    return moment(date).format('jYYYY/jMM/jDD');
  };

  const roadmap = data || {};

  return (
    <div className="">
      <ul className="timeline timeline-vertical bg-white text-right">
        <li>
          <hr />
          <div className="timeline-start bg-white">{convertToJalali(data.date_cart)}</div>
          <div className="timeline-middle bg-white">
            {roadmap.completed ? <FaSquareCheck /> : <ImCheckboxUnchecked />}
          </div>
          <div className="timeline-end timeline-box bg-white">{roadmap.date_cart || 'عنوان نامشخص'}</div>
          <hr />
        </li>
      </ul>
    </div>
  );
};

export default Roadmap;
