import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import FormField from '../../../components/FormField';
import AccordionCom from '../../../components/accordian';
import useCompanyRegistrationStore from '../../../store/companyRegistrationStore';
import { useGetCompany } from '../../../hooks';
import { OnRun } from 'src/api/OnRun';

const CompanyInfo = ({ pastelBlue }) => {
  const { setFile, removeFile } = useCompanyRegistrationStore();
  const { data: companyData } = useGetCompany();

  // Preload files from investor_request data
  useEffect(() => {
    if (companyData?.investor_request) {
      const { logo, validation_report, financial_statement } = companyData.investor_request;

      // Create file objects with full URLs
      if (logo) {
        const fileUrl = `${OnRun}${logo}`;
        setFile('logo', { name: logo.split('/').pop(), url: fileUrl });
      }
      if (validation_report) {
        const fileUrl = `${OnRun}${validation_report}`;
        setFile('validation_report', { name: validation_report.split('/').pop(), url: fileUrl });
      }
      if (financial_statement) {
        const fileUrl = `${OnRun}${financial_statement}`;
        setFile('financial_statement', {
          name: financial_statement.split('/').pop(),
          url: fileUrl,
        });
      }
    }
  }, [companyData]);

  const handleFileChange = (event, type) => {
    if (event.target && event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setFile(type, file);
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
    const file = useCompanyRegistrationStore.getState()[storeKey];

    // If it's a File object, return as is
    if (file instanceof File) return file;

    // If it's our custom object with url, return that
    if (file?.url) return { name: file.name, url: file.url };

    return null;
  };

  // Show loading state while data is being fetched
  if (!companyData) {
    return null; // Or a loading spinner
  }

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
