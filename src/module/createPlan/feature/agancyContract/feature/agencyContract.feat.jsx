import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { PrintableContractLayout } from 'src/module/createPlan/layouts';
import { useAgencyContract } from 'src/module/createPlan/hooks';
import { PAGES } from '../printPages';

const AgencyContract = () => {
  const [searchParams] = useSearchParams();
  const [finalUuid, setFinalUuid] = useState('');
  const targetRef = useRef();

  useEffect(() => {
    const urlUuid = searchParams.get('uuid');
    if (urlUuid) {
      setFinalUuid(urlUuid);
    }
  }, [searchParams]);

  const { data: agencyContract } = useAgencyContract(finalUuid);

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
      <div className="w-full px-2 md:px-4">
        <div className="flex flex-col md:flex-row justify-between gap-2 md:gap-4">
          {allSignatories.map((user, index) => (
            <div key={`signatory-${index}`} className="flex-1">
              <div className="border border-gray-200 rounded p-1 md:p-2 w-full">
                <div className="text-center flex flex-col h-[60px] md:h-[80px] justify-center">
                  <p className="font-bold text-xs md:text-sm leading-tight text-gray-900">
                    {user.person_title}
                  </p>
                  <p className="text-xs leading-tight text-gray-600">{user.position_title}</p>
                </div>
                <div className="h-[40px] md:h-[50px] border-dashed border border-gray-200 rounded flex items-center justify-center mt-1">
                  <p className="text-xs text-gray-400">محل امضاء</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="contract-container" ref={targetRef}>
        {PAGES.map((PageComponent, index) => (
          <div key={`page-${index}`} className="mb-4 md:mb-8">
            <PrintableContractLayout footerChildren={renderFooterSignatures()}>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 * index }}
                className="bg-white rounded-lg shadow-sm text-xs md:text-sm border border-gray-100 p-2 md:p-4"
              >
                <PageComponent agencyContract={agencyContract} />
              </motion.div>
            </PrintableContractLayout>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgencyContract;
