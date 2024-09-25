import { Box, Grid, Typography, CircularProgress, keyframes } from '@mui/material';
import useAuth from '../service/useAuth';

// Keyframe for the moving animation
const moveUpDown = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const Profile = () => {
  const { userData, isLoadingUser } = useAuth();

  return (
    <Box sx={{ p: 3, textAlign: 'center', marginBottom: 5 }}>
      {/* Logo */}
      <Box
        component="img"
        src="/assets/crowdlogo.png"
        alt="Company Logo"
        sx={{
          width: 150,
          height: 150,
          mx: 'auto',
          mb: 3,
          borderRadius: '50%',
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
          objectFit: 'contain',
        }}
      />

      {/* Profile Card */}
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 5, borderBottom: '2px solid #c9c8c8' , pb:1 }}>
        {userData.acc.private_person[0].firstName} {userData.acc.private_person[0].lastName}
      </Typography>
      <Box
        sx={{
          bgcolor: '#f9f9f9',
          color: '#333',
          p: 3,
          borderRadius: 3,
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
          maxWidth: '400px',
          mx: 'auto',
        }}
      >
        <Grid item xs={12}>
          {!isLoadingUser ? (
            <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center">
    

            
              <Typography
              
                sx={{
                  mt: 1,
                 
                  animation: `${moveUpDown} 3s ease-in-out infinite`, 
                }}
              >
                خوش آمدی, {userData.acc.private_person[0].firstName}! 👋
              </Typography>
            </Box>
          ) : (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default Profile;
