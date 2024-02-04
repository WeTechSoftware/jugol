import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { apiSlice } from './api/apiSlice';
import userReducer from './features/user/userSlice';
import authReducer from './features/auth/authSlice';
import messageReducer from './features/messagesSlice/messagesSlice';
import filterReducer from './features/filterSlice/filterSlice'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const reducer = combineReducers({
  auth: persistedAuthReducer,
  user: userReducer,
  messages: messageReducer,
  filterData: filterReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
  devTools: true,
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
