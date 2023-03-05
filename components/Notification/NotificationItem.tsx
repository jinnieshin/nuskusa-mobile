import { StyleSheet } from "react-native";
import { View, Text } from "../Themed";
import React from "react";

const NotificationItem = ({ data }: { data: any }) => {
  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <Text style={styles.boardText}>HOT</Text>
        <Text style={styles.timeText}>{"    "}9분 전</Text>
      </View>
      <View style={styles.lowerContainer}>
        <Text style={styles.message}>
          내 게시글이 HOT 게시글로 선정되었습니다.
        </Text>
      </View>
    </View>
  );
};

export default NotificationItem;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: "#0B121C5C",
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 13,
    height: 67,
    padding: 7,
    justifyContent: "space-evenly",
  },
  upperContainer: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    alignItems: "baseline",
  },
  lowerContainer: {
    backgroundColor: "#F3F4F6",
    maxHeight: 40,
  },
  boardText: {
    fontSize: 14,
    fontWeight: "700",
  },
  timeText: {
    fontSize: 9,
  },
  message: {
    fontSize: 12,
  },
});
