import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, TextField, Tooltip, Box } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import UploadInput from './upload.input';

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
            <HelpOutlineIcon sx={{ ml: 1 }} />
          </Tooltip>
        )}
      </Typography>

      {isFileInput ? (
        <UploadInput
          label={label}
          onChange={onChange}
          fileType={accept}
          id={name}
          disabled={disabled}
          value={value}
        />
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
