import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import React from "react";

const FormHeader = ({ studentType }: { studentType: string }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/nusks-logo.png")}
        style={styles.logo}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{studentType} 회원가입</Text>
      </View>
    </View>
  );
};

export default FormHeader;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },

  logo: {
    width: 75,
    height: 75,
    top: 123,
  },
  titleContainer: {
    top: 145,
    alignItems: "center",
  },
  title: {
    fontFamily: Platform.OS === "ios" ? "Arial" : "Roboto",
    fontSize: 26,
    fontWeight: "800",
  },
});
