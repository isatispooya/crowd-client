import { create } from 'zustand';

const useCompanyRegistrationStore = create((set) => ({
  logo: null,
  validation_report: null,
  financial_statement: null,

  suggestion_plan_name: '',
  amount_of_investment: '',

  bank: '',
  bank_branch: '',
  bank_branch_code: '',
  company_id: '',

  setFile: (type, file) =>
    set({
      [type]: file,
    }),

  removeFile: (type) =>
    set({
      [type]: null,
    }),

  updateField: (field, value) =>
    set({
      [field]: value,
    }),

  resetStore: () =>
    set({
      logo: null,
      validation_report: null,
      financial_statement: null,
      suggestion_plan_name: '',
      amount_of_investment: '',
      bank: '',
      bank_branch: '',
      bank_branch_code: '',
      company_id: '',
    }),

  getAllData: () => ({
    ...useCompanyRegistrationStore.getState(),
  }),
}));

export default useCompanyRegistrationStore;
