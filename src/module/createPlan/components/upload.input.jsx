import React, { useState } from 'react';
import { Typography, Button } from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import PropTypes from 'prop-types';

const UploadInput = ({
  label,
  onChange,
  fileType,
  id,
  disabled = false,
  size = 'small',
  variant = 'outlined',
}) => {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onChange(id, fileType, file);
    }
  };

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
        startIcon={<CloudUploadIcon />}
      >
        {fileName || 'بارگذاری فایل'}
        <input type="file" hidden onChange={handleFileChange} disabled={disabled} />
      </Button>
    </>
  );
};

UploadInput.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  fileType: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  variant: PropTypes.string,
};

export default UploadInput;
