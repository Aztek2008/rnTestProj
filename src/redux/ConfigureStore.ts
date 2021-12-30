import {configureStore} from '@reduxjs/toolkit';
import pictureUriReducer from './PicturesSlice';
import usersReducer from './UsersSlice';

export const store = configureStore({
  reducer: {
    uris: pictureUriReducer,
    users: usersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
