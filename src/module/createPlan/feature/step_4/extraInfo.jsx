/* eslint-disable no-shadow */
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Typography, Paper, Box, Chip, Tooltip, Grid } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { OnRun } from 'src/api/OnRun';
import Loader from 'src/components/loader';
import { UploadInput, StatusBanner, SubmitBtn } from '../../components';
import { useUploadExtraInfo } from '../../hooks/step_4';
import { useGetCompany } from '../../hooks';

const ExtraInfo = ({ readOnly, status }) => {
  const { id } = useParams();
  const { companyData, isLoading } = useGetCompany(id);
  const [files, setFiles] = useState({
    tax_return: null,
    salary_list_for_the_last_3_months: null,
    trial_balance_current_year: null,
    balance_sheet: null,
    account_turnover: null,
    shareholder_list: null,
    three_recent_buying_and_selling_factors: null,
    company_articles_of_association: null,
    announcement_of_establishment: null,
    announcement_of_the_latest_managers: null,
    announcement_of_the_latest_changes: null,
  });

  const { mutate: uploadExtraInfo, isPending } = useUploadExtraInfo(id);

  const pastelBlue = {
    light: '#E6F4FF',
    main: '#B3E0FF',
    dark: '#6B9ACD',
    contrastText: '#1A365D',
  };

  const uploadLabels = [
    { id: 'tax_return', label: 'اظهارنامه مالیاتی', icon: '📊' },
    { id: 'salary_list_for_the_last_3_months', label: 'لیست حقوق 3 ماه اخیر', icon: '📑' },
    { id: 'trial_balance_current_year', label: 'تراز آزمایشی سال جاری', icon: '📈' },
    { id: 'balance_sheet', label: 'مجوز', icon: '📋' },
    { id: 'account_turnover', label: 'گردش حساب(حساب اصلی)', icon: '💰' },
    { id: 'shareholder_list', label: 'لیست سهامداران', icon: '👥' },
    {
      id: 'three_recent_buying_and_selling_factors',
      label: 'سه فاکتور خرید و فروش اخیر',
      icon: '🧾',
    },
    {
      id: 'company_articles_of_association',
      label: 'سوابق اجرایی',
      icon: '📄',
    },
    {
      id: 'certificate_of_signature_of_the_signatories_of_the_contract',
      label: 'گواهی امضای صاحبان امضا',
      icon: '📄',
    },
  ];

  const downloadTemplates = [
    {
      id: 'company_articles_of_association',
      label: 'دانلود نمونه سوابق اجرایی',
      file: '/resume.xlsx',
      icon: '📄',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  const handleFileChange = (key, file) => {
    if (readOnly) return;
    if (!file) return;

    setFiles((prev) => ({ ...prev, [key]: file }));
  };

  const handleSubmit = () => {
    if (readOnly) return;

    const formData = new FormData();
    Object.entries(files).forEach(([key, file]) => {
      if (file) formData.append(key, file);
    });

    uploadExtraInfo(formData);
  };

  const handleDownload = (fileUrl, fileName) => {
    console.log(`Downloading file: ${fileUrl}`);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        width: '90%',
        maxWidth: '1000px',
        margin: '2rem auto',
        boxShadow: '0 10px 30px rgba(149, 157, 165, 0.15)',
        borderRadius: '20px',
        padding: '2.5rem',
        background: '#FFFFFF',
        border: `1px solid ${pastelBlue.dark}`,
        position: 'relative',
        overflow: 'hidden',
        opacity: readOnly ? 0.9 : 1,
        '&:hover': {
          boxShadow: '0 15px 35px rgba(149, 157, 165, 0.2)',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography
          variant="h5"
          component="h1"
          sx={{
            color: pastelBlue.contrastText,
            fontWeight: 700,
            position: 'relative',
          }}
        >
          اطلاعات تکمیلی
        </Typography>
        {readOnly && (
          <Tooltip title={status === 'approved' ? 'تایید شده' : 'رد شده'}>
            <Chip
              icon={status === 'approved' ? <CheckCircleIcon /> : <CancelIcon />}
              label={status === 'approved' ? 'تایید شده' : 'رد شده'}
              color={status === 'approved' ? 'success' : 'error'}
              variant="outlined"
              sx={{ fontWeight: 'bold' }}
            />
          </Tooltip>
        )}
      </Box>

      <StatusBanner readOnly={readOnly} status={status} />

      <Box
        sx={{
          bgcolor: 'white',
          p: 3,
          borderRadius: 2,
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          border: '1px solid #e0e0e0',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 2.5,
            pb: 1.5,
            borderBottom: '1px solid #eee',
          }}
        >
          <Box
            sx={{
              bgcolor: pastelBlue.light,
              color: pastelBlue.dark,
              p: 1,
              borderRadius: '50%',
              mr: 1,
            }}
          >
            <CloudUploadIcon />
          </Box>
          <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 600 }}>
            بارگذاری مدارک مورد نیاز
          </Typography>
        </Box>

        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <Grid container spacing={3}>
            {uploadLabels.map((item) => {
              const preloadedFile = companyData?.investor_request?.[item.id];
              const fileUrl = preloadedFile ? OnRun + preloadedFile : null;
              const downloadTemplate = downloadTemplates.find(
                (template) => template.id === item.id
              );

              return (
                <Grid item xs={12} md={6} key={item.id}>
                  <motion.div
                    variants={itemVariants}
                    style={{
                      padding: '16px',
                      backgroundColor: files[item.id] ? '#f0f9f0' : '#f9f9f9',
                      borderRadius: '8px',
                      border: files[item.id] ? '1px solid #c8e6c9' : '1px solid #e0e0e0',
                      transition: 'all 0.2s',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 1,
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: '1.25rem', mr: 1 }}>{item.icon}</Typography>
                        <Typography
                          sx={{ fontWeight: 500, color: 'text.primary', fontSize: '0.9rem' }}
                        >
                          {item.label}
                        </Typography>
                      </Box>
                      {downloadTemplate && (
                        <Box
                          onClick={() =>
                            handleDownload(downloadTemplate.file, `template_${downloadTemplate.id}`)
                          }
                          sx={{
                            cursor: 'pointer',
                            color: pastelBlue.dark,
                            fontSize: '0.85rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            '&:hover': {
                              textDecoration: 'underline',
                            },
                          }}
                        >
                          دانلود نمونه 📥
                        </Box>
                      )}
                    </Box>
                    <UploadInput
                      id={item.id}
                      label=""
                      fileType="file"
                      onChange={(id, file) => handleFileChange(id, file)}
                      variant="outlined"
                      size="small"
                      disabled={readOnly}
                      value={fileUrl ? { name: item.label, url: fileUrl } : null}
                    />
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>
        </motion.div>
      </Box>

      {!readOnly && (
        <SubmitBtn handleSubmit={handleSubmit} isPending={isPending} pastelBlue={pastelBlue} />
      )}
    </Paper>
  );
};

ExtraInfo.propTypes = {
  readOnly: PropTypes.bool,
  status: PropTypes.string,
};

export default ExtraInfo;
