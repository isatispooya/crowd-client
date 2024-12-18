import React from 'react';
import { FiDownload } from 'react-icons/fi';
import { OnRun } from 'src/api/OnRun';
import SmallError from 'src/components/smallError';
import { useParams } from 'react-router-dom';
import SmallLoader from 'src/components/SmallLoader';
import useAudit from '../service/useAudit';

const Audit = () => {
  const { traceCode } = useParams();
  const { data: Audits, isLoading, error } = useAudit(traceCode);

  if (isLoading) {
    return <SmallLoader />;
  }

  if (error) {
    return <SmallError label="یافت نشد" />;
  }

  if (!Audits) {
    return <SmallError label="یافت نشد" />;
  }

  const filesWithAttachment = Audits.filter(item => item.file);

  if (filesWithAttachment.length === 0) {
    return <SmallError label="فایلی موجود نمی‌باشد" />;
  }

  return (
    <div className="p-4 bg-white">
      {filesWithAttachment.map((item, index) => (
        <div
          key={index}
          className="flex justify-between items-center mb-4 p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out"
        >
          <div>
            <p className="text-lg font-semibold text-gray-800">{item.title}</p>
          </div>
          <div className="flex gap-4">
            <a
              href={`${OnRun}${item.file}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 flex items-center hover:text-blue-800 text-sm font-medium transition-colors duration-200 ease-in-out"
            >
              دانلود فایل
              <FiDownload className="w-5 h-5 ml-2" />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Audit;
