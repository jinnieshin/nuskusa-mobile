import { View, StyleSheet, Text } from "react-native";
import React from "react";
// import LoginScreen from "../screens/Authentication/LoginScreen";
// import ResetPassword from "../screens/Authentication/ResetPassword";
// import AgreementScreen from "../screens/Authentication/SignUp/AgreementScreen";
import SelectStuType from "../screens/Authentication/SignUp/SelectStuType";
import Freshmen from "../screens/Authentication/SignUp/Forms/Freshmen";
import CurrentStudents from "../screens/Authentication/SignUp/Forms/CurrentStudents";
import Graduates from "../screens/Authentication/SignUp/Forms/Graduates";
import Others from "../screens/Authentication/SignUp/Forms/Others";
import Congrats from "../screens/Authentication/SignUp/Congrats";

const AppRouter = () => {
  return (
    <View>
      <Congrats />
    </View>
  );
};

export default AppRouter;
