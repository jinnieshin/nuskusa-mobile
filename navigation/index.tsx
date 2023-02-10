/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { View, Text } from "../components/Themed";
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  DrawerActions,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import BoardScreen from "../screens/Home/Board/BoardScreen";
import ProfileScreen from "../screens/Home/Profile/ProfileScreen";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types/types";
import LinkingConfiguration from "./LinkingConfiguration";
import { Feather, Octicons, Ionicons } from "@expo/vector-icons";

import LoginScreen from "../screens/Authentication/LoginScreen";
import ResetPassword from "../screens/Authentication/ResetPassword";
import SelectStuType from "../screens/Authentication/SignUp/SelectStuType";
import AgreementScreen from "../screens/Authentication/SignUp/AgreementScreen";
import Freshmen from "../screens/Authentication/SignUp/Forms/Freshmen";
import CurrentStudents from "../screens/Authentication/SignUp/Forms/CurrentStudents";
import Graduates from "../screens/Authentication/SignUp/Forms/Graduates";
import Others from "../screens/Authentication/SignUp/Forms/Others";
import Congrats from "../screens/Authentication/SignUp/Congrats";
import HomeScreen from "../screens/Home/HomeScreen";
import PostList from "../screens/Home/Board/PostList";
import GeneralBoard from "../screens/Home/Board/GeneralBoard";
import Announcement from "../screens/Home/Board/Announcement";
import PostScreen from "../screens/Home/Board/PostScreen";

import { useSelector } from "react-redux";
import EditProfileScreen from "../screens/Home/Profile/EditProfileScreen";
import DrawerContent from "../components/Drawer/DrawerContent";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const user = useSelector((state: any) => state.user.value);
  console.log(user);
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator user={user} />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator({ user }: { user: any }) {
  return (
    // initialRouteName={user.email == "" ? "LoginScreen" : "Main"}

    user.email == "" ? (
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ResetPassword"
            component={ResetPassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AgreementScreen"
            component={AgreementScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="SelectStuType"
            component={SelectStuType}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Freshmen"
            component={Freshmen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CurrentStudents"
            component={CurrentStudents}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Graduates"
            component={Graduates}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Others"
            component={Others}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Congrats"
            component={Congrats}
            options={{ headerShown: false }}
          />
        </Stack.Group>
      </Stack.Navigator>
    ) : (
      <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen
          name="main"
          component={Main}
          options={{ headerShown: false }}
        />
      </Drawer.Navigator>
    )
  );
}

const MainStack = createNativeStackNavigator();

const Main = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Main"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{ headerShown: false }}
      />
    </MainStack.Navigator>
  );
};

const BoardStack = createNativeStackNavigator();

const Board = () => {
  return (
    <BoardStack.Navigator>
      <BoardStack.Screen
        name="BoardHome"
        component={BoardScreen}
        options={{
          headerShown: false,
        }}
      />
      <BoardStack.Screen
        name="Announcement"
        component={Announcement}
        options={{
          headerShown: false,
        }}
      />
      <BoardStack.Screen
        name="PostList"
        component={PostList}
        options={{
          headerShown: false,
        }}
      />
      <BoardStack.Screen
        name="GeneralBoard"
        component={GeneralBoard}
        options={{
          headerShown: false,
        }}
      />
      <BoardStack.Screen
        name="PostScreen"
        component={PostScreen}
        options={{
          headerShown: false,
        }}
      />
    </BoardStack.Navigator>
  );
};

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={32} color={color} />
          ),
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "black",
        }}
      />
      <BottomTab.Screen
        name="Board"
        component={Board}
        options={{
          tabBarIcon: ({ color }) => (
            <Octicons name="people" size={32} color={color} />
          ),
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "black",
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-circle-outline" size={36} color={color} />
          ),
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "black",
        }}
      />
    </BottomTab.Navigator>
  );
}

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Main"
        component={BottomTabNavigator}
        options={{
          drawerLabel: "Home",
        }}
      />
      {/* <Drawer.Screen
      //   name="BoardScreen"
      //   component={BoardScreen}
      //   options={{
      //     drawerLabel: "Board",
      //   }}
      // />
      // <Drawer.Screen
      //   name="ProfileScreen"
      //   component={ProfileScreen}
      //   options={{
      //     drawerLabel: "Home",
      //   }}
      // /> */}
    </Drawer.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
