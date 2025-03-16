import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import QRCode from 'react-qr-code';
import { useSearchParams } from 'react-router-dom';
import { formatNumber } from 'src/utils/formatNumbers';
import PrintableLayout from 'src/layouts/printableLayout';
import Loader from 'src/components/loader';
import moment from 'moment';
import PrintableContractLayout from 'src/layouts/printableLayourtContract';
import { useAgencyContract } from '../hooks';

const AgencyContract = () => {
  const [searchParams] = useSearchParams();
  const urlUuid = searchParams.get('uuid');
  const [finalUuid, setFinalUuid] = useState(null);
  const [qrValue, setQrValue] = useState('');

  useEffect(() => {
    if (urlUuid && urlUuid !== 'undefined') {
      setFinalUuid(urlUuid);
    }
  }, [urlUuid]);

  const {
    data: agencyContract,
    isLoading,
    refetch,
  } = useAgencyContract(finalUuid !== 'undefined' ? finalUuid : null);

  useEffect(() => {
    if (finalUuid && finalUuid !== 'undefined' && agencyContract) {
      setQrValue('https://app.isatiscrowd.ir/agencyContract');
    }
  }, [finalUuid, agencyContract]);

  useEffect(() => {
    if (finalUuid && finalUuid !== 'undefined') {
      refetch();
    }
  }, [finalUuid, refetch]);

  // Create header component with company info
  const renderHeaderContent = () => {
    if (!agencyContract) return null;

    return (
      <div className="flex flex-col gap-1 text-left">
        {agencyContract.investor_request?.logo && (
          <div className="mb-1">
            <img
              src={agencyContract.investor_request.logo}
              alt="Investor Logo"
              className="h-10 object-contain"
            />
          </div>
        )}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-700">شماره قرارداد:</span>
          <span className="text-xs text-gray-700">
            {agencyContract.contract_number || 'تعیین نشده'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-700">تاریخ قرارداد:</span>
          <span className="text-xs text-gray-700">
            {agencyContract.agency_agreement_date
              ? moment(agencyContract.agency_agreement_date).format('jYYYY/jMM/jDD')
              : 'تعیین نشده'}
          </span>
        </div>
        {agencyContract.company && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-700">شرکت:</span>
            <span className="text-xs text-gray-700">{agencyContract.company.title}</span>
          </div>
        )}
      </div>
    );
  };

  // Create footer component with signature boxes
  const renderFooterSignatures = () => {
    if (!agencyContract || !agencyContract.company_members) return null;

    // Filter members who have signature authority
    const signatoryMembers = agencyContract.company_members.filter(
      (member) => member.signature === true
    );

    // Static users to always include
    const staticUsers = [
      { person_title: 'سیدعلیمحمد خبیری', position_title: 'مدیر عامل' },
      { person_title: 'محسن زارعیان', position_title: 'رئیس هیئت مدیره' },
    ];

    // Combine static and dynamic users
    const allSignatories = [...staticUsers];

    // Add dynamic signatories if they exist and aren't duplicates of static users
    if (signatoryMembers.length > 0) {
      signatoryMembers.forEach((member) => {
        // Check if this member is already in static users (by name)
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
      <div className="mt-4">
        <h3 className="text-xs font-bold mb-2 text-center border-b pb-1">
          امضاء صاحبان امضای مجاز
        </h3>

        {/* All signature boxes in one line */}
        <div className="flex justify-between gap-1">
          {allSignatories.map((user, index) => (
            <div key={`signatory-${index}`} className="flex-1">
              <div className="border border-gray-300 rounded p-1 w-full">
                <div className="text-center">
                  <p className="font-bold text-[10px]">{user.person_title}</p>
                  <p className="text-[8px] text-gray-600">{user.position_title}</p>
                </div>
                <div className="h-10 border-dashed border border-gray-300 rounded flex items-center justify-center mt-1">
                  <p className="text-gray-400 text-[8px]">محل امضاء</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-2 text-[8px] text-gray-500 text-center">
          <div className="flex justify-between">
            <span>شماره قرارداد: {agencyContract.contract_number || 'تعیین نشده'}</span>
            <span>
              تاریخ قرارداد:{' '}
              {agencyContract.agency_agreement_date
                ? moment(agencyContract.agency_agreement_date).format('jYYYY/jMM/jDD')
                : 'تعیین نشده'}
            </span>
            <span>مبلغ چک تضمین: {formatNumber(agencyContract.warranty_check)} ریال</span>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PrintableContractLayout
      printButtonText="دانلود و پرینت نامه بانکی"
      headerChildren={renderHeaderContent()}
      footerChildren={renderFooterSignatures()}
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-gray-50 p-5 rounded-lg shadow-sm text-sm border border-gray-100"
      >
        v
      </motion.div>
    </PrintableContractLayout>
  );
};

export default AgencyContract;
