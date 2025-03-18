import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, TextField, IconButton, Tooltip, Box, Button } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ClearIcon from '@mui/icons-material/Clear';
import VisibilityIcon from '@mui/icons-material/Visibility';

const FormField = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  required = false,
  fullWidth = true,
  hint = null,
  placeholder = '',
  helperText = '',
  error = false,
  inputProps = {},
  accept = '',
  onFileRemove = null,
  pastelBlue,
  xs = 12,
  md = 6,
  disabled = false,
}) => {
  const isFileInput = type === 'file';
  const isSelectInput = type === 'select';
  const hasFile = isFileInput && value && (value instanceof File || value.url);

  const handleChange = (event) => {
    console.log('FormField handleChange called', { type, name });
    console.log('Event object:', event);

    if (isFileInput) {
      const file = event.target.files[0];
      console.log('File input change detected, file:', file);

      if (file) {
        // Create a direct reference to the file to prevent any serialization issues
        const fileObj = new File([file], file.name, {
          type: file.type,
          lastModified: file.lastModified,
        });

        console.log('Created file object:', fileObj);

        // Pass both the file in value and in the files array
        const customEvent = {
          target: {
            name,
            value: fileObj,
            files: [fileObj],
          },
        };

        onChange(customEvent);
      }
    } else {
      onChange(event);
    }
  };

  const handleRemoveFile = () => {
    if (onFileRemove) {
      onFileRemove(name);
    }
  };

  return (
    <Grid item xs={xs} md={md}>
      <Typography
        variant="subtitle1"
        component="p"
        sx={{
          mb: 1,
          color: pastelBlue.contrastText,
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          '&::before': {
            content: '""',
            display: 'inline-block',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: pastelBlue.dark,
            marginRight: '15px',
          },
        }}
      >
        {label}
        {required && <span style={{ color: 'red', marginLeft: '4px' }}>*</span>}
        {hint && (
          <Tooltip title={hint} arrow>
            <IconButton sx={{ ml: 1 }}>
              <HelpOutlineIcon />
            </IconButton>
          </Tooltip>
        )}
      </Typography>

      {isFileInput ? (
        <Box sx={{ position: 'relative', mt: 1 }}>
          <input
            accept={accept}
            type="file"
            id={disabled ? undefined : `file-input-${name}`}
            style={{ display: 'none' }}
            onChange={handleChange}
            disabled={disabled}
          />
          {!disabled && (
            <label htmlFor={`file-input-${name}`}>
              <Button
                variant="outlined"
                component="span"
                fullWidth
                startIcon={<UploadFileIcon />}
                disabled={disabled}
                sx={{
                  borderColor: pastelBlue.main,
                  color: pastelBlue.contrastText,
                  height: '56px',
                  textAlign: 'left',
                  justifyContent: 'flex-start',
                  padding: '0 14px',
                  cursor: disabled ? 'not-allowed' : 'pointer',
                  backgroundColor: '#f8f9fa',
                  '&:hover': {
                    backgroundColor: '#f1f3f5',
                    borderColor: pastelBlue.dark,
                  },
                }}
              >
                {hasFile ? 'مشاهده فایل' : 'فایل را انتخاب کنید...'}
              </Button>
            </label>
          )}
          {disabled && (
            <Button
              variant="outlined"
              component="span"
              fullWidth
              startIcon={<UploadFileIcon />}
              disabled
              sx={{
                borderColor: pastelBlue.main,
                color: pastelBlue.contrastText,
                height: '56px',
                textAlign: 'left',
                justifyContent: 'flex-start',
                padding: '0 14px',
                cursor: 'not-allowed',
                backgroundColor: '#f8f9fa',
              }}
            >
              {hasFile
                ? value instanceof File
                  ? value.name
                  : value.name
                : 'فایل را انتخاب کنید...'}
            </Button>
          )}
          {hasFile && value.url && (
            <Tooltip title="مشاهده فایل">
              <IconButton
                onClick={() => window.open(value.url, '_blank')}
                sx={{
                  position: 'absolute',
                  right: 40,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: pastelBlue.dark,
                }}
              >
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
          )}
          {hasFile && (
            <IconButton
              onClick={handleRemoveFile}
              sx={{
                position: 'absolute',
                right: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'error.main',
              }}
            >
              <ClearIcon />
            </IconButton>
          )}
          {helperText && (
            <Typography
              variant="caption"
              color={error ? 'error' : 'text.secondary'}
              sx={{ mt: 0.5, display: 'block' }}
            >
              {helperText}
            </Typography>
          )}
        </Box>
      ) : (
        <TextField
          name={name}
          value={value || ''}
          onChange={onChange}
          type={isSelectInput ? 'text' : type}
          required={required}
          fullWidth={fullWidth}
          placeholder={placeholder}
          helperText={helperText}
          error={error}
          disabled={disabled}
          InputProps={inputProps}
          select={isSelectInput}
          SelectProps={{
            MenuProps: {
              sx: { maxHeight: 300 },
            },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              background: '#FFFFFF',
              borderRadius: '10px',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
              },
              '&:hover fieldset': {
                borderColor: pastelBlue.main,
                borderWidth: '2px',
              },
              '&.Mui-focused fieldset': {
                borderColor: pastelBlue.dark,
                borderWidth: '2px',
              },
            },
          }}
        >
          {isSelectInput && inputProps.children}
        </TextField>
      )}
    </Grid>
  );
};

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['text', 'email', 'password', 'number', 'file', 'tel', 'date', 'select']),
  required: PropTypes.bool,
  fullWidth: PropTypes.bool,
  hint: PropTypes.string,
  placeholder: PropTypes.string,
  helperText: PropTypes.string,
  error: PropTypes.bool,
  inputProps: PropTypes.object,
  accept: PropTypes.string,
  onFileRemove: PropTypes.func,
  pastelBlue: PropTypes.shape({
    light: PropTypes.string.isRequired,
    main: PropTypes.string.isRequired,
    contrastText: PropTypes.string.isRequired,
    dark: PropTypes.string.isRequired,
  }).isRequired,
  xs: PropTypes.number,
  md: PropTypes.number,
  disabled: PropTypes.bool,
};

export default FormField;
