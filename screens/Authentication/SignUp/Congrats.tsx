import { View, Text, StyleSheet, Image, Platform } from "react-native";
import React from "react";
import CustomButton from "../../../components/Authentication/CustomButton";

const Congrats = ({ navigation }: { navigation: any }) => {
  const handleLogin = () => {
    navigation.navigate("LoginScreen");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/images/nusks-logo.png")}
        style={styles.logo}
      />
      <Text style={styles.logInText}>Congratulations!</Text>
      <View style={{ top: "50%" }}>
        <Text style={styles.subtitle}>프로필 생성이 완료되었습니다.</Text>
        <Text style={styles.subtitle}>
          보내드린 이메일의 링크를 눌러 본인 인증을 완료해{"\n"}
          계정을 활성화시켜주세요.
        </Text>
        <Text style={styles.subtitle}>
          이메일이 오지 않는다면 스팸함을 확인해주세요!
        </Text>
      </View>
      <View style={{ top: "70%" }}>
        <CustomButton isDark={true} text="Log In" handlePress={handleLogin} />
      </View>
    </View>
  );
};

export default Congrats;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },

  logo: {
    // position: "absolute",
    width: 159,
    height: 160,
    top: 179,
  },

  logInText: {
    fontFamily: Platform.OS === "ios" ? "Arial" : "Roboto",
    color: "Black",
    fontWeight: "700",
    lineHeight: "80%",
    fontSize: 27,
    fontStyle: "normal",
    top: 184,
  },
  subtitle: {
    textAlign: "center",
    marginTop: 30,
  },
});
