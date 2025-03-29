import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {  useSearchParams } from 'react-router-dom';
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
      <div className="w-full">
        <div className="flex justify-between gap-1 mt-auto">
          {allSignatories.map((user, index) => (
            <div key={`signatory-${index}`} className="flex-1">
              <div style={{ borderColor: '#d1d5db' }} className="border rounded p-1 w-full">
                <div className="text-center flex flex-col h-[80px] justify-center">
                  <p className="font-bold text-[14px] leading-tight" style={{ color: '#000000' }}>
                    {user.person_title}
                  </p>
                  <p className="text-[12px] leading-tight" style={{ color: '#4b5563' }}>
                    {user.position_title}
                  </p>
                </div>
                <div
                  style={{ borderColor: '#d1d5db' }}
                  className="h-[50px] border-dashed border rounded flex items-center justify-center mt-1"
                >
                  <p style={{ color: '#9ca3af' }} className="text-[12px]">
                    محل امضاء
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="contract-container" ref={targetRef}>
        {PAGES.map((PageComponent, index) => (
          <div key={`page-${index}`} className="mb-8">
            <PrintableContractLayout footerChildren={renderFooterSignatures()}>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 * index }}
                className="bg-white rounded-lg shadow-sm text-sm border border-gray-100"
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
