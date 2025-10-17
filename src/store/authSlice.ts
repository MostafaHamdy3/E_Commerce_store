import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "./store";

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthState {
  isAuthenticated: boolean;
  isSuperAdmin: boolean;
  user: User | null;
  lastInteraction: number;
  // token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isSuperAdmin: false,
  user: null,
  lastInteraction: 0,
  // token: null,
};

const SUPER_ADMIN_USERNAME = "noahh";

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isSuperAdmin = action.payload.username === SUPER_ADMIN_USERNAME;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.isSuperAdmin = false;
    },
    resetInactivity: (state) => {
      state.lastInteraction = Date.now();
    },
  },
});

export const { loginSuccess, logout, resetInactivity } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export const AuthReducer = authSlice.reducer;
