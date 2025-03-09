import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';
import BoardMembersSection from './BoardMembersSection';

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

const CompanyDetailsPopUp = ({ isOpen, onClose, data }) => {
  const navigate = useNavigate();
  const handleClose = () => {
    onClose(false);
  };

  const handleConfirm = () => {
    navigate('/cardsDetail', {
      state: {
        generetedId: data?.company?.id,
      },
    });
    onClose(false);
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
          <SectionTitle sx={{ color: '#6B9ACD' }}>اطلاعات اصلی شرکت</SectionTitle>
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

        <BoardMembersSection members={data?.members} />
      </DialogContent>
      <DialogActions sx={{ padding: '12px 24px', borderTop: '1px solid #f0f0f0' }}>
        <Button
          onClick={handleClose}
          color="error"
          variant="outlined"
          sx={{
            textTransform: 'none',
            fontWeight: 400,
            minWidth: '80px',
            ml: 1,
          }}
        >
          رد
        </Button>
        <Button
          onClick={handleConfirm}
          color="primary"
          variant="contained"
          sx={{
            textTransform: 'none',
            fontWeight: 400,
            minWidth: '80px',
          }}
        >
          تایید
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
