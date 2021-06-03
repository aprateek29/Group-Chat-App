import "react-native-gesture-handler";

import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import AddChatScreen from "./screens/AddChatScreen";
import ChatScreen from "./screens/ChatScreen";

import { primary_color } from "./constants";
import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBhAf1xlo46F9DYgUwO2qB4qR2aJCEMLEM",
  authDomain: "telegram-clone-9a670.firebaseapp.com",
  projectId: "telegram-clone-9a670",
  storageBucket: "telegram-clone-9a670.appspot.com",
  messagingSenderId: "498694028432",
  appId: "1:498694028432:web:a1459207bbf3919f1dec15",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: primary_color },
  headerTitleStyle: { color: "white" },
  headerTintColor: "white",
};

export default function App() {
  // LogBox.ignoreAllLogs();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddChat" component={AddChatScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
