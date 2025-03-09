import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import { OnRun } from 'src/api/OnRun';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 8,
  },
  '& .MuiDialogTitle-root': {
    padding: theme.spacing(2.5, 3),
    borderBottom: '1px solid #f0f0f0',
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
  },
}));

const InfoItem = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(1.5),
  display: 'flex',
  alignItems: 'flex-start',
}));

const InfoLabel = styled(Typography)({
  fontWeight: 500,
  minWidth: '100px',
  color: '#666',
  fontSize: '0.9rem',
});

const InfoValue = styled(Typography)({
  color: '#333',
});

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2.5),
  fontWeight: 500,
  color: theme.palette.primary.main,
  fontSize: '1.1rem',
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  boxShadow: 'none',
  '&:before': {
    display: 'none',
  },
  '& .MuiAccordionSummary-root': {
    padding: theme.spacing(0, 1),
    minHeight: 'auto',
    '&.Mui-expanded': {
      minHeight: 'auto',
    },
  },
  '& .MuiAccordionSummary-content': {
    margin: theme.spacing(1, 0),
    '&.Mui-expanded': {
      margin: theme.spacing(1, 0),
    },
  },
  '& .MuiAccordionDetails-root': {
    padding: theme.spacing(1),
  },
}));

const SmallMemberCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1.5),
  margin: theme.spacing(0.5),
  borderRadius: 8,
  border: '1px solid #f0f0f0',
  boxShadow: 'none',
  transition: 'box-shadow 0.2s',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: 'calc(25% - 16px)',
  minWidth: '110px',
  height: '160px',
  '&:hover': {
    boxShadow: '0 3px 10px rgba(0,0,0,0.08)',
  },
}));

const CompanyDetailsPopUp = ({ isOpen, onClose, data }) => {
  console.log(data);
  const [expanded, setExpanded] = React.useState(false);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleClose = () => {
    onClose(false);
  };

  const pastelBlue = {
    light: '#E6F4FF',
    main: '#B3E0FF',
    dark: '#6B9ACD',
    contrastText: '#1A365D',
  };

  return (
    <StyledDialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="company-dialog-title"
      aria-describedby="company-dialog-description"
      maxWidth="md"
      fullWidth
    >
      <DialogTitle id="company-dialog-title">
        <Typography variant="h6" fontWeight={500}>
          {data?.company?.title || 'اطلاعات شرکت'}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box mb={4} mt={2}>
          <SectionTitle>اطلاعات اصلی شرکت</SectionTitle>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <InfoItem>
                <InfoLabel>شناسه ملی</InfoLabel>
                <InfoValue>{data?.company?.national_id}</InfoValue>
              </InfoItem>
            </Grid>
            <Grid item xs={12} md={6}>
              <InfoItem>
                <InfoLabel>شماره ثبت</InfoLabel>
                <InfoValue>{data?.company?.registration_number}</InfoValue>
              </InfoItem>
            </Grid>
            <Grid item xs={12} md={6}>
              <InfoItem>
                <InfoLabel>تاریخ ثبت</InfoLabel>
                <InfoValue>{data?.company?.persian_registration_date}</InfoValue>
              </InfoItem>
            </Grid>
            <Grid item xs={12} md={6}>
              <InfoItem>
                <InfoLabel>سرمایه</InfoLabel>
                <InfoValue>{data?.company?.capital?.toLocaleString()} ریال</InfoValue>
              </InfoItem>
            </Grid>
            <Grid item xs={12} md={6}>
              <InfoItem>
                <InfoLabel>کد اقتصادی</InfoLabel>
                <InfoValue>{data?.company?.economic_code}</InfoValue>
              </InfoItem>
            </Grid>
            <Grid item xs={12} md={6}>
              <InfoItem>
                <InfoLabel>کد پستی</InfoLabel>
                <InfoValue>{data?.company?.postal_code}</InfoValue>
              </InfoItem>
            </Grid>
            <Grid item xs={12} md={6}>
              <InfoItem>
                <InfoLabel>وضعیت</InfoLabel>
                <InfoValue>{data?.company?.status}</InfoValue>
              </InfoItem>
            </Grid>
            <Grid item xs={12} md={6}>
              <InfoItem>
                <InfoLabel>واحد ثبت</InfoLabel>
                <InfoValue>{data?.company?.registration_unit}</InfoValue>
              </InfoItem>
            </Grid>
            <Grid item xs={12}>
              <InfoItem>
                <InfoLabel>آدرس</InfoLabel>
                <InfoValue>{data?.company?.address}</InfoValue>
              </InfoItem>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 3, opacity: 0.6 }} />

        <Box>
          <StyledAccordion
            expanded={expanded === 'members'}
            onChange={handleAccordionChange('members')}
            sx={{
              bgcolor: 'transparent',
              border: '1px solid #eaeaea',
              borderRadius: '8px',
              mb: 2,
              '&:hover': {
                borderColor: (theme) => theme.palette.primary.light,
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon color="primary" />}
              aria-controls="members-content"
              id="members-header"
              sx={{
                borderBottom: expanded === 'members' ? '1px solid #f0f0f0' : 'none',
                '&:hover': { bgcolor: '#f9f9f9' },
                py: 0.5,
              }}
            >
              <Typography color="primary" fontWeight={500} sx={{ fontSize: '1.1rem' }}>
                اعضای هیئت مدیره
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ pt: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'flex-start',
                  gap: '8px',
                  maxHeight: '350px',
                  overflowY: 'auto',
                  pr: 1,
                  mx: -0.5,
                }}
              >
                {data?.members?.map((member, index) => (
                  <SmallMemberCard key={index}>
                    <Avatar
                      src={`${OnRun}/${member.picture_url}`}
                      alt={member.person_title}
                      sx={{ width: 45, height: 45, mb: 1 }}
                    />
                    <Typography
                      variant="body2"
                      fontWeight={500}
                      align="center"
                      sx={{
                        mb: 0.5,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        height: '40px',
                        width: '100%',
                        px: 0.5,
                      }}
                    >
                      {member.person_title}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="primary"
                      align="center"
                      sx={{
                        mb: 0.5,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        width: '100%',
                      }}
                    >
                      {member.position_title}
                    </Typography>
                  </SmallMemberCard>
                ))}
              </Box>
            </AccordionDetails>
          </StyledAccordion>
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: '12px 24px', borderTop: '1px solid #f0f0f0' }}>
        <Button
          onClick={handleClose}
          color="primary"
          sx={{
            textTransform: 'none',
            fontWeight: 400,
            minWidth: '80px',
          }}
        >
          بستن
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

CompanyDetailsPopUp.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default CompanyDetailsPopUp;
