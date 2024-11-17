import { Box, Button, Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Loader from 'src/components/loader';
import { useNavigate } from 'react-router-dom';
import { getCookie } from 'src/api/cookie';
import useAuth from '../service/useAuth';

const Profile = () => {
  const { mutate, userData, isLoadingUser, isError, logout } = useAuth();
  const navigateToProfile = useNavigate();

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


  console.log(userData);
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Box sx={{ p: 3, textAlign: 'center', marginBottom: 5 }}>
        <a href="https://isatiscrowd.ir">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Box
              component="img"
              src="/assets/crowdlogo.png"
              alt="Logo"
              sx={{
                width: 150,
                height: 150,
                mx: 'auto',
                mb: 2,
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                borderRadius: '50%',
              }}
            />
          </motion.div>
        </a>
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
          <Box
            sx={{
              bgcolor: '#f5f5f5',
              color: '#333',
              p: 4,
              borderRadius: 3,
              boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Grid item xs={12}>
              {!isLoadingUser ? (
                <Box display="flex" justifyContent="center">

                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#524175' }}>
                    {userData?.acc?.private_person[0]?.firstName}
                  </Typography>
                  <Typography variant="h6" sx={{ ml: 1, fontWeight: 'bold', color: '#524175' }}>
                    {userData?.acc?.private_person[0]?.lastName}
                  </Typography>
                </Box>
              ) : (
                <Typography variant="h6">در حال بارگذاری...</Typography>
              )}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button
                  type="button"
                  onClick={handleNavigateToProfile}
                  className=" text-black px-4 py-2 rounded-md"
                >
                  {userData?.acc?.uniqueIdentifier}
                </button>
              </motion.div>
            </Grid>
          </Box>
        </motion.div>
      </Box>
    </motion.div>
  );
};

export default Profile;
