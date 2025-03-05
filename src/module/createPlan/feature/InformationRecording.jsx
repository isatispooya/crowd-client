import { useState } from 'react';
import {
  TextField,
  Typography,
  Grid,
  Paper,
  Button,
  IconButton,
  Box,
  Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const InformationRecording = () => {
  const [files, setFiles] = useState({
    logo: null,
    financial: null,
    credit: null,
  });

  const handleFileChange = (event, type) => {
    setFiles({
      ...files,
      [type]: event.target.files[0],
    });
  };

  const handleFileRemove = (type) => {
    setFiles({
      ...files,
      [type]: null,
    });
  };

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
        اطلاعات شرکت خود را بارگزاری کنید
      </Typography>

      <TextField
        label="نام پیشنهادی طرح"
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
            <Tooltip title="فایل لوگو باید به فرمت PNG یا JPEG باشد." arrow>
              <IconButton sx={{ ml: 1 }}>
                <HelpOutlineIcon />
              </IconButton>
            </Tooltip>
          </Typography>
          {!files.logo ? (
            <TextField
              type="file"
              fullWidth
              variant="outlined"
              onChange={(e) => handleFileChange(e, 'logo')}
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
          ) : (
            <div>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  backgroundColor: '#FFFFFF',
                  padding: '10px',
                  borderRadius: '10px',
                }}
              >
                <a
                  href={URL.createObjectURL(files.logo)}
                  download={files.logo.name}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <Typography variant="body1">{files.logo.name}</Typography>
                </a>
                <IconButton onClick={() => handleFileRemove('logo')}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </div>
          )}
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
            <Tooltip title="فرمت فایل باید PDF باشد." arrow>
              <IconButton sx={{ ml: 1 }}>
                <HelpOutlineIcon />
              </IconButton>
            </Tooltip>
          </Typography>
          {!files.financial ? (
            <TextField
              type="file"
              fullWidth
              variant="outlined"
              onChange={(e) => handleFileChange(e, 'financial')}
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
          ) : (
            <div>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  backgroundColor: '#FFFFFF',
                  padding: '10px',
                  borderRadius: '10px',
                }}
              >
                <Typography variant="body1">{files.financial.name}</Typography>
                <IconButton onClick={() => handleFileRemove('financial')}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </div>
          )}
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
            <Tooltip title="فایل باید فرمت Excel باشد." arrow>
              <IconButton sx={{ ml: 1 }}>
                <HelpOutlineIcon />
              </IconButton>
            </Tooltip>
          </Typography>
          {!files.credit ? (
            <TextField
              type="file"
              fullWidth
              variant="outlined"
              onChange={(e) => handleFileChange(e, 'credit')}
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
          ) : (
            <div>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  backgroundColor: '#FFFFFF',
                  padding: '10px',
                  borderRadius: '10px',
                }}
              >
                <Typography variant="body1">{files.credit.name}</Typography>
                <IconButton onClick={() => handleFileRemove('credit')}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </div>
          )}
        </Grid>

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

export default InformationRecording;
