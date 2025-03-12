import { useState } from 'react';
import { Typography, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetCompany, useMembers } from '../../hooks';
import MembersList from '../../components/list/list';

const MembersInfo = () => {
  const { id } = useParams();
  const [membersFiles, setMembersFiles] = useState({});
  const [isSubmitting, setIsSubmitting] = useState({}); // Track per-member submission status
  const [uploadStatus, setUploadStatus] = useState({});

  const { data: companyData } = useGetCompany(id);
  const company_members = companyData?.company_members || [];
  const { mutate: mutateMembersInfo } = useMembers();

  const pastelBlue = {
    light: '#E6F4FF',
    main: '#B3E0FF',
    dark: '#6B9ACD',
    contrastText: '#1A365D',
  };

  const handleFileChange = (memberId, fileType, file) => {
    setMembersFiles((prev) => ({
      ...prev,
      [memberId]: {
        ...(prev[memberId] || {}),
        [fileType]: file,
      },
    }));

    // Update file count in status
    setUploadStatus((prev) => ({
      ...prev,
      [memberId]: {
        ...prev[memberId],
        files: Object.keys(prev[memberId] || {}).length + (prev[memberId]?.[fileType] ? 0 : 1),
      },
    }));
  };

  const submitMemberFiles = async (memberId) => {
    // Skip if no files for this member
    if (!membersFiles[memberId]) return;

    // Set this member as submitting
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
      // Clear submitting status for this member
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
        '&:hover': {
          boxShadow: '0 15px 35px rgba(149, 157, 165, 0.2)',
        },
      }}
    >
      <Typography
        variant="h5"
        component="h1"
        sx={{
          mb: 4,
          textAlign: 'center',
          color: pastelBlue.contrastText,
          fontWeight: 700,
          position: 'relative',
          '&:after': {
            content: '""',
            position: 'absolute',
            bottom: '-12px',
            left: '10%',
            width: '80%',
            height: '3px',
            background: `linear-gradient(90deg, ${pastelBlue.main}, ${pastelBlue.contrastText})`,
            borderRadius: '2px',
          },
        }}
      >
        اطلاعات هیئت مدیره خود را بارگزاری کنید
      </Typography>

      <MembersList
        members={company_members}
        onFileChange={handleFileChange}
        onSubmit={submitMemberFiles}
        uploadStatus={uploadStatus}
        isSubmitting={isSubmitting}
        theme={pastelBlue}
      />
    </Paper>
  );
};

export default MembersInfo;
