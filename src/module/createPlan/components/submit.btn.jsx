import { Box } from '@mui/material';
import { HiArrowLeft } from 'react-icons/hi2';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const SubmitBtn = ({ handleSubmit, isPending, pastelBlue }) => {
  return (
    <Box sx={{ mt: 4, textAlign: 'center' }}>
      <motion.button
        onClick={handleSubmit}
        disabled={isPending}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          background: `linear-gradient(to right, ${pastelBlue.dark}, #4a6da7)`,
          color: 'white',
          padding: '12px 32px',
          borderRadius: '8px',
          fontWeight: 500,
          border: 'none',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          cursor: isPending ? 'not-allowed' : 'pointer',
          opacity: isPending ? 0.7 : 1,
          transition: 'all 0.2s',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isPending ? (
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div
              style={{
                animation: 'spin 1s linear infinite',
                height: '20px',
                width: '20px',
                marginLeft: '8px',
                border: '2px solid white',
                borderTop: '2px solid transparent',
                borderRadius: '50%',
              }}
            />
            در حال ارسال...
          </span>
        ) : (
          <>
            ثبت و ادامه
            <HiArrowLeft style={{ height: '20px', width: '20px', marginRight: '8px' }} />
          </>
        )}
      </motion.button>
    </Box>
  );
};

SubmitBtn.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isPending: PropTypes.bool.isRequired,
  pastelBlue: PropTypes.object.isRequired,
};

export default SubmitBtn;
