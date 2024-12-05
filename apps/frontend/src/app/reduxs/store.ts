import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/user';
import adminLayoutReducer from './admin-layout/admin-layout';
import storageSession from 'redux-persist/lib/storage/session';
import { persistStore, persistReducer } from 'redux-persist';
import { environment } from '@frontend/configuration';

const persistConfig = {
  key: environment.authPersistKey,
  storage: storageSession,
};

const userPersistedReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    user: userPersistedReducer,
    adminLayout: adminLayoutReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

const persistor = persistStore(store);

export { persistor };

export default store;
