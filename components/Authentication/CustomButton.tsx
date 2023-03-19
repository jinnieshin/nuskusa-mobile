import {
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";
import { View, Text } from "../Themed";
import React from "react";

const CustomButton = ({
  handlePress,
  isDark,
  text,
}: {
  handlePress: any;
  isDark: boolean;
  text: string;
}) => {
  return (
    <TouchableOpacity onPress={handlePress}>
      <View
        style={[
          styles.container,
          { backgroundColor: isDark ? "#D9D9D9" : "#eaebec" },
        ]}
      >
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: width * 0.85,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    fontFamily: Platform.OS === "ios" ? "Arial" : "Roboto",
    fontWeight: "700",
    fontSize: 17,
    color: "black"
  },
});
