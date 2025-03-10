import React from 'react';
import { Typography, Button } from '@mui/material';
import PropTypes from 'prop-types';

const FileUploadInput = ({
  label,
  onChange,
  fileType,
  id,
  disabled = false,
  size = 'small',
  variant = 'outlined',
}) => {
  return (
    <>
      <Typography variant="body2" mb={1}>
        {label}
      </Typography>
      <Button
        variant={variant}
        component="label"
        fullWidth
        size={size}
        sx={{ mb: 2 }}
        disabled={disabled}
      >
        بارگذاری فایل
        <input
          type="file"
          hidden
          onChange={(e) => onChange(id, fileType, e.target.files[0])}
          disabled={disabled}
        />
      </Button>
    </>
  );
};

FileUploadInput.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  fileType: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  variant: PropTypes.string,
};

export default FileUploadInput;
