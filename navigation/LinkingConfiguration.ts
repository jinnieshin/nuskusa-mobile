/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootStackParamList } from "../types/types";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      LoginScreen: "LoginScreen",
      SelectStuType: "SelectStuType",
      ResetPassword: "ResetPassword",
      AgreementScreen: "LoginScreen",
      Congrats: "Congrats",
      Freshmen: "Freshmen",
      Graduates: "Graduates",
      CurrentStudents: "CurrentStudents",
      Others: "Others",
      EditProfileScreen: "EditProfileScreen",
      Main: {
        screens: {
          Home: "HomeScreen",
          Board: "BoardScreen",
          Profile: "ProfileScreen",
        },
      },
    },
  },
};

export default linking;
