import { configureStore } from "@reduxjs/toolkit";

import { AuthReducer } from "./authSlice";
import { networkReducer } from "./networkSlice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    network: networkReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
