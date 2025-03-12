import React from 'react';
import PropTypes from 'prop-types';
import { Grid, LinearProgress } from '@mui/material';
import { formatNumber } from '../../../../../utils/formatNumbers';
import FormField from '../../../components/FormField';
import AccordionCom from '../../../components/accordian';
import useCompanyRegistrationStore from '../../../store/companyRegistrationStore';

const PlanInfo = ({ pastelBlue }) => {
  const { suggestion_plan_name, amount_of_investment, updateField } = useCompanyRegistrationStore();

  const minAmount = 50000000000;
  const maxAmount = 250000000000;

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'amount') {
      const numericValue = value.replace(/,/g, '');
      if (numericValue === '') {
        updateField('amount_of_investment', '');
      } else {
        const limitedValue = Math.min(Number(numericValue), maxAmount);
        updateField('amount_of_investment', limitedValue);
      }
    } else if (name === 'name') {
      updateField('suggestion_plan_name', value);
    }
  };

  return (
    <Grid item xs={12}>
      <AccordionCom title="اطلاعات طرح" id="financial-info" pastelBlue={pastelBlue}>
        <Grid container spacing={3}>
          <FormField
            label="نام پیشنهادی طرح"
            name="name"
            value={suggestion_plan_name || ''}
            onChange={handleChange}
            hint="نام پیشنهادی طرح باید بیشتر از 5 کاراکتر باشد"
            pastelBlue={pastelBlue}
            xs={12}
            md={6}
          />
          <Grid item xs={12} md={6}>
            <FormField
              label="مبلغ تامین مالی"
              name="amount"
              value={amount_of_investment ? formatNumber(amount_of_investment) : ''}
              onChange={handleChange}
              hint="مبلغ تامین مالی باید بین 5 میلیارد تومان تا 25 میلیارد تومان باشد"
              helperText={
                amount_of_investment && amount_of_investment < minAmount
                  ? 'مبلغ کمتر از حداقل مجاز است'
                  : ''
              }
              error={!!(amount_of_investment && amount_of_investment < minAmount)}
              pastelBlue={pastelBlue}
              xs={12}
            />
            <LinearProgress
              variant="determinate"
              value={amount_of_investment ? (amount_of_investment / maxAmount) * 100 : 0}
              sx={{
                height: 10,
                borderRadius: 5,
                mt: 1,
                '& .MuiLinearProgress-bar': {
                  backgroundColor: 'primary.dark',
                },
              }}
            />
          </Grid>
        </Grid>
      </AccordionCom>
    </Grid>
  );
};

PlanInfo.propTypes = {
  pastelBlue: PropTypes.shape({
    light: PropTypes.string.isRequired,
    main: PropTypes.string.isRequired,
    contrastText: PropTypes.string.isRequired,
    dark: PropTypes.string.isRequired,
  }).isRequired,
};

export default PlanInfo;
