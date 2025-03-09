import React from 'react';
import PropTypes from 'prop-types';
import { Grid, MenuItem } from '@mui/material';
import FormField from '../../components/FormField';
import AccordionCom from '../../components/accordian';
import useCompanyRegistrationStore from '../../store/companyRegistrationStore';

const CompanyBankInfo = ({ pastelBlue }) => {
  const { bank, bank_branch, bank_branch_code, company_id, updateField } =
    useCompanyRegistrationStore();

  const banks = [
    { id: 1, name: 'بانک ملی ایران' },
    { id: 2, name: 'بانک صادرات ایران' },
    { id: 3, name: 'بانک ملت' },
    { id: 4, name: 'بانک تجارت' },
    { id: 5, name: 'بانک سپه' },
  ];

  const branches = [
    { id: 1, name: 'شعبه مرکزی', bankId: 1 },
    { id: 2, name: 'شعبه ولیعصر', bankId: 1 },
    { id: 3, name: 'شعبه میرداماد', bankId: 2 },
    { id: 4, name: 'شعبه پاسداران', bankId: 3 },
    { id: 5, name: 'شعبه صادقیه', bankId: 4 },
  ];

  const handleBankChange = (event) => {
    const { name, value } = event.target;
    updateField(name, value);

    if (name === 'bank') {
      updateField('bank_branch', '');
    }
  };

  const getFieldValue = (fieldName) => {
    switch (fieldName) {
      case 'bank':
        return bank;
      case 'bank_branch':
        return bank_branch;
      case 'bank_branch_code':
        return bank_branch_code;
      case 'company_id':
        return company_id;
      default:
        return '';
    }
  };

  const bankFields = [
    {
      name: 'bank',
      label: 'نام بانک',
      type: 'select',
      hint: 'بانک اصلی شرکت را انتخاب کنید',
      options: banks.map((bankk) => ({
        value: bankk.id,
        label: bankk.name,
      })),
    },
    {
      name: 'bank_branch',
      label: 'شعبه',
      type: 'select',
      hint: 'شعبه بانک را انتخاب کنید',
      options: branches
        .filter((branch) => !bank || branch.bankId === parseInt(bank, 10))
        .map((branch) => ({
          value: branch.id,
          label: branch.name,
        })),
      disabled: !bank,
    },
    {
      name: 'bank_branch_code',
      label: 'کد شعبه',
      type: 'text',
      hint: 'کد شعبه بانک را وارد کنید',
    },
    {
      name: 'company_id',
      label: 'شناسه شرکت',
      type: 'text',
      hint: 'شناسه شرکت را وارد کنید',
    },
  ];

  return (
    <Grid item xs={12}>
      <AccordionCom title="اطلاعات بانکی" id="bank-info" pastelBlue={pastelBlue}>
        <Grid container spacing={3}>
          {bankFields.map((field) => (
            <FormField
              key={field.name}
              label={field.label}
              name={field.name}
              value={getFieldValue(field.name)}
              onChange={handleBankChange}
              type={field.type}
              hint={field.hint}
              pastelBlue={pastelBlue}
              xs={12}
              md={6}
              disabled={field.disabled}
              inputProps={
                field.type === 'select'
                  ? {
                      select: true,
                      children: field.options?.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      )),
                    }
                  : {}
              }
            />
          ))}
        </Grid>
      </AccordionCom>
    </Grid>
  );
};

CompanyBankInfo.propTypes = {
  pastelBlue: PropTypes.shape({
    light: PropTypes.string.isRequired,
    main: PropTypes.string.isRequired,
    contrastText: PropTypes.string.isRequired,
    dark: PropTypes.string.isRequired,
  }).isRequired,
};

export default CompanyBankInfo;
