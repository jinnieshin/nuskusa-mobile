import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import FormHeader from "../../../../components/Authentication/FormHeader";
import FormInfoInput from "../../../../components/Authentication/FormInfoInput";
import { useForm } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../../../../components/Authentication/CustomButton";
import { Feather } from "@expo/vector-icons";
import { sha512 } from "js-sha512";
//@ts-ignore
import { REACT_APP_HOST } from "@env";

function Others({ navigation }: { navigation: any }): JSX.Element {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [loading, setLoading] = useState<boolean>(false);

  const name = watch("Name");
  const email = watch("Email");
  const password = watch("Password");

  const handleSignUp = async () => {
    if (email.split("@")[1] == "u.nus.edu") {
      Alert.alert(
        "NUS 이메일을 입력하셨습니다. NUS 관계자시라면 이전 화면에서 신입생, 재학생, 졸업생 중 선택해 가입해주세요!"
      );
      return;
    }
    setLoading(true);
    try {
      const userObject = {
        email: email,
        name: name,
        verified: true,
        role: "Registered",
        password: sha512(password).toString(),
      };
      const url = REACT_APP_HOST + "/api/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(userObject),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status == 200) {
        setLoading(false);
        Alert.alert(
          "프로필 생성이 완료되었습니다. 보내드린 이메일의 링크를 눌러 본인 인증을 완료해 계정을 활성화시켜주세요.\n\n 이메일이 오지 않는다면 스팸함을 확인해주세요!"
        );
        navigation.navigate("Congrats");
      } else {
        setLoading(false);
        Alert.alert("프로필 생성에 실패했습니다: " + response.body);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      console.log("done");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ backgroundColor: "white", flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <FormHeader studentType="일반" />
        <View style={styles.inputsContainer}>
          <FormInfoInput
            description="한글 이름"
            isRequired={true}
            name="KoreanName"
            placeholder="ex) 최민석"
            rules={{
              required: "Name is required",
            }}
            secureTextEntry={false}
            subtitle1=""
            subtitle2=""
            controller={control}
          />
          <FormInfoInput
            description="이메일 / Email"
            isRequired={true}
            name="Email"
            placeholder="example@u.nus.edu"
            rules={{
              required: "Email is required",
            }}
            secureTextEntry={false}
            subtitle1="본인의 개인 이메일을 적어주세요!"
            subtitle2=""
            controller={control}
          />
          <FormInfoInput
            description="비밀 번호 / Password"
            isRequired={true}
            name="Password"
            placeholder=""
            rules={{
              required: "Password is required",
            }}
            secureTextEntry={true}
            subtitle1="강력한 비밀번호를 입력해주세요!"
            subtitle2=""
            controller={control}
          />
        </View>
        <View style={{ alignSelf: "center", top: 50 }}>
          <CustomButton
            isDark={true}
            text="Sign Up!"
            handlePress={handleSubmit(handleSignUp)}
          />
        </View>
        {/* Blank space for better scrolling and finding the button at the bottom */}
        <View style={{ height: 100, backgroundColor: "white" }}></View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default Others;

const styles = StyleSheet.create({
  icon: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 27,
    left: 25,
  },
  inputsContainer: {
    marginTop: "46%",
  },
  radioButton: {
    width: 17,
    height: 17,
    borderRadius: 17,
    marginTop: 4,
  },
  genderLabel: {
    fontSize: 13,
    marginTop: 4,
    left: -6,
  },
});
