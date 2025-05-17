import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import { OnRun } from 'src/api/OnRun';
import { useParams } from 'react-router-dom';
import FormField from '../../../components/FormField';
import AccordionCom from '../../../components/accordian';
import useCompanyRegistrationStore from '../../../store/companyRegistrationStore';
import { useGetCompany } from '../../../hooks';

const CompanyInfo = ({ pastelBlue }) => {
  const { setFile, removeFile, resetStore } = useCompanyRegistrationStore();
  const { id } = useParams();
  const { data: companyData } = useGetCompany(id);

  useEffect(() => {
    if (companyData?.investor_request) {
      const { logo, validation_report, financial_statement } = companyData.investor_request;

      if (logo) {
        const fileUrl = `${OnRun}${logo}`;
        setFile('logo', { name: logo.split('/').pop(), url: fileUrl });
      } else {
        removeFile('logo');
      }

      if (validation_report) {
        const fileUrl = `${OnRun}${validation_report}`;
        setFile('validation_report', { name: validation_report.split('/').pop(), url: fileUrl });
      } else {
        removeFile('validation_report');
      }

      if (financial_statement) {
        const fileUrl = `${OnRun}${financial_statement}`;
        setFile('financial_statement', {
          name: financial_statement.split('/').pop(),
          url: fileUrl,
        });
      } else {
        removeFile('financial_statement');
      }
    } else {
      resetStore();
    }
  }, [companyData, removeFile, resetStore, setFile]);

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
      accept: '.png, .jpg, .jpeg, image/*',
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

    if (file instanceof File) return file;
    if (file?.url) return { name: file.name, url: file.url };

    return null;
  };

  if (!companyData) {
    return null;
  }

  return (
    <Grid item xs={12}>
      <AccordionCom
        title="اطلاعات شرکت"
        defaultExpanded
        id="company-info"
        pastelBlue={pastelBlue}
        sx={{
          width: '100%',
          '& .MuiAccordionSummary-root': {
            bgcolor: pastelBlue.light,
            borderRadius: '4px',
          },
        }}
      >
        <Grid container spacing={2}>
          {fileFields.map((field) => (
            <Grid item xs={12} key={field.name}>
              <FormField
                label={field.label}
                name={field.name}
                value={getFileValue(field.name)}
                onChange={(e) => handleFileChange(e, fileFieldMapping[field.name])}
                onFileRemove={() => handleFileRemove(fileFieldMapping[field.name])}
                type="file"
                accept={field.accept}
                hint={field.hint}
                pastelBlue={pastelBlue}
                fullWidth
              />
            </Grid>
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
