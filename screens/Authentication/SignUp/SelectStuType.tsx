import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  Dimensions,
} from "react-native";
import { View, Text } from "../../../components/Themed";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import StudentTypeButton from "../../../components/Authentication/StudentTypeButton";

const SelectStuType = ({ navigation }: { navigation: any }) => {
  const handleFreshmen = () => {
    navigation.navigate("Freshmen");
  };

  const handleCurrentStudents = () => {
    navigation.navigate("CurrentStudents");
  };
  const handleGraduates = () => {
    navigation.navigate("Graduates");
  };
  const handleOthers = () => {
    navigation.navigate("Others");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="black" />
      </TouchableOpacity>
      <Image
        source={require("../../../assets/images/nusks-logo.png")}
        style={styles.logo}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Sign Up to Join!</Text>
      </View>
      <View style={styles.lowerContainer}>
        <View style={{ flexDirection: "row" }}>
          <StudentTypeButton
            title="신입생"
            subtitle1="1학년 분들은 여기로 오세요!"
            subtitle2=""
            handlePress={handleFreshmen}
          />
          <StudentTypeButton
            title="재학생"
            subtitle1="NUS가 익숙하신 2학년"
            subtitle2="이상 분들은 여기로!"
            handlePress={handleCurrentStudents}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <StudentTypeButton
            title="졸업생"
            subtitle1="NUS를 졸업하신 분들을"
            subtitle2="환영합니다!"
            handlePress={handleGraduates}
          />
          <StudentTypeButton
            title="일반 회원"
            subtitle1="기타 가입은 이쪽입니다!"
            subtitle2=""
            handlePress={handleOthers}
          />
        </View>
      </View>
    </View>
  );
};

export default SelectStuType;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
  icon: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 27,
    left: 25,
  },
  logo: {
    width: 159,
    height: 160,
    top: 123,
  },
  titleContainer: {
    top: 145,
    alignItems: "center",
  },
  title: {
    fontFamily: Platform.OS === "ios" ? "Arial" : "Roboto",
    fontSize: 24,
    fontWeight: "700",
  },
  lowerContainer: {
    top: height * 0.23,
  },
});
