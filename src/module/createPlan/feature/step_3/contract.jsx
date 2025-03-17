import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { HiDocument, HiArrowUpTray, HiChevronLeft, HiArrowRight } from 'react-icons/hi2';
import { Typography, Paper, Box, Chip, Tooltip } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { UploadInput } from '../../components';
import { useUploadContract } from '../../hooks/step_3';
import { useGetCompany } from '../../hooks';

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

const Contract = ({ readOnly, status }) => {
  const { id } = useParams();
  const { data: companyData } = useGetCompany(id);
  const [files, setFiles] = useState({
    account_number_letter: null,
    financial_exel: null,
    auditor_response: null,
    warranty: null,
  });

  const { mutate: uploadContract, isPending } = useUploadContract(id);

  const uuid = companyData?.investor_request?.uuid;


  const pastelBlue = {
    light: '#E6F4FF',
    main: '#B3E0FF',
    dark: '#6B9ACD',
    contrastText: '#1A365D',
  };

  const links = [
    { id: 1, title: 'قرارداد عاملیت', path: `/agencyContract/?uuid=${uuid}`, icon: '📄' },
    { id: 2, title: 'نامه حسابرسی', path: '/contracts/premium', icon: '📋' },
    { id: 3, title: 'نامه بانکی', path: `/bankLetter/?uuid=${uuid}`, icon: '📑' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    hover: {
      scale: readOnly ? 1 : 1.03,
      boxShadow: readOnly ? 'none' : '0px 8px 20px rgba(0, 0, 0, 0.1)',
      transition: {
        duration: 0.2,
      },
    },
  };

  const handleFileChange = (name, file) => {
    if (readOnly) return;

    setFiles((prev) => ({
      ...prev,
      [name]: file,
    }));
  };

  const handleSubmit = () => {
    if (readOnly) return;

    const formData = new FormData();

    Object.entries(files).forEach(([key, file]) => {
      if (file) {
        formData.append(key, file);
      }
    });

    uploadContract(formData);
  };

  const uploadLabels = [
    { id: 'account_number_letter', label: 'نامه شماره حساب', icon: '📝' },
    { id: 'financial_exel', label: 'اکسل مالی', icon: '📊' },
    { id: 'auditor_response', label: 'پاسخ حسابرس', icon: '📈' },
    { id: 'warranty', label: 'ضمانت نامه', icon: '🔒' },
  ];

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
          انتخاب نوع قرارداد
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

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        <Box
          sx={{
            flex: 1,
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
              <HiDocument style={{ width: 20, height: 20 }} />
            </Box>
            <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 600 }}>
              انواع قرارداد
            </Typography>
          </Box>

          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            {links.map((link) => (
              <motion.div key={link.id} variants={itemVariants} whileHover="hover">
                <Link
                  to={readOnly ? '#' : link.path}
                  onClick={(e) => readOnly && e.preventDefault()}
                  style={{
                    display: 'block',
                    padding: '16px',
                    marginBottom: '16px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    border: '1px solid #e0e0e0',
                    transition: 'all 0.2s',
                    opacity: readOnly ? 0.8 : 1,
                    cursor: readOnly ? 'default' : 'pointer',
                    textDecoration: 'none',
                  }}
                >
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography sx={{ fontSize: '1.5rem', mr: 1.5 }}>{link.icon}</Typography>
                      <Typography sx={{ fontWeight: 500, color: 'text.primary' }}>
                        {link.title}
                      </Typography>
                    </Box>
                    {!readOnly && (
                      <Box
                        sx={{
                          bgcolor: pastelBlue.light,
                          color: pastelBlue.dark,
                          p: 0.5,
                          borderRadius: '50%',
                        }}
                      >
                        <HiChevronLeft style={{ width: 20, height: 20 }} />
                      </Box>
                    )}
                  </Box>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </Box>

        <Box
          sx={{
            flex: 1,
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
              <HiArrowUpTray style={{ width: 20, height: 20 }} />
            </Box>
            <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 600 }}>
              آپلود اسناد مورد نیاز
            </Typography>
          </Box>

          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            {uploadLabels.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
                style={{
                  marginBottom: '20px',
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
                    <Typography sx={{ fontWeight: 500, color: 'text.primary', fontSize: '0.9rem' }}>
                      {item.label}
                    </Typography>
                  </Box>
                  {files[item.id] && (
                    <Typography sx={{ color: 'success.main', fontSize: '0.85rem' }}>
                      ✓ فایل انتخاب شد
                    </Typography>
                  )}
                </Box>
                <UploadInput
                  name={item.id}
                  accept=".png,.jpg,.jpeg,.pdf,.xlsx,.xls"
                  style={{ width: '100%' }}
                  onChange={(file) => handleFileChange(item.id, file)}
                  disabled={readOnly}
                />
              </motion.div>
            ))}
          </motion.div>
        </Box>
      </Box>

      {!readOnly && (
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <motion.button
            onClick={handleSubmit}
            disabled={isPending}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: `linear-gradient(to right, ${pastelBlue.dark}, #4a6da7)`,
              color: 'white',
              padding: '12px 32px',
              borderRadius: '8px',
              fontWeight: 500,
              border: 'none',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              cursor: isPending ? 'not-allowed' : 'pointer',
              opacity: isPending ? 0.7 : 1,
              transition: 'all 0.2s',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {isPending ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div
                  style={{
                    animation: 'spin 1s linear infinite',
                    height: '20px',
                    width: '20px',
                    marginLeft: '8px',
                    border: '2px solid white',
                    borderTop: '2px solid transparent',
                    borderRadius: '50%',
                  }}
                />
                در حال ارسال...
              </span>
            ) : (
              <>
                ثبت و ادامه
                <HiArrowRight style={{ height: '20px', width: '20px', marginRight: '8px' }} />
              </>
            )}
          </motion.button>
        </Box>
      )}
    </Paper>
  );
};

Contract.propTypes = {
  readOnly: PropTypes.bool,
  status: PropTypes.string,
};

export default Contract;
