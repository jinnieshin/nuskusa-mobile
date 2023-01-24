import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";

type InfoProps = {
  email: string;
  yearOfAdmission: string;
  yearOfBirth: number;
  gender: string;
};

const Info = ({ email, yearOfAdmission, yearOfBirth, gender }: InfoProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>이메일</Text>
        <Text style={styles.label}>입학 연도</Text>
        <Text style={styles.label}>출생 연도</Text>
        <Text style={styles.label}>성별</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.info}>{email}</Text>
        <Text style={styles.info}>{yearOfAdmission}</Text>
        <Text style={styles.info}>{yearOfBirth}년</Text>
        <Text style={styles.info}>
          {gender == "Male" ? "남" : gender == "Female" ? "여" : "기타"}
        </Text>
      </View>
    </View>
  );
};

export default Info;
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    height: 165,
    backgroundColor: "#F3F4F6",
    alignSelf: "center",
    padding: 17,
    flexDirection: "row",
  },
  labelContainer: {
    justifyContent: "space-between",
    flex: 0.3,
  },
  label: {
    fontSize: 15,
    fontWeight: "700",
  },
  infoContainer: {
    justifyContent: "space-between",
    flex: 0.7,
  },
  info: {
    fontSize: 14,
    top: -2,
  },
});
