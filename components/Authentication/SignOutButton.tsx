import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React from "react";
//@ts-ignore
import { REACT_APP_HOST } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignOutButton = ({ navigation }: { navigation: any }) => {
  const handleSignOut = async () => {
    try {
      const url = REACT_APP_HOST + "/api/auth/signout";
      const response = await fetch(url, {
        method: "POST",
      });
      if (response.status == 200) {
        navigation.navigate("LoginScreen");
        await AsyncStorage.removeItem("userObject");
        await AsyncStorage.removeItem("userPassword");
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
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSignOut}>
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignOutButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
  },
});
