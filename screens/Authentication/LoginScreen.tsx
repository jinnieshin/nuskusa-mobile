import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import CheckBox from "expo-checkbox";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextInputBox from "../../components/Authentication/TextInputBox";
import CustomButton from "../../components/Authentication/CustomButton";
import { sha512 } from "js-sha512";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/features/user";
//@ts-ignore
import { REACT_APP_HOST } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const dispatch = useDispatch();

  const [saveEmail, setSaveEmail] = useState<boolean>(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const email: string = watch("Email");
  const password: string = watch("Password");
  const user = useSelector((state: any) => state.user.value);

  const handleLogin = async (event: any) => {
    setLoading(true);
    const url = REACT_APP_HOST + "/api/auth/signin";
    const credentialObject = {
      email,
      password: sha512(password).toString(),
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(credentialObject),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.status);
      if (response.status == 200) {
        setLoading(false);
        const userdata = await response.json();
        dispatch(setUser(userdata));
        if (keepLoggedIn) {
          // If user chooses to keep logged in:
          await AsyncStorage.setItem("userObject", JSON.stringify(userdata));
          await AsyncStorage.setItem(
            "userPassword",
            sha512(password).toString()
          );
          console.log("SAVED");
        }
      }
    } catch (error) {
      Alert.alert(error.message);
      console.log(error.message);
    } finally {
      console.log("signed in");
    }
  };

  const handleBackgroundPress = () => {
    Keyboard.dismiss();
  };
  const handleResetPassword = () => {
    navigation.navigate("ResetPassword");
  };
  const handleSignUpPage = () => {
    navigation.navigate("AgreementScreen");
  };

  return (
    <TouchableWithoutFeedback onPress={handleBackgroundPress}>
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/nusks-logo.png")}
          style={styles.logo}
        />
        {/* @ts-ignore */}
        <Text style={styles.logInText}>Log In</Text>
        <View style={{ top: 185 }}>
          <View style={styles.textBoxContainer}>
            <TextInputBox
              placeholder="이메일 / Email"
              controller={control}
              name="Email"
              secureTextEntry={false}
              rules={{
                required: "Email is required",
              }}
            />
            <TextInputBox
              placeholder="비밀번호 / Password"
              controller={control}
              name="Password"
              secureTextEntry={true}
              rules={{
                required: "Password is required",
              }}
            />
          </View>
          <View style={styles.checkBoxSection}>
            <CheckBox
              style={styles.checkbox}
              value={saveEmail}
              onValueChange={setSaveEmail}
              color={saveEmail ? "#4630EB" : undefined}
            />

            <Text style={styles.checkboxText}>이메일 저장</Text>
            <CheckBox
              style={styles.checkbox}
              value={keepLoggedIn}
              onValueChange={setKeepLoggedIn}
              color={keepLoggedIn ? "#4630EB" : undefined}
            />
            <Text style={styles.checkboxText}>로그인 유지</Text>
          </View>
          <CustomButton
            isDark={true}
            text="Submit"
            handlePress={handleSubmit(handleLogin)}
          />

          <View style={styles.textButtonContainer}>
            <TouchableOpacity>
              <Text style={styles.textButtons}>아이디 찾기</Text>
            </TouchableOpacity>
            <Text style={styles.textButtons}>|</Text>
            <TouchableOpacity onPress={handleResetPassword}>
              <Text style={styles.textButtons}>비밀번호 찾기</Text>
            </TouchableOpacity>

            <Text style={styles.textButtons}>|</Text>
            <TouchableOpacity onPress={handleSignUpPage}>
              <Text style={styles.textButtons}>회원가입</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },

  logo: {
    width: 159,
    height: 160,
    top: 179,
  },

  logInText: {
    fontFamily: Platform.OS === "ios" ? "Arial" : "Roboto",
    color: "Black",
    fontWeight: "700",
    lineHeight: "80%",
    fontSize: 27,
    fontStyle: "normal",
    top: 184,
  },

  textBoxContainer: {
    position: "relative",
    // top: 185,
  },
  checkBoxSection: {
    fontFamily: Platform.OS === "ios" ? "Arial" : "Roboto",
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "center",
    marginVertical: 17,
    fontSize: 12,
  },
  checkbox: {
    marginRight: 8,
  },
  checkboxText: {
    marginRight: 14,
  },
  textButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  textButtons: {
    fontFamily: Platform.OS === "ios" ? "Arial" : "Roboto",
    fontSize: 13,
    marginHorizontal: 5,
  },
});
