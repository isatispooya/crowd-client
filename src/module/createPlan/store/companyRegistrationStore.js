import { create } from 'zustand';

const useCompanyRegistrationStore = create((set) => ({
  // Company Files
  logo: null,
  validation_report: null,
  financial_statement: null,

  // Plan Information
  suggestion_plan_name: '',
  amount_of_investment: '',

  // Bank Information
  bank: '',
  bank_branch: '',
  bank_branch_code: '',
  company_id: '',

  // Actions for updating files
  setFile: (type, file) =>
    set({
      [type]: file,
    }),

  removeFile: (type) =>
    set({
      [type]: null,
    }),

  // Actions for updating fields
  updateField: (field, value) =>
    set({
      [field]: value,
    }),

  // Reset store
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

  // Get all data for submission
  getAllData: () => ({
    ...useCompanyRegistrationStore.getState(),
  }),
}));

export default useCompanyRegistrationStore;
