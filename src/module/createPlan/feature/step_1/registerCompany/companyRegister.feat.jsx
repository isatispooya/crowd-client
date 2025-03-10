import { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid, Paper } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CompanyInfo, CompanyBankInfo, PlanInfo } from './index';
import { UseCompanyInfo } from '../../../hooks';
import useCompanyRegistrationStore from '../../../store/companyRegistrationStore';
import Button from '../../../components/button';

const CompanyRegister = ({ generetedId }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const { getAllData, resetStore } = useCompanyRegistrationStore();
  const pastelBlue = {
    light: '#E6F4FF',
    main: '#B3E0FF',
    dark: '#6B9ACD',
    contrastText: '#1A365D',
  };

  const { mutate, isLoading } = UseCompanyInfo.useCompanyInfo();

  const validateForm = (data) => {
    const errors = {};

    if (!data.bank || data.bank.trim() === '') {
      errors.bank = 'لطفاً نام بانک را وارد کنید';
    }

    if (!data.bank_branch || data.bank_branch.trim() === '') {
      errors.bank_branch = 'لطفاً نام شعبه بانک را وارد کنید';
    }

    if (!data.bank_branch_code || data.bank_branch_code.trim() === '') {
      errors.bank_branch_code = 'لطفاً کد شعبه بانک را وارد کنید';
    }

    if (!data.suggestion_plan_name || data.suggestion_plan_name.trim() === '') {
      errors.suggestion_plan_name = 'لطفاً نام طرح پیشنهادی را وارد کنید';
    }

    if (!data.amount_of_investment) {
      errors.amount_of_investment = 'لطفاً مبلغ سرمایه‌گذاری را وارد کنید';
    }

    if (!data.logo || !(data.logo instanceof File)) {
      errors.logo = 'لطفاً لوگوی شرکت را آپلود کنید';
    }

    if (!data.validation_report || !(data.validation_report instanceof File)) {
      errors.validation_report = 'لطفاً گزارش اعتبارسنجی را آپلود کنید';
    }

    if (!data.financial_statement || !(data.financial_statement instanceof File)) {
      errors.financial_statement = 'لطفاً صورت‌های مالی را آپلود کنید';
    }

    return errors;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      if (!generetedId) {
        toast.error('شناسه شرکت تعریف نشده یا خالی است');
        setIsSubmitting(false);
        return;
      }

      const data = getAllData();

      const errors = validateForm(data);

      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);

        toast.error('لطفاً تمامی فیلدهای اجباری را تکمیل کنید', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        setIsSubmitting(false);
        return;
      }

      setValidationErrors({});

      const formData = new FormData();

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

      formData.append('bank', data.bank || '');
      formData.append('bank_branch', data.bank_branch || '');
      formData.append('bank_branch_code', data.bank_branch_code || '');
      formData.append('company_id', generetedId);
      formData.append('suggestion_plan_name', data.suggestion_plan_name || '');

      if (data.amount_of_investment) {
        formData.append('amount_of_investment', data.amount_of_investment.toString());
      }

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
          setIsSubmitting(false);
          resetStore();
        },
        onError: (error) => {
          toast.error(`خطا در ثبت اطلاعات: ${error.response?.data || error.message}`);
          console.error('Error submitting registration:', error);
          console.error('Error details:', error.response?.data || error.message);
          setIsSubmitting(false);
        },
      });
    } catch (error) {
      toast.error(`خطا در ثبت اطلاعات: ${error.message}`);
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <ToastContainer position="top-center" />
      <Typography variant="h4" gutterBottom>
        ثبت اطلاعات شرکت
      </Typography>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={4}>
          <CompanyInfo pastelBlue={pastelBlue} errors={validationErrors} />
          <CompanyBankInfo pastelBlue={pastelBlue} errors={validationErrors} />
          <PlanInfo pastelBlue={pastelBlue} errors={validationErrors} />
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
