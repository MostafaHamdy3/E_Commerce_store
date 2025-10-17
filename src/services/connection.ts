import NetInfo from "@react-native-community/netinfo";

import { store } from "../store/store";
import { setIsConnected } from "../store/networkSlice";

export const checkInternetConnection = async (): Promise<void> => {
  const isConnected = await NetInfo.fetch().then((state) => state.isConnected);
  store.dispatch(setIsConnected(!!isConnected));
};

export const initNetworkListener = (): (() => void) => {
  return NetInfo.addEventListener((state) => {
    store.dispatch(setIsConnected(!!state.isConnected));
  });
};
