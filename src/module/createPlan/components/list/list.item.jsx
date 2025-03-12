import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid, Paper, Button } from '@mui/material';
import { UploadInput } from '..';

const ListItem = ({
  member,
  onFileChange,
  onSubmit,
  uploadStatus,
  uploadFields,
  isSubmitting,
  theme,
}) => {
  const isMemberSubmitting = isSubmitting[member.id] || false;
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
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: theme.contrastText,
            }}
            onClick={() => onSubmit(member.id)}
            disabled={isMemberSubmitting}
          >
            {isMemberSubmitting ? 'در حال ارسال...' : 'ارسال اطلاعات'}
          </Button>
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            {uploadFields.map((field) => (
              <Grid item xs={12} sm={6} key={field.type}>
                <UploadInput
                  label={field.label}
                  onChange={onFileChange}
                  fileType={field.type}
                  id={member.id}
                  disabled={isMemberSubmitting}
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
};

export default ListItem;
