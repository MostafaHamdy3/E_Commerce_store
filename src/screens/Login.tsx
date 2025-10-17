import React from "react";
import { I18nManager, Image, StyleSheet, Text, View } from "react-native";

import { useDispatch } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { Formik, FormikHelpers } from "formik";
import { object, string } from "yup";

import { scaleFont } from "../utils/Normalize";
import InputIcon from "../components/common/InputIcon";
import { useTheme } from "../theme/ThemeContext";
import { Button } from "../components/common/Button";
import { useLoginMutation } from "../hooks/useLoginMutation";
import { setAccessToken } from "../utils/storage";
import { loginSuccess } from "../store/authSlice";
import Email from "../assets/svgs/email.svg";
import Password from "../assets/svgs/lock.svg";

type LoginFormValues = {
  username: string;
  password: string;
};

const initialValues: LoginFormValues & { status?: { error?: string } } = {
  username: "",
  password: "",
  status: { error: undefined },
};

const Login = () => {
  const { getThemeColor } = useTheme();
  const dispatch = useDispatch();
  const loginMutation = useLoginMutation();

  const loginSchema = object({
    username: string().required("This field is required"),
    password: string()
      .min(6, "Password must be more than 6 characters")
      .required("This field is required"),
  });

  const handleLogin = async (
    values: LoginFormValues,
    actions: FormikHelpers<LoginFormValues>
  ): Promise<void> => {
    try {
      const response = await loginMutation.mutateAsync({
        username: values.username,
        password: values.password,
      });

      setAccessToken(response.accessToken);
      // setUser(response);
      dispatch(loginSuccess(response));
      actions.resetForm();
    } catch (error) {
      console.log("handleLogin ERROR ==>", error);
      const errorMessage =
        error instanceof Error ? error.message : "Login failed";
      actions.setStatus({ error: errorMessage });
    }
  };

  return (
    <KeyboardAwareScrollView
      className="w-[100%]"
      bottomOffset={20}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <View className={container}>
        <Image source={require("../assets/logo.png")} className={logoStyle} />
        <Text className={welcome} style={styles.welcomeText}>
          {"Welcome Back!"}
        </Text>
        <Text className={authTitle} style={styles.continueText}>
          {"Sign in to your account"}
        </Text>
        <View className={authContent}>
          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={handleLogin}
          >
            {(formikProps) => (
              <>
                <InputIcon
                  escortSvg={<Email color={getThemeColor("placeholder")} />}
                  placeholder={"Username"}
                  value={formikProps.values.username}
                  onChangeText={formikProps.handleChange("username")}
                  onBlur={formikProps.handleBlur("username")}
                />
                <Text className={errorMessage} style={styles.errorText}>
                  {formikProps.touched.username && formikProps.errors.username}
                </Text>
                <InputIcon
                  escortSvg={<Password color={getThemeColor("placeholder")} />}
                  placeholder={"Password"}
                  value={formikProps.values.password}
                  onChangeText={formikProps.handleChange("password")}
                  onBlur={formikProps.handleBlur("password")}
                  secureTextEntry={true}
                />
                <Text className={errorMessage} style={styles.errorText}>
                  {formikProps.touched.password && formikProps.errors.password}
                </Text>
                <Text className={generalError} style={styles.errorText}>
                  {formikProps.status?.error}
                </Text>
                <Button
                  btnText={"Sign In"}
                  onPress={formikProps.handleSubmit}
                  isLoading={loginMutation.isPending}
                  disabled={formikProps.isSubmitting}
                />
              </>
            )}
          </Formik>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const container = "flex-1 bg-bgScreen items-center justify-center pb-36";
const logoStyle = "w-48 h-48 mb-[-24px]";
const welcome = `text-mainColor font-enMd`;
const authTitle = `w-full text-center text-descColor font-enMd`;
const authContent = "w-[92%] mt-12";
const errorMessage = `text-error mt-1 mx-2 font-enRg ${I18nManager.isRTL ? 'text-right' : 'text-left'}`;
const generalError = `text-error mb-1 mx-2 font-enMd ${I18nManager.isRTL ? 'text-right' : 'text-left'}`;

const styles = StyleSheet.create({
  welcomeText: { fontSize: scaleFont(27) },
  continueText: { fontSize: scaleFont(14) },
  errorText: { fontSize: scaleFont(12) },
});

export default Login;
