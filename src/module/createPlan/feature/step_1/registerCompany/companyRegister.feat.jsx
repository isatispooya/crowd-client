import { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid, Paper, Box, Chip, Tooltip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { CompanyInfo, CompanyBankInfo, PlanInfo } from './index';
import { UseCompanyInfo } from '../../../hooks';
import useCompanyRegistrationStore from '../../../store/companyRegistrationStore';
import Button from '../../../components/button';

const StatusBanner = ({ readOnly, status }) => {
  if (!readOnly) return null;

  let icon;
  let color;
  let message;

  if (status === 'approved') {
    icon = <CheckCircleIcon />;
    color = '#4caf50';
    message = 'این مرحله تایید شده است و قابل ویرایش نمی‌باشد';
  } else if (status === 'rejected') {
    icon = <CancelIcon />;
    color = '#f44336';
    message = 'این مرحله رد شده است و نیاز به بررسی مجدد دارد';
  } else {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 2,
        mb: 3,
        borderRadius: 2,
        backgroundColor: `${color}15`,
        border: `1px solid ${color}40`,
        color,
      }}
    >
      {icon}
      <Typography variant="body2" sx={{ ml: 1 }}>
        {message}
      </Typography>
    </Box>
  );
};

StatusBanner.propTypes = {
  readOnly: PropTypes.bool,
  status: PropTypes.string,
};

const CompanyRegister = ({ companyId, readOnly, status }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { id } = useParams();
  const [validationErrors, setValidationErrors] = useState({});

  const { getAllData, resetStore } = useCompanyRegistrationStore();

  const pastelBlue = {
    light: '#E6F4FF',
    main: '#B3E0FF',
    dark: '#6B9ACD',
    contrastText: '#1A365D',
  };

  const { mutate, isLoading } = UseCompanyInfo.useCompanyInfo(id);

  const validateForm = (data) => {
    const errors = {};

    if (!data.bank && data.bank !== 0) {
      errors.bank = 'لطفاً نام بانک را وارد کنید';
    }

    if (
      !data.bank_branch ||
      typeof data.bank_branch !== 'string' ||
      data.bank_branch.trim() === ''
    ) {
      errors.bank_branch = 'لطفاً نام شعبه بانک را وارد کنید';
    }

    if (
      !data.bank_branch_code ||
      typeof data.bank_branch_code !== 'string' ||
      data.bank_branch_code.trim() === ''
    ) {
      errors.bank_branch_code = 'لطفاً کد شعبه بانک را وارد کنید';
    }

    if (
      !data.suggestion_plan_name ||
      typeof data.suggestion_plan_name !== 'string' ||
      data.suggestion_plan_name.trim() === ''
    ) {
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
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      if (!companyId) {
        toast.error('شناسه شرکت تعریف نشده یا خالی است');
        setIsSubmitting(false);
        return;
      }

      const data = getAllData();
      const errors = validateForm(data);

      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        toast.error('لطفاً تمامی فیلدهای اجباری را تکمیل کنید');
        setIsSubmitting(false);
        return;
      }

      const formData = new FormData();

      if (data.logo && data.logo instanceof File) {
        formData.append('logo', data.logo);
      } else if (data.logo) {
        console.warn('Logo exists but is not a File object:', typeof data.logo);
      }

      if (data.validation_report && data.validation_report instanceof File) {
        formData.append('validation_report', data.validation_report);
      } else if (data.validation_report) {
        console.warn(
          'Validation report exists but is not a File object:',
          typeof data.validation_report
        );
      }

      if (data.financial_statement && data.financial_statement instanceof File) {
        formData.append('financial_statement', data.financial_statement);
      } else if (data.financial_statement) {
        console.warn(
          'Financial statement exists but is not a File object:',
          typeof data.financial_statement
        );
      }

      formData.append('bank', data.bank?.toString() || '');
      formData.append('bank_branch', data.bank_branch || '');
      formData.append('bank_branch_code', data.bank_branch_code || '');
      formData.append('company_id', companyId);
      formData.append('suggestion_plan_name', data.suggestion_plan_name || '');

      if (data.amount_of_investment) {
        formData.append('amount_of_investment', data.amount_of_investment.toString());
      }

      Array.from(formData.entries()).forEach(([key, value]) => {});

      mutate(formData, {
        onSuccess: (response) => {
          toast.success('اطلاعات با موفقیت ثبت شد');
          resetStore();
          setIsSubmitting(false);
        },
        onError: (error) => {
          const errorMessage =
            error.response?.data?.message || error.message || 'خطا در ثبت اطلاعات';
          toast.error(errorMessage);
          setIsSubmitting(false);
        },
        onSettled: () => {
          setIsSubmitting(false);
        },
      });
    } catch (error) {
      toast.error(`خطا در ثبت اطلاعات: ${error.message}`);
      setIsSubmitting(false);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        width: '100%',
        margin: '0',
        boxShadow: '0 10px 30px rgba(149, 157, 165, 0.15)',
        borderRadius: '20px',
        padding: '2rem',
        background: '#FFFFFF',
        border: `1px solid ${pastelBlue.dark}`,
        position: 'relative',
        overflow: 'hidden',
        opacity: readOnly ? 0.9 : 1,
      }}
    >
      <ToastContainer position="top-center" />

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
        <Typography
          variant="h5"
          component="h1"
          sx={{
            color: '#fff',
            fontWeight: 700,
            position: 'relative',
            bgcolor: pastelBlue.main,
            px: 4,
            py: 1.5,
            borderRadius: '4px',
            textAlign: 'center',
            minWidth: '250px',
          }}
        >
          ثبت اطلاعات شرکت
        </Typography>
        {readOnly && (
          <Tooltip title={status === 'approved' ? 'تایید شده' : 'رد شده'}>
            <Chip
              icon={status === 'approved' ? <CheckCircleIcon /> : <CancelIcon />}
              label={status === 'approved' ? 'تایید شده' : 'رد شده'}
              color={status === 'approved' ? 'success' : 'error'}
              variant="outlined"
              sx={{ fontWeight: 'bold', position: 'absolute', right: '2rem' }}
            />
          </Tooltip>
        )}
      </Box>

      <StatusBanner readOnly={readOnly} status={status} />

      <Grid container direction="column" spacing={2}>
        <Grid item xs={12}>
          <CompanyInfo pastelBlue={pastelBlue} errors={validationErrors} readOnly={readOnly} />
        </Grid>
        <Grid item xs={12}>
          <CompanyBankInfo pastelBlue={pastelBlue} errors={validationErrors} readOnly={readOnly} />
        </Grid>
        <Grid item xs={12}>
          <PlanInfo pastelBlue={pastelBlue} errors={validationErrors} readOnly={readOnly} />
        </Grid>
        {!readOnly && (
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              disabled={isSubmitting || isLoading}
              loading={isSubmitting || isLoading}
              pastelBlue={pastelBlue}
              sx={{
                width: '100%',
                height: 45,
                fontWeight: 'bold',
              }}
            >
              ثبت اطلاعات
            </Button>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

CompanyRegister.propTypes = {
  companyId: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
  status: PropTypes.string,
};

export default CompanyRegister;
