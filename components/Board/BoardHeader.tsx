import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { FontAwesome, Feather } from "@expo/vector-icons";

const BoardHeader = () => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.title}>신입생 게시판</Text>
        <FontAwesome
          name="sort-down"
          size={24}
          color="black"
          style={{ marginLeft: 10, top: -3 }}
        />
      </View>
      <Feather name="edit" size={24} color="black" />
    </View>
  );
};

export default BoardHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
  },
});
