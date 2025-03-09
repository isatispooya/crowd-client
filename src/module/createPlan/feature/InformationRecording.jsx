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
  LinearProgress,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { formatNumber } from '../../../utils/formatNumbers';

const InformationRecording = () => {
  const [files, setFiles] = useState({
    logo: null,
    financial: null,
    credit: null,
  });

  const [selectedBank, setSelectedBank] = useState('');
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');

  const banks = [
    { id: 'mellat', name: 'بانک ملت' },
    { id: 'melli', name: 'بانک ملی' },
    { id: 'saderat', name: 'بانک صادرات' },
    { id: 'tejarat', name: 'بانک تجارت' },
    { id: 'parsian', name: 'بانک پارسیان' },
  ];

  const bankBranches = {
    mellat: [
      { id: 'mellat1', name: 'شعبه مرکزی' },
      { id: 'mellat2', name: 'شعبه ونک' },
      { id: 'mellat3', name: 'شعبه آزادی' },
    ],
    melli: [
      { id: 'melli1', name: 'شعبه فردوسی' },
      { id: 'melli2', name: 'شعبه انقلاب' },
      { id: 'melli3', name: 'شعبه میرداماد' },
    ],
    saderat: [
      { id: 'saderat1', name: 'شعبه ولیعصر' },
      { id: 'saderat2', name: 'شعبه جمهوری' },
      { id: 'saderat3', name: 'شعبه شریعتی' },
    ],
    tejarat: [
      { id: 'tejarat1', name: 'شعبه پاسداران' },
      { id: 'tejarat2', name: 'شعبه صادقیه' },
      { id: 'tejarat3', name: 'شعبه نیاوران' },
    ],
    parsian: [
      { id: 'parsian1', name: 'شعبه سعادت‌آباد' },
      { id: 'parsian2', name: 'شعبه پونک' },
      { id: 'parsian3', name: 'شعبه تجریش' },
    ],
  };

  const handleBankChange = (event) => {
    const bankId = event.target.value;
    setSelectedBank(bankId);
    setBranches(bankBranches[bankId] || []);
    setSelectedBranch('');
  };

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  };

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

  const [amount, setAmount] = useState('');
  const minAmount = 50000000000;
  const maxAmount = 250000000000;

  const handleChange = (event) => {
    const value = event.target.value.replace(/,/g, '');
    if (value === '') {
      setAmount('');
    } else {
      const numericValue = Math.min(Number(value), maxAmount);
      setAmount(numericValue);
    }
  };

  const [expandedBankInfo, setExpandedBankInfo] = useState(false);
  const [expandedCompanyInfo, setExpandedCompanyInfo] = useState(true);
  const [expandedFinancialInfo, setExpandedFinancialInfo] = useState(false);

  const handleBankInfoChange = () => {
    setExpandedBankInfo(!expandedBankInfo);
  };

  const handleCompanyInfoChange = () => {
    setExpandedCompanyInfo(!expandedCompanyInfo);
  };

  const handleFinancialInfoChange = () => {
    setExpandedFinancialInfo(!expandedFinancialInfo);
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

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Accordion
            expanded={expandedCompanyInfo}
            onChange={handleCompanyInfoChange}
            sx={{
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px !important',
              '&:before': {
                display: 'none',
              },
              '& .MuiAccordionSummary-root': {
                borderRadius: expandedCompanyInfo ? '10px 10px 0 0' : '10px',
                backgroundColor: pastelBlue.light,
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: pastelBlue.main,
                },
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="company-info-content"
              id="company-info-header"
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 700,
                  color: pastelBlue.contrastText,
                  display: 'flex',
                  alignItems: 'center',
                  '&::before': {
                    content: '""',
                    display: 'inline-block',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: pastelBlue.dark,
                    marginRight: '15px',
                  },
                }}
              >
                اطلاعات شرکت
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ pt: 3 }}>
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
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>

        <Grid item xs={12}>
          <Accordion
            expanded={expandedFinancialInfo}
            onChange={handleFinancialInfoChange}
            sx={{
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px !important',
              '&:before': {
                display: 'none',
              },
              '& .MuiAccordionSummary-root': {
                borderRadius: expandedFinancialInfo ? '10px 10px 0 0' : '10px',
                backgroundColor: pastelBlue.light,
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: pastelBlue.main,
                },
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="financial-info-content"
              id="financial-info-header"
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 700,
                  color: pastelBlue.contrastText,
                  display: 'flex',
                  alignItems: 'center',
                  '&::before': {
                    content: '""',
                    display: 'inline-block',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: pastelBlue.dark,
                    marginRight: '15px',
                  },
                }}
              >
                اطلاعات طرح
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ pt: 3 }}>
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
                    نام پیشنهادی طرح
                    <Tooltip title="نام پیشنهادی طرح باید بیشتر از 5 کاراکتر باشد" arrow>
                      <IconButton sx={{ ml: 1 }}>
                        <HelpOutlineIcon />
                      </IconButton>
                    </Tooltip>
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
                </Grid>
                <Grid item xs={6}>
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
                    مبلغ تامین مالی
                    <Tooltip
                      title="مبلغ تامین مالی باید بین 5 میلیارد تومان تا 25 میلیارد تومان باشد "
                      arrow
                    >
                      <IconButton sx={{ ml: 1 }}>
                        <HelpOutlineIcon />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <TextField
                    type="text"
                    label="مبلغ (ریال)"
                    variant="outlined"
                    fullWidth
                    value={amount ? formatNumber(amount) : ''}
                    onChange={handleChange}
                    sx={{
                      mb: 2,
                      '& .MuiOutlinedInput-root': {
                        background: '#FFFFFF',
                        borderRadius: '10px',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                        },
                        '& fieldset': {
                          borderColor: amount && amount < minAmount ? 'red' : pastelBlue.main,
                          borderWidth: '1.5px',
                        },
                        '&:hover fieldset': {
                          borderColor: amount && amount < minAmount ? 'red' : pastelBlue.dark,
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: amount && amount < minAmount ? 'red' : pastelBlue.dark,
                          borderWidth: '2px',
                        },
                      },
                    }}
                  />
                  <LinearProgress
                    variant="determinate"
                    value={amount ? (amount / maxAmount) * 100 : 0}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: 'primary.dark',
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>

        <Grid item xs={12}>
          <Accordion
            expanded={expandedBankInfo}
            onChange={handleBankInfoChange}
            sx={{
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px !important',
              '&:before': {
                display: 'none',
              },
              '& .MuiAccordionSummary-root': {
                borderRadius: expandedBankInfo ? '10px 10px 0 0' : '10px',
                backgroundColor: pastelBlue.light,
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: pastelBlue.main,
                },
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="bank-info-content"
              id="bank-info-header"
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 700,
                  color: pastelBlue.contrastText,
                  display: 'flex',
                  alignItems: 'center',
                  '&::before': {
                    content: '""',
                    display: 'inline-block',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: pastelBlue.dark,
                    marginRight: '15px',
                  },
                }}
              >
                اطلاعات بانکی
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ pt: 3 }}>
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
                    انتخاب بانک
                    <Tooltip title="لطفاً بانک مورد نظر خود را انتخاب کنید" arrow>
                      <IconButton sx={{ ml: 1 }}>
                        <HelpOutlineIcon />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <TextField
                    select
                    fullWidth
                    variant="outlined"
                    value={selectedBank}
                    onChange={handleBankChange}
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
                  >
                    <MenuItem value="">
                      <em>انتخاب کنید</em>
                    </MenuItem>
                    {banks.map((bank) => (
                      <MenuItem key={bank.id} value={bank.id}>
                        {bank.name}
                      </MenuItem>
                    ))}
                  </TextField>
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
                    انتخاب شعبه
                    <Tooltip title="لطفاً شعبه مورد نظر خود را انتخاب کنید" arrow>
                      <IconButton sx={{ ml: 1 }}>
                        <HelpOutlineIcon />
                      </IconButton>
                    </Tooltip>
                  </Typography>
                  <TextField
                    select
                    fullWidth
                    variant="outlined"
                    value={selectedBranch}
                    onChange={handleBranchChange}
                    disabled={!selectedBank}
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
                  >
                    <MenuItem value="">
                      <em>انتخاب کنید</em>
                    </MenuItem>
                    {branches.map((branch) => (
                      <MenuItem key={branch.id} value={branch.id}>
                        {branch.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
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
