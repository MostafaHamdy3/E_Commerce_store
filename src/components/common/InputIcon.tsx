import React, { JSX, useState } from "react";
import {
  TextInput,
  View,
  KeyboardTypeOptions,
  TouchableOpacity,
  StyleSheet,
  I18nManager,
} from "react-native";

import { useTheme } from "../../theme/ThemeContext";
import { scaleFont } from "../../utils/Normalize";
import Visible from "../../assets/svgs/visible.svg";
import UnVisible from "../../assets/svgs/unVisible.svg";

type inputIconProps = {
  escortSvg: JSX.Element;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  value: string;
  onChangeText: (text: string) => void;
  onBlur: (e: any) => void;
  secureTextEntry?: boolean;
};

const InputIcon = ({
  escortSvg,
  placeholder,
  keyboardType,
  value,
  onChangeText,
  onBlur,
  secureTextEntry,
}: inputIconProps) => {
  const { getThemeColor } = useTheme();

  const [isSecure, setIsSecure] = useState<boolean>(true);

  const onToggleSecure = () => {
    setIsSecure(!isSecure);
  };

  return (
    <View className={inputContainer}>
      <View className={inputContent}>
        {escortSvg}
        <TextInput
          className={inputText}
          style={styles.inputText}
          placeholder={placeholder}
          placeholderTextColor={getThemeColor("placeholder")}
          keyboardType={keyboardType}
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="none"
          secureTextEntry={secureTextEntry && isSecure}
          onBlur={onBlur}
        />
      </View>
      {secureTextEntry && (
        <TouchableOpacity onPress={onToggleSecure}>
          {isSecure ? (
            <UnVisible color={getThemeColor("placeholder")} />
          ) : (
            <Visible color={getThemeColor("primaryColor")} />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const inputContainer = `${I18nManager.isRTL ? 'flex-row-reverse' : 'flex-row'} items-center justify-between bg-bgContainer border border-borderColor ${I18nManager.isRTL ? 'pr-4 pl-12' : 'pl-4 pr-12'} py-3 mt-3 rounded-[12px]`;
const inputContent = `${I18nManager.isRTL ? 'flex-row-reverse' : 'flex-row'} items-center gap-2`;
const inputText = `flex-1 text-mainColor py-[6px] text-left font-enMd`;

const styles = StyleSheet.create({
  inputText: { fontSize: scaleFont(14) },
});

export default InputIcon;
