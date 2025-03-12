import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import FormField from '../../../components/FormField';
import AccordionCom from '../../../components/accordian';
import useCompanyRegistrationStore from '../../../store/companyRegistrationStore';

const CompanyInfo = ({ pastelBlue }) => {
  const { setFile, removeFile } = useCompanyRegistrationStore();

  const handleFileChange = (event, type) => {
    if (event.target && event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      console.log('File from event.target.files[0]:', file);
      console.log('File properties:', {
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified,
      });

      setFile(type, file);

      setTimeout(() => {
        const storedFile = useCompanyRegistrationStore.getState()[type];
        console.log(`Stored file in "${type}":`, storedFile);
        console.log('Is File instance?', storedFile instanceof File);
      }, 100);
    } else if (event.target && event.target.value && event.target.value instanceof File) {
      const file = event.target.value;
      console.log('File from event.target.value:', file);
      console.log('File properties:', {
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified,
      });

      setFile(type, file);

      setTimeout(() => {
        const storedFile = useCompanyRegistrationStore.getState()[type];
        console.log(`Stored file in "${type}":`, storedFile);
        console.log('Is File instance?', storedFile instanceof File);
      }, 100);
    } else {
      console.warn('No file detected in event:', event);
    }
  };

  const handleFileRemove = (type) => {
    removeFile(type);
  };

  const fileFieldMapping = {
    logo: 'logo',
    credit: 'validation_report',
    financial: 'financial_statement',
  };

  const fileFields = [
    {
      name: 'logo',
      label: 'لوگو شرکت',
      hint: 'فایل لوگو باید به فرمت PNG یا JPEG باشد.',
      accept: '.pdf,image/*',
    },
    {
      name: 'credit',
      label: 'گزارش اعتبارسنجی',
      hint: 'فایل باید فرمت Excel باشد.',
      accept: '.pdf,image/*',
    },
    {
      name: 'financial',
      label: 'صورت مالی',
      hint: 'فرمت فایل باید PDF باشد.',
      accept: '.pdf,image/*',
    },
  ];

  const getFileValue = (fieldName) => {
    const storeKey = fileFieldMapping[fieldName];
    return useCompanyRegistrationStore.getState()[storeKey];
  };

  return (
    <Grid item xs={12}>
      <AccordionCom title="اطلاعات شرکت" defaultExpanded id="company-info" pastelBlue={pastelBlue}>
        <Grid container spacing={3}>
          {fileFields.map((field) => (
            <FormField
              key={field.name}
              label={field.label}
              name={field.name}
              value={getFileValue(field.name)}
              onChange={(e) => handleFileChange(e, fileFieldMapping[field.name])}
              onFileRemove={() => handleFileRemove(fileFieldMapping[field.name])}
              type="file"
              accept={field.accept}
              hint={field.hint}
              pastelBlue={pastelBlue}
              xs={12}
              md={6}
            />
          ))}
        </Grid>
      </AccordionCom>
    </Grid>
  );
};

CompanyInfo.propTypes = {
  pastelBlue: PropTypes.shape({
    light: PropTypes.string.isRequired,
    main: PropTypes.string.isRequired,
    contrastText: PropTypes.string.isRequired,
    dark: PropTypes.string.isRequired,
  }).isRequired,
};

export default CompanyInfo;
