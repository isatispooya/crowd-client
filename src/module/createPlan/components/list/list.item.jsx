import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid, Paper, Button, Box, Tooltip } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import UploadInput from '../upload.input';

const ListItem = ({
  member,
  onFileChange,
  onSubmit,
  uploadStatus,
  uploadFields,
  isSubmitting,
  theme,
  readOnly,
}) => {
  const isMemberSubmitting = isSubmitting[member.id] || false;

  // Helper function to determine button content
  const getButtonContent = () => {
    if (isMemberSubmitting) {
      return 'در حال ارسال...';
    }
    if (readOnly) {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          <LockIcon fontSize="small" />
          <span>غیرقابل ویرایش</span>
        </Box>
      );
    }
    return 'ارسال اطلاعات';
  };

  return (
    <Paper
      elevation={1}
      sx={{
        p: 3,
        mb: 3,
        borderRadius: '12px',
        border: `1px solid ${theme.light}`,
        ...(uploadStatus[member.id]?.status && {
          border: `1px solid ${
            uploadStatus[member.id].status === 'success' ? '#4caf50' : '#f44336'
          }`,
        }),
        position: 'relative',
        opacity: readOnly ? 0.9 : 1,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1" fontWeight="bold">
            {member.person_title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {member.position_title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {member.tagline}
          </Typography>
          <Typography variant="caption" display="block">
            شناسه ملی: {member.uniqueIdentifier}
          </Typography>

          {/* Submit button for this member */}
          <Tooltip title={readOnly ? 'این بخش قابل ویرایش نیست' : ''}>
            <span>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  mt: 2,
                  backgroundColor: theme.contrastText,
                  '&.Mui-disabled': {
                    backgroundColor: readOnly ? 'rgba(0, 0, 0, 0.12)' : theme.contrastText,
                    opacity: readOnly ? 0.7 : 0.5,
                  },
                }}
                onClick={() => onSubmit(member.id)}
                disabled={isMemberSubmitting || readOnly}
              >
                {getButtonContent()}
              </Button>
            </span>
          </Tooltip>
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            {uploadFields.map((field) => (
              <Grid item xs={12} sm={6} key={field.type}>
                <UploadInput
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <span style={{ fontSize: '1.2rem' }}>{field.icon}</span>
                      <span>{field.label}</span>
                    </Box>
                  }
                  onChange={onFileChange}
                  fileType={field.type}
                  id={member.id}
                  disabled={isMemberSubmitting || readOnly}
                />
              </Grid>
            ))}
          </Grid>

          {uploadStatus[member.id]?.status && (
            <Typography
              variant="body2"
              color={uploadStatus[member.id].status === 'success' ? 'success.main' : 'error.main'}
              sx={{ mt: 1, textAlign: 'center' }}
            >
              {uploadStatus[member.id].message}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

ListItem.propTypes = {
  member: PropTypes.object.isRequired,
  onFileChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  uploadStatus: PropTypes.object,
  uploadFields: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    })
  ).isRequired,
  isSubmitting: PropTypes.object,
  theme: PropTypes.object.isRequired,
  readOnly: PropTypes.bool,
};

export default ListItem;
