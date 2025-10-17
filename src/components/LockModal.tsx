import React, { useEffect } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

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
      <View className={container}>
        <View className={content}>
          <Text className={mainText}>App Locked</Text>
          <Text className={passcodeText}>
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

const container = "flex-1 bg-bgScreen items-center justify-center pb-36";
const content = "bg-bgContainer p-6 rounded-lg items-center shadow-lg";
const mainText = "text-mainColor font-enBold text-lg mb-4";
const passcodeText = "text-center text-secondaryColor mb-4";

export default LockModal;
