import React from 'react';
import PropTypes from 'prop-types';
import { Button as MuiButton, CircularProgress } from '@mui/material';

const Button = ({
  children,
  variant = 'contained',
  color = 'primary',
  onClick,
  fullWidth = false,
  disabled = false,
  type = 'button',
  startIcon = null,
  endIcon = null,
  loading = false,
  size = 'medium',
  pastelBlue,
  sx = {},
  ...props
}) => {
  const getButtonStyles = () => {
    const baseStyles = {
      borderRadius: '8px',
      fontWeight: 600,
      boxShadow: variant === 'contained' ? '0 4px 8px rgba(0, 0, 0, 0.1)' : 'none',
      textTransform: 'none',
      ...sx,
    };

    switch (variant) {
      case 'contained':
        return {
          ...baseStyles,
          backgroundColor: pastelBlue.contrastText,
          color: '#fff',
          '&:hover': {
            backgroundColor: pastelBlue.dark,
          },
        };
      case 'outlined':
        return {
          ...baseStyles,
          borderColor: pastelBlue.main,
          color: pastelBlue.contrastText,
          '&:hover': {
            borderColor: pastelBlue.dark,
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        };
      case 'text':
        return {
          ...baseStyles,
          color: pastelBlue.contrastText,
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        };
      default:
        return baseStyles;
    }
  };

  return (
    <MuiButton
      variant={variant}
      color={color}
      onClick={onClick}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      type={type}
      startIcon={loading ? null : startIcon}
      endIcon={loading ? null : endIcon}
      size={size}
      sx={getButtonStyles()}
      {...props}
    >
      {loading ? (
        <>
          <CircularProgress
            size={24}
            sx={{
              color: variant === 'contained' ? '#fff' : pastelBlue.main,
              marginRight: children ? 1 : 0,
            }}
          />
          {children}
        </>
      ) : (
        children
      )}
    </MuiButton>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
  color: PropTypes.string,
  onClick: PropTypes.func,
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  loading: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  pastelBlue: PropTypes.shape({
    light: PropTypes.string.isRequired,
    main: PropTypes.string.isRequired,
    contrastText: PropTypes.string.isRequired,
    dark: PropTypes.string.isRequired
  }).isRequired,
  sx: PropTypes.object,
};

export default Button;
