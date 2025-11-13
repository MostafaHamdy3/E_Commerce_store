import React, { useEffect } from "react";
import { Modal, Text, View } from "react-native";

import * as LocalAuthentication from "expo-local-authentication";

import { Button } from "./common/Button";

type LockModalProps = {
  isVisible: boolean;
  unlockHandler: () => void;
};

const LockModal = ({ isVisible, unlockHandler }: LockModalProps) => {
  useEffect(() => {
    if (isVisible) {
      handleBiometric();
    }
  }, [isVisible]);

  const handleBiometric = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate with your biometric credential",
        fallbackLabel: "Use Device Passcode",
        cancelLabel: "Cancel",
      });
      if (result.success) {
        unlockHandler();
      }
    } catch (error) {
      console.log("handleBiometric ERROR ==>", error);
    }
  };

  const retryUnlock = () => handleBiometric();

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="none"
      onRequestClose={() => {}}
      statusBarTranslucent
    >
      <View className={"flex-1 items-center justify-center bg-bgScreen pb-16"}>
        <View className={"w-[92%] self-center bg-bgContainer p-6 rounded-lg shadow-lg"}>
          <Text className={"text-center text-mainColor font-enBold text-lg mb-4"}>
            App Locked
          </Text>
          <Text className={"text-center text-secondaryColor mb-4"}>
            Use biometrics or device passcode to unlock.
          </Text>
          <Button
            btnText="Unlock"
            onPress={retryUnlock}
          />
        </View>
      </View>
    </Modal>
  );
};

export default LockModal;
