import { StyleSheet, TouchableOpacity, Dimensions, Alert } from "react-native";

import { Text, View } from "../../../components/Themed";
import Banner from "../../../components/Banner";
import { useDispatch, useSelector } from "react-redux";
import SignOutButton from "../../../components/Authentication/SignOutButton";
import Badge from "../../../components/Profile/Badge";
import Info from "../../../components/Profile/Info";
import Buttons from "../../../components/Profile/Buttons";
import { setUser } from "../../../redux/features/user";
//@ts-ignore
import { REACT_APP_HOST } from "@env";

export default function ProfileScreen({ navigation }: { navigation: any }) {
  const userdata = useSelector((state: any) => state.user.value);
  const dispatch = useDispatch();
  console.log("USERDATA: ", userdata);

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

  const handleSignOut = async () => {
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

  const handleResetPassword = () => {
    navigation.navigate("ResetPassword");
  };

  const handleEditProfile = () => {
    navigation.navigate("EditProfileScreen");
  };
  return (
    <View style={styles.container}>
      <Banner
        iconLeft="menu"
        iconRight="ios-notifications-outline"
        navigation={navigation}
      />
      <View style={styles.secondBody}>
        <View>
          {/* <SignOutButton navigation={navigation} /> */}
          <View style={{ marginBottom: 40 }}>
            <Badge />
          </View>
          <Info
            email={userdata.email}
            gender={userdata.gender}
            yearOfAdmission={userdata.enrolledYear}
            yearOfBirth={userdata.yearOfBirth}
          />
          {/* Edit Profile Button */}
          <TouchableOpacity
            style={{ alignItems: "center", marginTop: 25 }}
            onPress={handleEditProfile}
          >
            <View style={styles.editProfileButtonContainer}>
              <Text style={styles.buttonText}>프로필 편집</Text>
            </View>
          </TouchableOpacity>
          {/* Reset password and log out buttons */}
        </View>
        <View style={styles.logOutButtonContainer}>
          <Buttons
            handleSignOut={handleSignOut}
            handleResetPassword={handleResetPassword}
          />
        </View>
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  secondBody: {
    marginVertical: 60,
  },
  editProfileButtonContainer: {
    backgroundColor: "#D9D9D9",
    width: width * 0.9,
    height: 41,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "700",
    fontSize: 15,
  },
  logOutButtonContainer: {
    marginTop: "50%",
  },
});
