import { Box, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Loader from 'src/components/loader';
import { useNavigate } from 'react-router-dom';
import { getCookie } from 'src/api/cookie';
import useAuth from '../service/useAuth';

const Profile = () => {
  const { mutate, userData, isLoadingUser, isError, logout } = useAuth();
  const navigateToProfile = useNavigate();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const access = getCookie('access');
    if (access) {
      mutate();
    } else {
      logout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isError) {
    return <Loader />;
  }

  const handleNavigateToProfile = () => {
    navigateToProfile('/ProfilePage');
  };

  const handleCopyCode = () => {
    const baseUrl = "https://app.isatiscrowd.ir/login?rf=";
    const referralLink = `${baseUrl}${userData?.acc?.uniqueIdentifier}`;
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ 
        p: 4, 
        textAlign: 'center', 
        marginBottom: 5,
        maxWidth: '600px',
        mx: 'auto'
      }}>
        <a href="https://isatiscrowd.ir" style={{ textDecoration: 'none' }}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <Box
              component="img"
              src="/assets/crowdlogo.png"
              alt="Logo"
              sx={{
                width: 120,
                height: 120,
                mx: 'auto',
                mb: 3,
                boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.15)',
                borderRadius: '50%',
                transition: 'box-shadow 0.3s ease',
                '&:hover': {
                  boxShadow: '0px 12px 25px rgba(0, 0, 0, 0.25)',
                },
              }}
            />
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 'bold', 
                color: '#524175',
                mb: 3,
                fontSize: { xs: '1.5rem', sm: '2rem' }
              }}
            >
              ایساتیس کراد
            </Typography>
          </motion.div>
        </a>

        <motion.div 
          initial={{ scale: 0.9 }} 
          animate={{ scale: 1 }} 
          transition={{ duration: 0.5 }}
        >
          <Box
            sx={{
              bgcolor: '#ffffff',
              color: '#333',
              p: 4,
              borderRadius: 4,
              boxShadow: '0px 8px 25px rgba(0, 0, 0, 0.08)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                boxShadow: '0px 12px 30px rgba(0, 0, 0, 0.12)',
                transform: 'translateY(-5px)',
              },
            }}
          >
            <Grid item xs={12}>
              {!isLoadingUser ? (
                <motion.div 
                  whileHover={{ scale: 1.02 }} 
                  whileTap={{ scale: 0.98 }}
                  style={{ position: 'relative' }}
                >
                  <button
                    type="button"
                    onClick={handleNavigateToProfile}
                    className="relative px-6 py-4 rounded-lg w-full
                             bg-white
                             transition-all duration-300
                             group"
                  >
                    <div className="text-xl font-semibold text-cyan-900">
                      {userData?.acc?.private_person[0]?.firstName}{' '}
                      {userData?.acc?.private_person[0]?.lastName}
                    </div>
                    <div className="absolute left-0 right-0 bottom-0 
                                  text-gray-600 text-sm opacity-0 
                                  group-hover:opacity-100 
                                  transition-opacity duration-300 "
                    >
                      {userData?.acc?.uniqueIdentifier}
                    </div>
                  </button>
                </motion.div>
              ) : (
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: '#666',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1
                  }}
                >
                  در حال بارگذاری...
                </Typography>
              )}
            </Grid>
            <Tooltip title={copied ? "کپی شد!" : "کپی لینک معرف"} arrow>
              <Box
                sx={{
                  mt: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 8px',
                  borderRadius: '8px',
                  backgroundColor: copied ? 'rgba(76, 175, 80, 0.15)' : 'rgba(82, 65, 117, 0.05)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: copied ? 'rgba(76, 175, 80, 0.2)' : 'rgba(82, 65, 117, 0.1)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(82, 65, 117, 0.1)',
                  }
                }}
                onClick={handleCopyCode}
              >
                <Typography
                  sx={{
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    color: copied ? '#4CAF50' : '#524175',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <ContentCopyIcon sx={{ fontSize: '1rem' }} />
                  {copied ? 'کپی شد!' : 'کد معرف شما'}
                </Typography>
              </Box>
            </Tooltip>
          </Box>
        </motion.div>
      </Box>
    </motion.div>
  );
};

export default Profile;
