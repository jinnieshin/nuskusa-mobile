import { StyleSheet, TouchableOpacity, Image, Platform } from "react-native";
import { View, Text } from "../../../components/Themed";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../../../components/Authentication/CustomButton";

const AgreementScreen = ({ navigation }: { navigation: any }) => {
  const handleAgree = () => {
    navigation.navigate("SelectStuType");
  };

  const handleBackToLogin = () => {
    navigation.navigate("LoginScreen");
  };

  const handleDisagree = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="black" />
      </TouchableOpacity>
      <Image
        source={require("../../../assets/images/nusks-logo.png")}
        style={styles.logo}
      />
      <View style={styles.bottomContainer}>
        <Text style={styles.title}>Sign Up to Join!</Text>
        <Text style={styles.subtitle}>
          NUS 한인회 사이트에 가입하시고 승인 받으시면 {"\n"}
          게시판의 더 많은 정보에 접속할 수 있습니다.
        </Text>
        <Text style={styles.agreementText}>
          서비스 이용 약관, 개인정보 수집 및 활용 약관에 동의합니다.{"\n"}I
          agree with Terms of Service and Privacy Policy.
        </Text>
        <TouchableOpacity>
          <Text style={styles.agreementLink}>이용 약관 전문 보기</Text>
        </TouchableOpacity>

        <View style={styles.agreeButton}>
          <CustomButton isDark={true} text="Agree" handlePress={handleAgree} />
          <CustomButton
            isDark={false}
            text="Disagree"
            handlePress={handleDisagree}
          />
          <TouchableOpacity
            style={{ marginTop: "7%" }}
            onPress={handleBackToLogin}
          >
            <Text style={styles.toLogin}>
              계정이 이미 있으신가요? 여기를 눌러 로그인하세요!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AgreementScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
  icon: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 27,
    left: 25,
  },
  logo: {
    width: 159,
    height: 160,
    top: 123,
  },
  bottomContainer: {
    top: 145,
    alignItems: "center",
  },
  title: {
    fontFamily: Platform.OS === "ios" ? "Arial" : "Roboto",
    fontSize: 24,
    fontWeight: "700",
  },
  subtitle: {
    fontFamily: Platform.OS === "ios" ? "Arial" : "Roboto",
    fontSize: 13,
    fontWeight: "400",
    textAlign: "center",
    marginTop: "5%",
  },
  agreementText: {
    fontFamily: Platform.OS === "ios" ? "Arial" : "Roboto",
    fontSize: 12,
    fontWeight: "400",
    textAlign: "center",
    marginTop: "24%",
  },
  agreementLink: {
    fontFamily: Platform.OS === "ios" ? "Arial" : "Roboto",
    fontSize: 13,
    textDecorationLine: "underline",
    fontWeight: "700",
    marginTop: "5%",
  },
  agreeButton: {
    marginTop: "17%",
  },
  toLogin: {
    fontFamily: Platform.OS === "ios" ? "Arial" : "Roboto",
    fontSize: 12,
    textAlign: "center",
    fontWeight: "400",
    textDecorationLine: "underline",
  },
});
