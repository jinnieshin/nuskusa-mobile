import {
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  KeyboardAvoidingView,
  Animated,
  Dimensions,
} from "react-native";
import { View, Text } from "../../components/Themed";
import CheckBox from "expo-checkbox";
import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import TextInputBox from "../../components/Authentication/TextInputBox";
import CustomButton from "../../components/Authentication/CustomButton";
import { sha512 } from "js-sha512";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/features/user";
//@ts-ignore
import { REACT_APP_HOST } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Animatable from "react-native-animatable";

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
      } else {
        Alert.alert(
          "입력하신 이메일이 존재하지 않거나 비밀번호가 일치하지 않습니다."
        );
      }
    } catch (error) {
      Alert.alert(error.message);
      console.log(error.message);
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

  const translation = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    //start animation after 2 seconds
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(translation, {
          // (200 - 160)/2 = 20
          // (imgDestinationY - imgStartY) / (phone height) = 0.17
          toValue: -(height * 0.17) - 20,
          useNativeDriver: true,
          duration: 1000,
        }),
        Animated.timing(scale, {
          toValue: 0.8, // start width and height: 200, end width and height: 160
          useNativeDriver: true,
          duration: 1000,
        }),
      ]).start();
    }, 2000);
  }, []);

  const [imgStartY, setImgStartY] = useState<number>(0);
  const [imgDestinationY, setImgDestinationY] = useState<number>(0);

  const { width, height } = Dimensions.get("window");

  return (
    <TouchableWithoutFeedback onPress={handleBackgroundPress}>
      <View style={styles.container}>
        {/* A transparent View component for keeping margins and dimensions 
        of other components before animation */}
        <View
          style={[styles.dummyLogo]}
          // get position of image animation destination
          onLayout={(e) => {
            const layout = e.nativeEvent.layout;
            setImgDestinationY(layout.y);
          }}
        />
        <Animated.View
          style={{
            position: "absolute",
            zIndex: 1,
          }}
          // get position of image animation start position
          onLayout={(e) => {
            const layout = e.nativeEvent.layout;
            setImgStartY(layout.y);
          }}
        >
          <Animated.Image
            source={require("../../assets/images/nusks-logo.png")}
            style={[
              styles.logo,
              {
                transform: [{ translateY: translation }, { scale: scale }],
              },
            ]}
          />
        </Animated.View>

        <Animatable.View animation="fadeIn" duration={1000} delay={2800}>
          {/* @ts-ignore */}
          <Text style={styles.logInText}>Log In</Text>
          <View>
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
        </Animatable.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },

  dummyLogo: {
    width: 160,
    height: 160,
  },
  logo: {
    width: 200,
    height: 200,
  },

  logInText: {
    fontFamily: Platform.OS === "ios" ? "Arial" : "Roboto",
    color: "Black",
    fontWeight: "700",
    lineHeight: "80%",
    fontSize: 27,
    fontStyle: "normal",
    alignSelf: "center",
  },

  textBoxContainer: {
    // position: "relative",
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
