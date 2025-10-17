import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "./store";

interface NetworkState {
  isConnected: boolean | null;
}

const initialState: NetworkState = {
  isConnected: null,
};

const networkSlice = createSlice({
  name: "network",
  initialState,
  reducers: {
    setIsConnected(state, action) {
      state.isConnected = action.payload;
    },
  },
});

export const { setIsConnected } = networkSlice.actions;
export const selectNetwork = (state: RootState) => state.network;
export const networkReducer = networkSlice.reducer;
