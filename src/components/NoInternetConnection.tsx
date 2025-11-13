import React from "react";
import { I18nManager, Text, View } from "react-native";

import { useSelector } from "react-redux";

import { selectNetwork } from "../store/networkSlice";
import NoWifi from "../assets/svgs/no_internet.svg";

const NoInternetConnection = () => {
  const { isConnected } = useSelector(selectNetwork);

  return (
    <>
      {!isConnected && (
        <View className={`bg-borderColor ${I18nManager.isRTL ? "flex-row-reverse" : "flex-row"} items-center justify-center gap-2 p-2`}>
          <NoWifi width={24} height={24} />
          <Text>Offline Mode: Data may be outdated.</Text>
        </View>
      )}
    </>
  );
};

export default NoInternetConnection;
