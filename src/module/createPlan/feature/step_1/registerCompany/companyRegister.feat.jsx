import { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid, Paper } from '@mui/material';
import { CompanyInfo, CompanyBankInfo, PlanInfo } from './index';
import { UseCompanyInfo } from '../../../hooks';
import useCompanyRegistrationStore from '../../../store/companyRegistrationStore';
import Button from '../../../components/button';

const CompanyRegister = ({ generetedId }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { getAllData, resetStore } = useCompanyRegistrationStore();

  const pastelBlue = {
    light: '#E6F4FF',
    main: '#B3E0FF',
    dark: '#6B9ACD',
    contrastText: '#1A365D',
  };

  const { mutate, isLoading } = UseCompanyInfo.useCompanyInfo();

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      if (!generetedId) {
        console.error('Company ID is undefined or empty');
        setIsSubmitting(false);
        return;
      }

      const data = getAllData();
      console.log('All data from store:', data);

      // Check if files exist and are valid
      console.log('Logo file:', data.logo);
      console.log('Validation report file:', data.validation_report);
      console.log('Financial statement file:', data.financial_statement);

      const formData = new FormData();

      // Add file fields if they exist
      if (data.logo && data.logo instanceof File) {
        console.log(
          'Adding logo file to FormData:',
          data.logo.name,
          data.logo.type,
          data.logo.size
        );
        formData.append('logo', data.logo);
      } else if (data.logo) {
        console.warn('Logo exists but is not a File object:', typeof data.logo);
      }

      if (data.validation_report && data.validation_report instanceof File) {
        console.log('Adding validation report to FormData:', data.validation_report.name);
        formData.append('validation_report', data.validation_report);
      } else if (data.validation_report) {
        console.warn(
          'Validation report exists but is not a File object:',
          typeof data.validation_report
        );
      }

      if (data.financial_statement && data.financial_statement instanceof File) {
        console.log('Adding financial statement to FormData:', data.financial_statement.name);
        formData.append('financial_statement', data.financial_statement);
      } else if (data.financial_statement) {
        console.warn(
          'Financial statement exists but is not a File object:',
          typeof data.financial_statement
        );
      }

      // Add other fields
      formData.append('bank', data.bank || '');
      formData.append('bank_branch', data.bank_branch || '');
      formData.append('bank_branch_code', data.bank_branch_code || '');
      formData.append('company_id', generetedId);
      formData.append('suggestion_plan_name', data.suggestion_plan_name || '');

      if (data.amount_of_investment) {
        formData.append('amount_of_investment', data.amount_of_investment.toString());
      }

      // Log form data entries for debugging
      console.log('Sending FormData with files:');
      Array.from(formData.entries()).forEach(([key, value]) => {
        if (value instanceof File) {
          console.log(`${key}: File - ${value.name} (${value.type}, ${value.size} bytes)`);
        } else {
          console.log(`${key}: ${value}`);
        }
      });

      console.log('Submitting form data...');
      mutate(formData, {
        onSuccess: (response) => {
          console.log('Registration successful:', response);
          setIsSubmitting(false);
          resetStore();
          // You can add navigation or success message here
        },
        onError: (error) => {
          console.error('Error submitting registration:', error);
          console.error('Error details:', error.response?.data || error.message);
          setIsSubmitting(false);
          // You can add error handling here
        },
      });
    } catch (error) {
      console.error('Error preparing data:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        ثبت اطلاعات شرکت
      </Typography>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={4}>
          <CompanyInfo pastelBlue={pastelBlue} />
          <CompanyBankInfo pastelBlue={pastelBlue} />
          <PlanInfo pastelBlue={pastelBlue} />

          <Grid item xs={12} sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              disabled={isSubmitting || isLoading}
              loading={isSubmitting || isLoading}
              pastelBlue={pastelBlue}
            >
              ثبت اطلاعات
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

CompanyRegister.propTypes = {
  generetedId: PropTypes.string.isRequired,
};

export default CompanyRegister;
