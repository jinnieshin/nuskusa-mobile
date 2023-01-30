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

function CurrentStudents({ navigation }: { navigation: any }): JSX.Element {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const date = new Date();

  const [gender, setGender] = useState<string>(""); // m: male, f: female, o: others
  const [loading, setLoading] = useState<boolean>(false);

  const name = watch("Name");
  const email = watch("Email");
  const password = watch("Password");
  const major = watch("Major");
  const yearOfBirth = watch("YearOfBirth");
  const yearOfAdmission = watch("YearOfAdmission");
  const kakaoTalkId = watch("KakaoID");

  const handleMale = () => {
    setGender("m");
  };
  const handleFemale = () => {
    setGender("f");
  };

  const handleOthers = () => {
    setGender("o");
  };

  const handleSignUp = async () => {
    if (gender == "") {
      Alert.alert("Please select your gender");
    }
    if (
      parseInt(yearOfAdmission.split("/")[0]) >
        parseInt(JSON.stringify(date).slice(1, 5)) ||
      parseInt(yearOfAdmission.split("/")[0]) <
        parseInt(JSON.stringify(date).slice(1, 5)) - 10 ||
      parseInt(yearOfAdmission.split("/")[0]) !==
        parseInt(yearOfAdmission.split("/")[1]) - 1
    ) {
      Alert.alert(
        "입학년도 입력형식이 잘못되었습니다. 수정 후 다시 제출해주세요!"
      );
      return;
    }
    setLoading(true);
    const userObject = {
      email,
      name,
      verified: true,
      gender: gender == "m" ? "Male" : gender == "f" ? "Female" : "Others",
      major,
      kakaoTalkId,
      enrolledYear: yearOfAdmission,
      yearOfBirth,
      role: "Current",
      password: sha512(password).toString(),
    };
    try {
      const url = process.env.REACT_APP_HOST + "/api/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(userObject),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status == 200) {
        Alert.alert(
          "프로필 생성이 완료되었습니다. 입력하신 NUS 이메일로 보내드린 메일의 링크를 클릭하셔서 이메일 인증을 완료해주세요! \n\n 이메일이 오지 않는다면 Junk 폴더를 확인해주세요!"
        );
        setLoading(false);
      } else {
        setLoading(false);
        Alert.alert("프로필 생성에 실패했습니다: " + response.body);
      }
    } catch (error) {
      Alert.alert(error.code + error.message);
    } finally {
      navigation.navigate("congrats");
    }
  };

  const EMAIL_REGEX_NUS =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(u.nus.edu)$/;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <FormHeader studentType="재학생" />
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
              pattern: {
                value: EMAIL_REGEX_NUS,
                message: "Please enter your NUS email (ends with @u.nus.edu)",
              },
            }}
            secureTextEntry={false}
            subtitle1="NUS이메일을 사용하시면 자동으로 재학생 처리해드려요!"
            subtitle2="개인 이메일 사용시 추후에 NUS이메일로 변경하시면 재학생 처리됩니다."
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

          {/* Gender selection section */}
          <View style={{ flexDirection: "row", marginBottom: 40 }}>
            {/* Form label section */}
            <View style={{ flexDirection: "row", flex: 0.45 }}>
              <Text
                style={{ color: "#E12B2B", fontSize: 15, fontWeight: "700" }}
              >
                *{" "}
              </Text>
              <Text style={{ fontSize: 15, fontWeight: "700" }}>
                성별 / Gender
              </Text>
            </View>
            {/* Radio Buttons section */}
            <View
              style={{
                flexDirection: "row",
                flex: 0.55,
                justifyContent: "space-between",
              }}
            >
              <TouchableWithoutFeedback onPress={handleMale}>
                <View
                  style={[
                    styles.radioButton,
                    { backgroundColor: gender === "m" ? "#bda06d" : "#D9D9D9" },
                  ]}
                />
              </TouchableWithoutFeedback>
              <Text style={styles.genderLabel}>남</Text>
              <TouchableWithoutFeedback onPress={handleFemale}>
                <View
                  style={[
                    styles.radioButton,
                    { backgroundColor: gender === "f" ? "#bda06d" : "#D9D9D9" },
                  ]}
                />
              </TouchableWithoutFeedback>
              <Text style={styles.genderLabel}>여</Text>
              <TouchableWithoutFeedback onPress={handleOthers}>
                <View
                  style={[
                    styles.radioButton,
                    { backgroundColor: gender === "o" ? "#bda06d" : "#D9D9D9" },
                  ]}
                />
              </TouchableWithoutFeedback>
              <Text style={styles.genderLabel}>기타</Text>
            </View>
          </View>
          <FormInfoInput
            description="학과 / Major"
            isRequired={true}
            name="Major"
            placeholder="ex) Computer Science Course with Minor in       
            Entrepreneurship"
            rules={{
              required: "Major is required",
            }}
            secureTextEntry={false}
            subtitle1="입학증명서에 기재된 대로 적어주세요!"
            subtitle2=""
            controller={control}
          />
          <FormInfoInput
            description="입학 연도 / Year of Admission"
            isRequired={true}
            name="YearOfAdmission"
            placeholder="ex) 2021/2022"
            rules={{
              required: "Year of Admission is required",
            }}
            secureTextEntry={false}
            subtitle1=""
            subtitle2=""
            controller={control}
          />
          <FormInfoInput
            description="출생 연도 / Year of Birth"
            isRequired={true}
            name="YearOfBirth"
            placeholder="ex) 2003"
            rules={{
              required: "Year of Birth is required",
              min: {
                value: parseInt(JSON.stringify(date).slice(1, 5)) - 29,
                message: "Please enter a valid Year of Birth",
              },
              max: {
                value: parseInt(JSON.stringify(date).slice(1, 5)) - 15,
                message: "Please enter a valid Year of Birth",
              },
            }}
            secureTextEntry={false}
            subtitle1=""
            subtitle2=""
            controller={control}
          />
          <FormInfoInput
            description="카카오톡 ID / KakaoTalk ID"
            isRequired={false}
            name="KakaoID"
            placeholder="ex) gildong123"
            rules={{}}
            secureTextEntry={false}
            subtitle1="본인의 카카오톡ID를 적어주세요!"
            subtitle2=""
            controller={control}
          />

          <View style={{ alignSelf: "center", top: 50 }}>
            <CustomButton
              isDark={true}
              text="Sign Up!"
              handlePress={handleSubmit(handleSignUp)}
            />
          </View>
        </View>
        {/* Blank space for better scrolling and finding the button at the bottom */}
        <View style={{ height: 100 }}></View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default CurrentStudents;

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
