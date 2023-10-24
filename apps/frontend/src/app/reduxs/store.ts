import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/user';
import layoutReducer from './admin-layout/admin-layout';

const store = configureStore({
  reducer: {
    user: userReducer,
    layout: layoutReducer,
  },
});

export default store;
