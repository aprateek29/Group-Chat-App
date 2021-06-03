import React from "react";
import {
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CustomListItem from "../components/CustomListItem";
import { Avatar } from "react-native-elements";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { primary_color } from "../constants";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = React.useState([]);

  React.useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("chats")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setChats(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return () => unsubscribe();
  }, []);

  const signOutUser = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        return navigation.replace("Login");
      });
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Group Chat",
      headerStyle: { backgroundColor: primary_color },
      headerTitleStyle: { color: "#fff" },
      headerTintColor: "#fff",
      headerRight: () => (
        <View
          style={{
            marginRight: 20,
          }}
        >
          {/* <TouchableOpacity
            onPress={() => alert("Dummy Icon")}
            activeOpacity={0.5}
          >
            <AntDesign name="camera" size={24} color="#fff" />
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => navigation.navigate("AddChat")}
            activeOpacity={0.5}
          >
            <SimpleLineIcons name="pencil" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
            <Avatar
              rounded
              source={{ uri: firebase.auth()?.currentUser?.photoURL }}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", { id, chatName });
  };

  return (
    <SafeAreaView>
      <StatusBar style="light" />
      <ScrollView style={styles.container}>
        {chats.map(({ id, data: { chatName } }) => (
          <CustomListItem
            key={id}
            id={id}
            chatName={chatName}
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});
