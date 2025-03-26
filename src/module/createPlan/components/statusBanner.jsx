import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const StatusBanner = ({ readOnly, status }) => {
  if (!readOnly) return null;

  let icon;
  let color;
  let message;

  if (status === 'approved') {
    icon = <CheckCircleIcon />;
    color = '#4caf50';
    message = 'این مرحله تایید شده است و قابل ویرایش نمی‌باشد';
  } else if (status === 'rejected') {
    icon = <CancelIcon />;
    color = '#f44336';
    message = 'این مرحله رد شده است و نیاز به بررسی مجدد دارد';
  } else {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 2,
        mb: 3,
        borderRadius: 2,
        backgroundColor: `${color}15`,
        border: `1px solid ${color}40`,
        color,
      }}
    >
      {icon}
      <Typography variant="body2" sx={{ ml: 1 }}>
        {message}
      </Typography>
    </Box>
  );
};

StatusBanner.propTypes = {
  readOnly: PropTypes.bool,
  status: PropTypes.string,
};

export default StatusBanner;
