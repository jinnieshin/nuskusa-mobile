import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";

const Pinned = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.pinned}>Pinned</Text>
      <Text style={styles.content}>신입생 게시판 안내</Text>
    </View>
  );
};

export default Pinned;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    height: 32,
    backgroundColor: "#e6e7e8",
    alignSelf: "center",
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    marginBottom: 15,
  },
  pinned: {
    fontWeight: "700",
    flex: 0.2,
  },
  content: {
    fontSize: 12,
    flex: 0.8,
  },
});
