import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

const Buttons = ({
  handleSignOut,
  handleResetPassword,
}: {
  handleSignOut: any;
  handleResetPassword: any;
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.subContainer}
        onPress={handleResetPassword}
      >
        <Text style={styles.buttonText}>비밀번호 변경</Text>
      </TouchableOpacity>

      <Text style={{ fontSize: 16 }}>|</Text>

      <TouchableOpacity style={styles.subContainer} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Buttons;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
  subContainer: {
    alignItems: "center",
    flex: 0.5,
  },
  buttonText: {
    fontSize: 15,
  },
});
