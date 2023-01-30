import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import Banner from "../../../components/Banner";
import { useSelector, useDispatch } from "react-redux";
import EditInfoSection from "../../../components/Profile/EditInfoSection";

const EditProfileScreen = ({ navigation }: { navigation: any }) => {
  const userdata = useSelector((state: any) => state.user.value);
  const canChangeEmail = userdata?.email.split("@")[1] != "u.nus.edu";
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View>
        <Banner iconLeft="arrow-back" iconRight="" navigation={navigation} />
        <View style={styles.secondBody}>
          {userdata.profileImageUrl == "" ? (
            <View style={styles.emptyLogo}></View>
          ) : (
            <Image
              style={styles.logo}
              source={{ uri: userdata.profileImageUrl }}
            />
          )}
          <Text style={styles.editTextButton}>프로필 사진 바꾸기</Text>
          <EditInfoSection
            navigation={navigation}
            yearOfBirth={userdata.yearOfBirth}
            yearOfAdmission={userdata.enrolledYear}
            major={userdata.major}
            canChangeEmail={canChangeEmail}
            email={userdata.email}
            name={userdata.name}
            gender={userdata.gender}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  secondBody: {
    marginTop: 60,
    alignItems: "center",
  },
  emptyLogo: {
    width: 146,
    height: 146,
    borderRadius: 146,
    backgroundColor: "#D9D9D9",
  },
  logo: {
    width: 146,
    height: 146,
    borderRadius: 146,
  },
  editTextButton: {
    fontSize: 15,
    fontWeight: "700",
    marginTop: 15,
  },
});
