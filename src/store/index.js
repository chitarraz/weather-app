import { configureStore } from '@reduxjs/toolkit';
import generalReducer from './general';

const store = configureStore({
  reducer: {
    general: generalReducer,
  }
})

export default store