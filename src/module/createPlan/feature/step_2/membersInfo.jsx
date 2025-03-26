import { useState, useEffect, useMemo } from 'react';
import { Typography, Paper, Box, Chip, Tooltip } from '@mui/material';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { OnRun } from 'src/api/OnRun';
import { useGetCompany, useMembers } from '../../hooks';
import MembersList from '../../components/list/list';
import { StatusBanner } from '../../components';

const MembersInfo = ({ readOnly, status }) => {
  const { id } = useParams();
  const [membersFiles, setMembersFiles] = useState({});
  const [isSubmitting, setIsSubmitting] = useState({});
  const [uploadStatus, setUploadStatus] = useState({});

  const { data: companyData } = useGetCompany(id);
  const company_members = useMemo(
    () => companyData?.investor_request?.company_members || [],
    [companyData]
  );
  const { mutate: mutateMembersInfo } = useMembers();

  useEffect(() => {
    if (company_members.length > 0) {
      const preloadedFiles = {};
      company_members.forEach((member) => {
        preloadedFiles[member.id] = {
          national_cart: member.national_cart
            ? {
                name: member.national_cart.split('/').pop(),
                url: `${OnRun}${member.national_cart}`,
              }
            : null,
          birth_certificate: member.birth_certificate
            ? {
                name: member.birth_certificate.split('/').pop(),
                url: `${OnRun}${member.birth_certificate}`,
              }
            : null,
          previous_article: member.previous_article
            ? {
                name: member.previous_article.split('/').pop(),
                url: `${OnRun}${member.previous_article}`,
              }
            : null,
          validation_report: member.validation_report
            ? {
                name: member.validation_report.split('/').pop(),
                url: `${OnRun}${member.validation_report}`,
              }
            : null,
        };
      });

      setMembersFiles(preloadedFiles);
    }
  }, [company_members]);

  const pastelBlue = {
    light: '#E6F4FF',
    main: '#B3E0FF',
    dark: '#6B9ACD',
    contrastText: '#1A365D',
  };

  const handleFileChange = (memberId, fileType, file) => {
    if (readOnly) return;

    setMembersFiles((prev) => ({
      ...prev,
      [memberId]: {
        ...(prev[memberId] || {}),
        [fileType]: file,
      },
    }));

    setUploadStatus((prev) => ({
      ...prev,
      [memberId]: {
        ...prev[memberId],
        files: Object.keys(prev[memberId] || {}).length + (prev[memberId]?.[fileType] ? 0 : 1),
      },
    }));
  };

  const submitMemberFiles = async (memberId) => {
    if (readOnly) return;

    if (!membersFiles[memberId]) return;

    setIsSubmitting((prev) => ({
      ...prev,
      [memberId]: true,
    }));

    try {
      const formData = new FormData();
      const memberFiles = membersFiles[memberId];

      Object.entries(memberFiles).forEach(([fileType, file]) => {
        if (file) {
          formData.append(fileType, file);
        }
      });

      await mutateMembersInfo({ data: formData, memberId });

      setUploadStatus((prev) => ({
        ...prev,
        [memberId]: {
          ...prev[memberId],
          status: 'success',
          message: 'آپلود با موفقیت انجام شد',
        },
      }));
    } catch (error) {
      setUploadStatus((prev) => ({
        ...prev,
        [memberId]: {
          ...prev[memberId],
          status: 'error',
          message: 'خطا در آپلود فایل‌ها',
        },
      }));
    } finally {
      setIsSubmitting((prev) => ({
        ...prev,
        [memberId]: false,
      }));
    }
  };

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
          اطلاعات هیئت مدیره
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

      <MembersList
        members={company_members}
        onFileChange={handleFileChange}
        onSubmit={submitMemberFiles}
        uploadStatus={uploadStatus}
        isSubmitting={isSubmitting}
        theme={pastelBlue}
        readOnly={readOnly}
        preloadedFiles={membersFiles}
      />
    </Paper>
  );
};

MembersInfo.propTypes = {
  readOnly: PropTypes.bool,
  status: PropTypes.string,
};

export default MembersInfo;
