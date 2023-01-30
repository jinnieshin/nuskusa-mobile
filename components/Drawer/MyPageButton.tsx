import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";

const MyPageButton = ({ navigation }: { navigation: any }) => {
  const handleMyPagePress = () => {
    navigation.navigate("Main", { screen: "Profile" });
  };
  return (
    <TouchableOpacity onPress={handleMyPagePress}>
      <View style={styles.container}>
        <Text style={styles.buttonText}>마이페이지</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MyPageButton;
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    width: width * 0.62,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D9D9D9",
    alignSelf: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "700",
  },
});
