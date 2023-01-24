import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/features/user";
//@ts-ignore
import { REACT_APP_HOST } from "@env";

type Props = {
  navigation: any;
  canChangeEmail: boolean;
  name: string;
  major: string;
  email: string;
  yearOfAdmission: string;
  yearOfBirth: number;
  gender: string;
};

const EditInfoSection = ({
  navigation,
  canChangeEmail,
  name,
  major,
  email,
  yearOfAdmission,
  yearOfBirth,
  gender,
}: Props) => {
  const [majorInput, setMajorInput] = useState<string>(major);
  const [emailInput, setEmailInput] = useState<string>(email);
  const userdata = useSelector((state: any) => state.user.value);
  const dispatch = useDispatch();

  const handleConfirm = async () => {
    if (majorInput == "") {
      navigation.goBack();
      return;
    }
    if (emailInput == "") {
      navigation.goBack();
      return;
    }
    try {
      if (canChangeEmail && emailInput != email) {
        // If user can change the email (freshmen), and he/she did change the email
        if (emailInput.split("@")[1] != "u.nus.email") {
          Alert.alert(
            "@u.nus.edu로 끝나는 NUS 이메일이 아닙니다. 다시 입력해주세요."
          );
          return;
        }
        // const url = process.env.REACT_APP_HOST + "/api/profile/editProfile/" + email;
        const url = REACT_APP_HOST + "/api/profile/editProfile/" + email;
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            email: emailInput,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status == 200) {
          Alert.alert(
            "이메일 변경이 성공적으로 완료되었습니다. 입력하신 이메일로 인증 메일을 보내드렸습니다. 메일의 링크를 눌러 이메일 주소를 인증해주세요! 재학생으로 처리됩니다."
          );
          const logoutUrl = REACT_APP_HOST + "/api/auth/signout";
          const logoutResponse = await fetch(logoutUrl, {
            method: "POST",
            redirect: "follow",
          });
          navigation.navigate("LoginScreen");
        } else if (response.status == 400) {
          Alert.alert("인증 이메일을 보내지 못했습니다.");
        } else if (response.status == 409) {
          Alert.alert("변경을 신청하신 이메일로 계정이 이미 존재합니다.");
        } else {
          Alert.alert("이메일 변경을 실패했습니다.");
        }
      }
      if (majorInput != major) {
        //TODO: Test - change both email and major at the same time
        const url = REACT_APP_HOST + "/api/profile/editProfile/" + emailInput;
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            major: majorInput,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status == 200) {
          dispatch(setUser({ ...userdata, major: majorInput }));
          Alert.alert("전공을 성공적으로 변경했습니다.");
        } else {
          Alert.alert("전공 변경 중 오류가 발생했습니다.");
        }
      }
    } catch (error) {
      Alert.alert(error.code + error.message);
    } finally {
      navigation.goBack();
      console.log("Profile edited");
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <View style={styles.labelContainer}>
            <Text style={styles.labelCantChange}>성명</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoCantChange}>{name}</Text>
          </View>
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>전공</Text>
          </View>
          <View style={styles.infoContainer}>
            <TextInput
              style={styles.inputField}
              defaultValue={major}
              placeholder="ex) Mechanical Engineering"
              onChangeText={(newText) => setMajorInput(newText)}
            />
          </View>
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.labelContainer}>
            <Text
              style={canChangeEmail ? styles.label : styles.labelCantChange}
            >
              이메일
            </Text>
          </View>
          <View style={styles.infoContainer}>
            {canChangeEmail ? (
              <TextInput
                style={styles.inputField}
                defaultValue={email}
                placeholder="ex) example@u.nus.edu"
                onChangeText={(newText) => setEmailInput(newText)}
              />
            ) : (
              <Text style={styles.infoCantChange}>{email}</Text>
            )}
          </View>
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.labelContainer}>
            <Text style={styles.labelCantChange}>입학 연도</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoCantChange}>{yearOfAdmission}</Text>
          </View>
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.labelContainer}>
            <Text style={styles.labelCantChange}>출생 연도</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoCantChange}>{yearOfBirth}년</Text>
          </View>
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.labelContainer}>
            <Text style={styles.labelCantChange}>성별</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoCantChange}>
              {gender == "Male" ? "남" : gender == "Female" ? "여" : "기타"}
            </Text>
          </View>
        </View>
      </View>
      {/* Edit Profile Button */}
      <TouchableOpacity
        style={{ alignItems: "center", marginTop: 80 }}
        onPress={handleConfirm}
      >
        <View style={styles.confirmButtonContainer}>
          <Text style={styles.label}>Confirm</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default EditInfoSection;

const { width, height } = Dimensions.get("window");

const isSmallPhone: boolean = height < 700;

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    height: 280,
    backgroundColor: "#e7e8e9",
    paddingHorizontal: 15,
    justifyContent: "space-evenly",
    marginTop: 30,
  },
  rowContainer: {
    flexDirection: "row",
    backgroundColor: "#e7e8e9",
    alignItems: "center",
  },
  labelContainer: {
    backgroundColor: "#e7e8e9",
    flex: 0.28,
  },
  infoContainer: {
    backgroundColor: "#e7e8e9",
    flex: 0.72,
  },
  labelCantChange: {
    fontSize: 15,
    fontWeight: "700",
    color: "#BDBDBD",
  },
  label: {
    fontSize: 15,
    fontWeight: "700",
  },
  infoCantChange: {
    fontSize: 14,
    color: "#BDBDBD",
  },
  info: {
    fontSize: 14,
  },
  inputField: {
    borderWidth: 1,
    height: 40,
    paddingHorizontal: 7,
    fontSize: 14,
  },
  confirmButtonContainer: {
    backgroundColor: "#D9D9D9",
    width: width * 0.9,
    height: 41,
    justifyContent: "center",
    alignItems: "center",
  },
});
