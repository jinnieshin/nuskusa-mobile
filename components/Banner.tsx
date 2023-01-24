import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

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
    navigation.toggleDrawer();
  };

  const handleNotification = () => {
    console.log("Handle noti");
  };
  return (
    <SafeAreaView style={{ backgroundColor: "black", height: 44 }}>
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

        {iconRight ? (
          <TouchableOpacity onPress={handleNotification}>
            <Ionicons name={iconRight} size={26} color="white" />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 20, height: 20 }}></View> // This is for 'none'
        )}
      </View>
    </SafeAreaView>
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
  },
  text: {
    color: "#BCA06D",
    fontSize: 25,
    fontWeight: "700",
  },
});
