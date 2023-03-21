/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { View, Text } from "react-native";
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
import { Alert, ColorSchemeName, Pressable } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useState } from "react";

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

import StartScreen from "../screens/StartScreen";
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
import PostScreen from "../screens/Home/Board/PostScreen";
import AddPostScreen from "../screens/Home/Board/AddPostScreen";
import NotificationDrawerScreen from "../screens/Home/Notification/NotificationDrawerScreen";
import EditPostScreen from "../screens/Home/Board/EditPostScreen";
import { useDispatch, useSelector } from "react-redux";
import EditProfileScreen from "../screens/Home/Profile/EditProfileScreen";
import DrawerContent from "../components/Drawer/DrawerContent";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUser } from "../redux/features/user";
//@ts-ignore
import { REACT_APP_HOST } from "@env";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const dispatch = useDispatch();
  // from async storage (user chooses to keep logged in)

  const [userObject, setUserObject] = useState<any>({});
  React.useEffect(() => {
    getUserObject();
  }, []);

  const getUserObject = async () => {
    const userFromAsyncStorage = await AsyncStorage.getItem("userObject");
    if (userFromAsyncStorage !== null) {
      const userFromAsyncStorageObject = JSON.parse(userFromAsyncStorage);
      setUserObject(userFromAsyncStorageObject);
      dispatch(setUser(userFromAsyncStorageObject));

      // Sign In
      // If app reloads, user information exists, but user is not signed in
      const userPasswordFromAsyncStorage = await AsyncStorage.getItem(
        "userPassword"
      );
      const url = REACT_APP_HOST + "/api/auth/signin";

      const credentialObject = {
        email: userFromAsyncStorageObject.email,
        password: userPasswordFromAsyncStorage,
      };
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(credentialObject),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // if (response.status !== 200) {
      //   Alert.alert(response.status)
      // }
    }
  };

  const user = useSelector((state: any) => state.user.value); // from redux

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
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

    user.email === "" ? (
      <Stack.Navigator>
        <Stack.Group>
          {/* <Stack.Screen
            name="StartScreen"
            component={StartScreen}
            options={{ headerShown: false }}
          /> */}
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
      <MainDrawer.Navigator
        id="LeftDrawer"
        drawerContent={(props) => <DrawerContent {...props} />}
      >
        <MainDrawer.Screen
          name="Notification"
          component={NotificationDrawer}
          options={{ headerShown: false }}
        />
      </MainDrawer.Navigator>
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
        name="PostList"
        component={PostList}
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
      <BoardStack.Screen
        name="AddPostScreen"
        component={AddPostScreen}
        options={{
          headerShown: false,
        }}
      />
      <BoardStack.Screen
        name="EditPostScreen"
        component={EditPostScreen}
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
      initialRouteName="Board"
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

const MainDrawer = createDrawerNavigator();

const RightDrawer = createDrawerNavigator();

const NotificationDrawer = () => {
  return (
    <RightDrawer.Navigator
      id="RightDrawer"
      screenOptions={{ drawerPosition: "right", headerShown: false }}
      drawerContent={(props) => <NotificationDrawerScreen {...props} />}
    >
      <MainDrawer.Screen
        name="main"
        component={Main}
        options={{ headerShown: false }}
      />
    </RightDrawer.Navigator>
  );
};

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
