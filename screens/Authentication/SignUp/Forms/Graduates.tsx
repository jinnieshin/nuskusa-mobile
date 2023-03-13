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
import * as DocumentPicker from "expo-document-picker";
import { sha512 } from "js-sha512";

function Graduates({ navigation }: { navigation: any }): JSX.Element {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [gender, setGender] = useState<string>(""); // m: male, f: female, o: others
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<any>();

  const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const date = new Date();

  const name = watch("Name");
  const email = watch("Email");
  const password = watch("Password");
  const major = watch("Major");
  const yearOfAdmission = watch("YearOfAdmission");
  const yearOfBirth = watch("YearOfBirth");
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
    const userObject = {
      email,
      name,
      verified: false,
      gender: gender == "m" ? "Male" : gender == "f" ? "Female" : "Others",
      major,
      kakaoTalkId,
      role: "Graduated",
      verificationFileUrl: undefined,
      password: sha512(password).toString(),
    };
    setLoading(true);
    try {
      const ref = email + "(" + name + ")" + file.name;
      const url =
        process.env.REACT_APP_HOST +
        "/api/auth/uploadVerificationDocument/" +
        ref;
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch(url, {
        method: "PUT",
        body: formData,
      });
      if (response.status !== 200) {
        setLoading(false);
        Alert.alert("프로필 생성에 실패했습니다: " + response.body);
      }

      const signUpUrl = process.env.REACT_APP_HOST + "/api/auth/signup";
      const signUpResponse = await fetch(signUpUrl, {
        method: "POST",
        body: JSON.stringify(userObject),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (signUpResponse.status == 200) {
        setLoading(false);
        Alert.alert(
          "프로필 생성이 완료되었습니다. 입력하신 NUS 이메일로 보내드린 메일의 링크를 클릭하셔서 이메일 인증을 완료해주세요! \n\n 이메일이 오지 않는다면 Junk 폴더를 확인해주세요!"
        );
      } else {
        setLoading(false);
        Alert.alert("프로필 생성에 실패했습니다: " + signUpResponse.body);
      }
    } catch (error) {
      Alert.alert(error.code + error.message);
    } finally {
      navigation.navigate("congrats");
    }
  };

  const handleFileSubmit = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
        multiple: false,
        type: ["application/pdf", "image/jpg", "image/jpeg", "image/png"],
      });
      if (res.type !== "cancel") {
        if (file.size > 1048576 * 5) {
          Alert.alert(
            "파일 크기는 5MB 이하여야 합니다. 파일 업로드를 취소합니다."
          );
          return;
        }
        setFile(res);
      }
    } catch (error) {
      Alert.alert(error.message);
    } finally {
      console.log("file uploaded");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ backgroundColor: "white" }}
    >
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <FormHeader studentType="졸업생" />
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
            description="최종 졸업 학과 / Final Major & Minor"
            isRequired={true}
            name="Major"
            placeholder="ex) Computer Science Course with Minor in       
            Entrepreneurship"
            rules={{
              required: "Final Major & Minor is required",
            }}
            secureTextEntry={false}
            subtitle1="졸업증명서에 기재된 대로 적어주세요!"
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
            subtitle1=""
            subtitle2=""
            controller={control}
          />
          {/* 졸업증명서 제출 */}
          <TouchableOpacity
            style={{ flexDirection: "row", marginTop: 10 }}
            onPress={handleFileSubmit}
          >
            <Text
              style={{ fontSize: 15, fontWeight: "700", alignItems: "center" }}
            >
              {" "}
              졸업증명서 제출{" "}
            </Text>
            <Feather
              name="file-plus"
              size={28}
              color="black"
              style={{ top: -5 }}
            />
          </TouchableOpacity>
          {file && (
            <Text style={{ color: "grey" }}>{file.name.slice(0, 40)}</Text>
          )}

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

export default Graduates;

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
