import React from 'react';
import { FaSquareCheck } from 'react-icons/fa6';
import { ImCheckboxUnchecked } from "react-icons/im";

const Roadmap = () => {
  return (
    <div className="">
      <ul className="timeline timeline-vertical bg-white text-right" >
        <li>
          <div className="timeline-end">۱۹۸۴</div>
          <div className="timeline-start timeline-box bg-white">ایجاد طرح</div>
          <div className="timeline-middle bg-white">
            <FaSquareCheck />
          </div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-start bg-white">12/12/1401</div>
          <div className="timeline-middle bg-white">
            <FaSquareCheck />
          </div>
          <div className="timeline-end timeline-box bg-white">دریافت تضامین</div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-end">12/10/1402</div>
          <div className="timeline-start timeline-box bg-white">شروع تامین مالی</div>
          <div className="timeline-middle">
            <FaSquareCheck />
          </div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-start bg-white">10/5/1402</div>
          <div className="timeline-middle">
            <FaSquareCheck />
          </div>
          <div className="timeline-end timeline-box bg-white">شروع محاسبه سود</div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-end">1/1/1403</div>
          <div className="timeline-start timeline-box bg-white">دریافت شروع</div>
          <div className="timeline-middle">
          <ImCheckboxUnchecked />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Roadmap;
