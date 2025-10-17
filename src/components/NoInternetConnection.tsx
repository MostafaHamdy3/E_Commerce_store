import React from "react";
import { Text, View } from "react-native";

import { useSelector } from "react-redux";

import { selectNetwork } from "../store/networkSlice";
import NoWifi from "../assets/svgs/no_internet.svg";

const NoInternetConnection = () => {
  const { isConnected } = useSelector(selectNetwork);

  return (
    <>
      {!isConnected && (
        <View className={container}>
          <NoWifi width={24} height={24} />
          <Text>Offline Mode: Data may be outdated.</Text>
        </View>
      )}
    </>
  );
};

const container = "bg-borderColor flex-row items-center justify-center gap-2 p-2";

export default NoInternetConnection;
