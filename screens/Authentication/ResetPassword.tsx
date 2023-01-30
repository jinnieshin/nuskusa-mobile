import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import React from "react";
import CustomButton from "../../components/Authentication/CustomButton";
import TextInputBox from "../../components/Authentication/TextInputBox";
import { useForm } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";

const ResetPassword = ({ navigation }: { navigation: any }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <View style={styles.container}>
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subtext}>
            이메일을 제출해주시면 {"\n"}비밀번호 변경 관련 이메일이 전송됩니다.
          </Text>
          <View style={styles.formContainer}>
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
              placeholder="한글 이름 / Name in Korean"
              controller={control}
              name="NameKorean"
              secureTextEntry={false}
              rules={{
                required: "Email is required",
              }}
            />
            <TextInputBox
              placeholder="출생 연도 / Year of Birth (ex. 2002)"
              controller={control}
              name="YearOfBirth"
              secureTextEntry={false}
              rules={{
                required: "Email is required",
              }}
            />
          </View>
          <CustomButton
            isDark={true}
            text="Submit"
            handlePress={handleSubmit}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    top: 170,
  },
  icon: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 27,
    left: 25,
  },
  title: {
    fontFamily: Platform.OS === "ios" ? "Arial" : "Roboto",
    fontSize: 27,
    fontWeight: "700",
  },
  subtext: {
    fontSize: 13,
    textAlign: "center",
    marginTop: 15,
  },
  formContainer: {
    marginTop: 70,
    marginBottom: 35,
  },
});
