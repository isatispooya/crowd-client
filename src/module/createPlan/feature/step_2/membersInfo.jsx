import { useState } from 'react';
import { Typography, Grid, Paper, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useGetCompany, useMembers } from '../../hooks';

const MembersInfo = ({ generetedId }) => {
  const [files, setFiles] = useState({
    logo: null,
    financial: null,
    credit: null,
  });



  const { data: companyData } = useGetCompany(generetedId);

  console.log(companyData);



  

  const { mutate: mutateMembersInfo } = useMembers();



  const pastelBlue = {
    light: '#E6F4FF',
    main: '#B3E0FF',
    dark: '#6B9ACD',
    contrastText: '#1A365D',
  };

  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        width: '90%',
        maxWidth: '1000px',
        margin: '2rem auto',
        boxShadow: '0 10px 30px rgba(149, 157, 165, 0.15)',
        borderRadius: '20px',
        padding: '2.5rem',
        background: '#FFFFFF',
        border: `1px solid ${pastelBlue.dark}`,
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          boxShadow: '0 15px 35px rgba(149, 157, 165, 0.2)',
        },
      }}
    >
      <Typography
        variant="h5"
        component="h1"
        sx={{
          mb: 4,
          textAlign: 'center',
          color: pastelBlue.contrastText,
          fontWeight: 700,
          position: 'relative',
          '&:after': {
            content: '""',
            position: 'absolute',
            bottom: '-12px',
            left: '10%',
            width: '80%',
            height: '3px',
            background: `linear-gradient(90deg, ${pastelBlue.main}, ${pastelBlue.contrastText})`,
            borderRadius: '2px',
          },
        }}
      >
        اطلاعات هیئت مدیره خود را بارگزاری کنید
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mt: 3,
              backgroundColor: pastelBlue.contrastText,
            }}
          >
            ارسال اطلاعات
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

MembersInfo.propTypes = {
  generetedId: PropTypes.string.isRequired,
};

export default MembersInfo;
