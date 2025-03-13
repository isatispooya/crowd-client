import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './list.item';

const List = ({ members, onFileChange, onSubmit, uploadStatus, isSubmitting, theme }) => {
  const uploadFields = [
    { label: 'کارت ملی', type: 'national_cart', icon: '🪪' },
    { label: 'شناسنامه', type: 'birth_certificate', icon: '📄' },
    { label: 'سوء پیشینه', type: 'previous_article', icon: '📋' },
    { label: 'اعتبار سنجی', type: 'validation_report', icon: '✅' },
  ];

  return (
    <>
      {members.map((member) => (
        <ListItem
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

List.propTypes = {
  members: PropTypes.array.isRequired,
  onFileChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  uploadStatus: PropTypes.object,
  isSubmitting: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

export default List;
