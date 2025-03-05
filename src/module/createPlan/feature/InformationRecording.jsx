import { TextField, Typography, Grid, Paper } from '@mui/material';

const InformationRecording = () => {
  // رنگ‌های آبی پاستیلی
  const pastelBlue = {
    light: '#E6F4FF',
    main: '#B3E0FF',
    dark: '#7FBFFF',
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
        border: `1px solid ${pastelBlue.main}`,
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0 15px 35px rgba(149, 157, 165, 0.2)',
          transform: 'translateY(-3px)',
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
            background: `linear-gradient(90deg, ${pastelBlue.main}, ${pastelBlue.dark})`,
            borderRadius: '2px',
          },
        }}
      >
        اطلاعات شرکت خود را بارگزاری کنید
      </Typography>

      <TextField
        label="نام پیشنهادی طرح"
        fullWidth
        variant="outlined"
        sx={{
          mb: 3,
          '& .MuiOutlinedInput-root': {
            borderRadius: '10px',
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'translateY(-2px)',
            },
            '& fieldset': {
              borderColor: pastelBlue.main,
              borderWidth: '1.5px',
            },
            '&:hover fieldset': {
              borderColor: pastelBlue.dark,
            },
            '&.Mui-focused fieldset': {
              borderColor: pastelBlue.dark,
              borderWidth: '2px',
            },
          },
          '& .MuiInputLabel-root': {
            color: pastelBlue.contrastText,
            '&.Mui-focused': {
              color: pastelBlue.dark,
            },
          },
        }}
      />

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
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
            لوگو شرکت
          </Typography>
          <TextField
            type="file"
            fullWidth
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                background: '#FFFFFF',
                borderRadius: '10px',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                },
                '& fieldset': {
                  borderColor: pastelBlue.main,
                  borderWidth: '1.5px',
                },
                '&:hover fieldset': {
                  borderColor: pastelBlue.dark,
                },
                '&.Mui-focused fieldset': {
                  borderColor: pastelBlue.dark,
                  borderWidth: '2px',
                },
              },
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
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
            صورت مالی
          </Typography>
          <TextField
            type="file"
            fullWidth
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                background: '#FFFFFF',
                borderRadius: '10px',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                },
                '& fieldset': {
                  borderColor: pastelBlue.main,
                  borderWidth: '1.5px',
                },
                '&:hover fieldset': {
                  borderColor: pastelBlue.dark,
                },
                '&.Mui-focused fieldset': {
                  borderColor: pastelBlue.dark,
                  borderWidth: '2px',
                },
              },
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
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
            گزارش اعتبارسنجی
          </Typography>
          <TextField
            type="file"
            fullWidth
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                background: '#FFFFFF',
                borderRadius: '10px',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                },
                '& fieldset': {
                  borderColor: pastelBlue.main,
                  borderWidth: '1.5px',
                },
                '&:hover fieldset': {
                  borderColor: pastelBlue.dark,
                },
                '&.Mui-focused fieldset': {
                  borderColor: pastelBlue.dark,
                  borderWidth: '2px',
                },
              },
            }}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default InformationRecording;
