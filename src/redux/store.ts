import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/reducer/auth.reducer';
import adminLayoutReducer from './layout/admin-layout/reducer/admin-layout.reducer';
import loginPageReducer from './pages/login/reducer/login-page.reducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    loginPage: loginPageReducer,
    adminLayout: adminLayoutReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootStateInterface = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatchInterface = typeof store.dispatch

