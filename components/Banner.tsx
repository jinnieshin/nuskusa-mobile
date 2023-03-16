import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { getStatusBarHeight } from "react-native-status-bar-height";

const Banner = ({
  navigation,
  iconLeft,
  iconRight,
}: {
  navigation: any;
  iconLeft: any;
  iconRight: any;
}) => {
  const handleBack = () => {
    navigation.goBack();
  };

  const handleMenu = () => {
    navigation.getParent("LeftDrawer").toggleDrawer();
  };

  const handleNotification = () => {
    navigation.getParent("RightDrawer").toggleDrawer();
  };
  return (
    <View style={{ backgroundColor: "black" }}>
      <StatusBar style="light" />
      <View style={styles.container}>
        {/* icons: menu, notification, navigateBack, or none */}
        {iconLeft ? (
          <TouchableOpacity
            onPress={iconLeft == "menu" ? handleMenu : handleBack}
          >
            <Ionicons name={iconLeft} size={28} color="white" />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 20, height: 20 }}></View> // This is for 'none'
        )}
        <Text style={styles.text}>NUSKS</Text>

        {/* Removed notification feature for now */}
        {/* {iconRight ? ( */}
        {false ? (
          <TouchableOpacity onPress={handleNotification}>
            {/* <Ionicons name={iconRight} size={26} color="white" /> */}
          </TouchableOpacity>
        ) : (
          <View style={{ width: 20, height: 20 }}></View> // This is for 'none'
        )}
      </View>
      <View style={{ height: 13, backgroundColor: "white" }} />
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  container: {
    height: 55,
    backgroundColor: "black",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 21,
    marginTop: getStatusBarHeight(),
  },
  text: {
    color: "#BCA06D",
    fontSize: 25,
    fontWeight: "700",
  },
});
