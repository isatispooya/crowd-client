import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, MenuItem } from '@mui/material';
import FormField from '../../../components/FormField';
import AccordionCom from '../../../components/accordian';
import useCompanyRegistrationStore from '../../../store/companyRegistrationStore';
import { useGetCompany } from '../../../hooks';

const CompanyBankInfo = ({ pastelBlue }) => {
  const { bank, bank_branch, bank_branch_code, updateField } = useCompanyRegistrationStore();
  const { data: companyData } = useGetCompany();

  // Preload bank data from investor_request
  useEffect(() => {
    if (companyData?.investor_request) {
      const { bank, bank_branch, bank_branch_code } = companyData.investor_request;
      if (bank) updateField('bank', bank);
      if (bank_branch) updateField('bank_branch', bank_branch);
      if (bank_branch_code) updateField('bank_branch_code', bank_branch_code);
    }
  }, [companyData]);

  const banks = [
    { id: 1, name: 'بانک ملی ایران' },
    { id: 2, name: 'بانک سپه' },
    { id: 3, name: 'بانک صنعت و معدن' },
    { id: 4, name: 'بانک کشاورزی' },
    { id: 5, name: 'بانک مسکن' },
    { id: 6, name: 'بانک توسعه صادرات ایران' },
    { id: 7, name: 'بانک توسعه تعاون' },
    { id: 8, name: 'پست بانک ایران' },
    { id: 9, name: 'بانک اقتصاد نوین' },
    { id: 10, name: 'بانک پارسیان' },
    { id: 11, name: 'بانک کارآفرین' },
    { id: 12, name: 'بانک سامان' },
    { id: 13, name: 'بانک سینا' },
    { id: 14, name: 'بانک خاورمیانه' },
    { id: 15, name: 'بانک شهر' },
    { id: 16, name: 'بانک دی' },
    { id: 17, name: 'بانک صادرات ایران' },
    { id: 18, name: 'بانک ملت' },
    { id: 19, name: 'بانک تجارت' },
    { id: 20, name: 'بانک رفاه کارگران' },
    { id: 21, name: 'بانک حکمت ایرانیان' },
    { id: 22, name: 'بانک گردشگری' },
    { id: 23, name: 'بانک ایران زمین' },
    { id: 24, name: 'بانک قوامین' },
    { id: 25, name: 'بانک انصار' },
    { id: 26, name: 'بانک سرمایه' },
    { id: 27, name: 'بانک پاسارگاد' },
    { id: 28, name: 'بانک مشترک ایران-ونزوئلا' },
  ];

  const handleBankChange = (event) => {
    const { name, value } = event.target;
    updateField(name, name === 'bank' ? Number(value) : value);

    if (name === 'bank') {
      updateField('bank_branch', '');
      updateField('bank_branch_code', '');
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
      value: bank,
    },
    {
      name: 'bank_branch',
      label: 'شعبه',
      type: 'text',
      hint: 'شعبه بانک را انتخاب کنید',
      value: bank_branch,
      disabled: !bank,
    },
    {
      name: 'bank_branch_code',
      label: 'کد شعبه',
      type: 'text',
      hint: 'کد شعبه بانک را وارد کنید',
      value: bank_branch_code,
      disabled: !bank,
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
              value={field.value}
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
