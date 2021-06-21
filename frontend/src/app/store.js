import { configureStore } from '@reduxjs/toolkit';
import screenReducer from '../features/screenSlice'
import userReducer from '../features/userSlice'

export const store = configureStore({
  reducer: {
    screen: screenReducer,
    User  : userReducer
  },
});
