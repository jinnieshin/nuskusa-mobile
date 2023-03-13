import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

const StartScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/nusks-logo.png")}
        style={styles.image}
      />
    </View>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    top: -13,
    width: 195,
    height: 195,
  },
});
