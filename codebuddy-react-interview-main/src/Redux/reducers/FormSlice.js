import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {
    emailId: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    countryCode: '',
    phoneNumber: '',
    acceptTermsAndCondition: false,
    
  },
  errors: {},
  currentStep: 1,
  validatedForm1:false,
  validatedForm2:false,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    updateErrors: (state, action) => {
      state.errors = action.payload;
    },
    updateCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    clearForm: (state) => {
      state.formData = initialState.formData;
      state.errors = initialState.errors;
      state.currentStep = initialState.currentStep;
    },
    validatationUpdate1:(state)=>{
      state.validatedForm1=true
    },
    validatationUpdate2:(state)=>{
      state.validatedForm2=true
    }
  },
});

export const { updateFormData, updateErrors, updateCurrentStep, clearForm,validatationUpdate1,validatationUpdate2 } = formSlice.actions;

export const selectFormData = (state) => state.form.formData;
export const selectErrors = (state) => state.form.errors;
export const selectCurrentStep = (state) => state.form.currentStep;

export default formSlice.reducer;
