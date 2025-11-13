import React, { JSX } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { scaleFont } from "../../utils/Normalize";

interface ButtonProps {
  btnText: string;
  onPress: () => void;
  svgIcon?: JSX.Element;
  isLoading?: boolean;
  disabled?: boolean;
}

export const Button = ({
  btnText,
  onPress,
  svgIcon,
  isLoading,
  disabled,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      className={'h-[52px] flex-row items-center justify-center bg-primaryColor rounded-[12px] gap-[12px] mt-4'}
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
    >
      {svgIcon && svgIcon}
      {isLoading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text className={'text-white text-center font-enMd'} style={styles.btnText}>
          {btnText}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnText: {
    fontSize: scaleFont(18),
  },
});
