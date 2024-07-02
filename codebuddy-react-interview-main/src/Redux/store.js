import { configureStore } from '@reduxjs/toolkit';
import formReducer from './reducers/FormSlice';

const store = configureStore({
  reducer: {
    form: formReducer,
  },
});

export default store;
