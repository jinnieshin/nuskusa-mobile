import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { DrawerItem } from "@react-navigation/drawer";
import Badge from "./Badge";
import MyPageButton from "./MyPageButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/user";
//@ts-ignore
import { REACT_APP_HOST } from "@env";

const Drawer = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch();

  const initialState = {
    name: "",
    email: "",
    role: "", // User, Registered, Freshmen, Current, Graduated, Admin
    enrolledYear: "",
    major: "",
    faculty: "",
    profileImageUrl: "",
    gender: "",
    yearOfBirth: "",
    kakaoTalkId: "",
  };

  const handleLogOut = async () => {
    try {
      const url = REACT_APP_HOST + "/api/auth/signout";
      const response = await fetch(url, {
        method: "POST",
      });
      if (response.status == 200) {
        dispatch(setUser(initialState));
      } else {
        Alert.alert("로그아웃 중 오류가 발생했습니다: " + response.body);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      console.log("SIGNED OUT");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Badge />
        <MyPageButton navigation={navigation} />
        <View style={[styles.line, { marginTop: 25 }]} />
        <TouchableOpacity style={styles.textContainer}>
          <Text style={styles.buttonText}>공지사항</Text>
        </TouchableOpacity>

        <View style={styles.line} />

        <TouchableOpacity style={styles.textContainer}>
          <Text style={styles.buttonText}>HOT 게시판</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.textContainer}>
          <Text style={styles.buttonText}>자유게시판</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.textContainer}>
          <Text style={styles.buttonText}>신입생 게시판</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.textContainer}>
          <Text style={styles.buttonText}>졸업생 게시판</Text>
        </TouchableOpacity>

        <View style={styles.line} />

        <TouchableOpacity style={styles.textContainer}>
          <Text style={styles.buttonText}>벼룩시장</Text>
        </TouchableOpacity>

        <View style={styles.line} />

        <TouchableOpacity style={styles.textContainer}>
          <Text style={styles.buttonText}>취업/인턴</Text>
        </TouchableOpacity>

        <View style={styles.line} />
      </View>

      <TouchableOpacity onPress={handleLogOut}>
        <Text style={styles.logOutText}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Drawer;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
    backgroundColor: "#F3F4F6",
    justifyContent: "space-between",
  },
  line: {
    width: width * 0.62,
    borderBottomWidth: 1,
    alignSelf: "center",
    borderBottomColor: "#0B121C5C",
    marginBottom: 18,
  },
  textContainer: {
    justifyContent: "center",
    paddingLeft: 30,
    marginBottom: 18,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
  },
  logOutText: {
    fontSize: 15,
    paddingLeft: 30,
  },
});
