import React from 'react';
import PropTypes from 'prop-types';

const ContractFooter = ({ agencyContract }) => {
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
    <div className="mt-4">
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
    </div>
  );
};

ContractFooter.propTypes = {
  agencyContract: PropTypes.object.isRequired,
};

export default ContractFooter;
