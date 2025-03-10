import React from 'react';
import PropTypes from 'prop-types';
import MemberListItem from './membersList.item';

const MembersList = ({ 
  members, 
  onFileChange,
  onSubmit, 
  uploadStatus, 
  isSubmitting,
  theme 
}) => {
  // Define upload fields configuration
  const uploadFields = [
    { label: 'کارت ملی', type: 'national_cart' },
    { label: 'شناسنامه', type: 'birth_certificate' },
    { label: 'سوء پیشینه', type: 'previous_article' },
    { label: 'اعتبار سنجی', type: 'validation_report' }
  ];

  return (
    <>
      {members.map((member) => (
        <MemberListItem
          key={member.id}
          member={member}
          onFileChange={onFileChange}
          onSubmit={onSubmit}
          uploadStatus={uploadStatus}
          uploadFields={uploadFields}
          isSubmitting={isSubmitting}
          theme={theme}
        />
      ))}
    </>
  );
};

MembersList.propTypes = {
  members: PropTypes.array.isRequired,
  onFileChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  uploadStatus: PropTypes.object,
  isSubmitting: PropTypes.object,
  theme: PropTypes.object.isRequired
};

export default MembersList;