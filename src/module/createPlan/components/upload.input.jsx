import React, { useState, useEffect } from 'react';
import { Typography, Button } from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { OnRun } from 'src/api/OnRun';

const UploadInput = ({
  label,
  onChange,
  fileType,
  id,
  disabled = false,
  size = 'small',
  variant = 'outlined',
  value = null,
}) => {
  const [fileName, setFileName] = useState('');
  const [fileUrl, setFileUrl] = useState('');

  useEffect(() => {
    console.log(`UploadInput for ${fileType} (id: ${id}):`, { value, OnRun });
    if (value) {
      setFileName(value.name || '');
      setFileUrl(value.url || '');
      console.log(`Setting fileName: ${value.name}, fileUrl: ${value.url}`);
    }
  }, [value, fileType, id]);

  useEffect(() => {
    console.log(`Current state for ${fileType} (id: ${id}):`, { fileName, fileUrl });
  }, [fileName, fileUrl, fileType, id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setFileUrl(URL.createObjectURL(file));
      console.log(`File selected in UploadInput for ${id}:`, file);
      onChange(id, file);
    }
  };

  const handleFileDelete = () => {
    setFileName('');
    setFileUrl('');
    onChange(id, fileType, null);
  };

  return (
    <>
      <Typography variant="body2" mb={1}>
        {label}
      </Typography>
      {fileUrl ? (
        <>
          <Button
            variant="text"
            component="a"
            href={fileUrl.startsWith('blob:') ? fileUrl : fileUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            مشاهده فایل
          </Button>
          <Button variant="text" onClick={handleFileDelete} disabled={disabled}>
            حذف فایل
          </Button>
        </>
      ) : (
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
      )}
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
  value: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  }),
};

export default UploadInput;
