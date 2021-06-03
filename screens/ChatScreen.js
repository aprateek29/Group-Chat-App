import React from "react";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  ScrollView,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Avatar, Button, Input } from "react-native-elements";
import {
  AntDesign,
  MaterialCommunityIcons,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { primary_color } from "../constants";

const ChatScreen = ({ navigation, route }) => {
  const scrollView = React.useRef(null);
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState([]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            width: 80,
            justifyContent: "space-between",
            marginRight: 20,
          }}
        >
          <TouchableOpacity onPress={() => alert("Dummy Icon")}>
            <MaterialCommunityIcons name="video" size={26} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert("Dummy Icon")}>
            <MaterialIcons name="call" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ paddingStart: 10 }}
        >
          <AntDesign name="arrowleft" size={24} color="#000" />
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            h3
            style={{
              fontSize: 20,
              color: "black",
              fontWeight: "700",
            }}
          >
            {route.params.chatName.length > 12
              ? `${route.params.chatName.slice(0, 12)}...`
              : route.params.chatName}
          </Text>
        </View>
      ),
    });
  }, [navigation, messages]);

  const sendMessage = () => {
    setInput("");
    Keyboard.dismiss();
    scrollView.current.scrollToEnd({ animated: false });
    if (input === "") {
      return alert("Type something...");
    }
    firebase
      .firestore()
      .collection("chats")
      .doc(route.params.id)
      .collection("message")
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        displayName: firebase.auth().currentUser.displayName,
        email: firebase.auth().currentUser.email,
        photoURL: firebase.auth().currentUser.photoURL,
      });
  };

  React.useLayoutEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("chats")
      .doc(route.params.id)
      .collection("message")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return () => unsubscribe();
  }, [route]);

  return (
    <SafeAreaView style={styles.outerContainer}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        keyboardVerticalOffset={90}
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView
              ref={scrollView}
              contentContainerStyle={{ paddingTop: 15 }}
            >
              {messages.map(({ data, id }) =>
                data.email === firebase.auth().currentUser.email ? (
                  <View key={id} style={styles.reciever}>
                    <Avatar
                      position="absolute"
                      bottom={-15}
                      right={-5}
                      rounded
                      size={30}
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        right: -5,
                        borderWidth: 2,
                        borderColor: "#fff",
                      }}
                      source={{ uri: data.photoURL }}
                    />
                    <Text style={styles.recieverText}>{data.message}</Text>
                  </View>
                ) : (
                  <View key={id} style={styles.sender}>
                    <Avatar
                      position="absolute"
                      bottom={-15}
                      left={-5}
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        left: -5,
                        borderWidth: 2,
                        borderColor: "#fff",
                      }}
                      rounded
                      size={30}
                      source={{ uri: data.photoURL }}
                    />
                    <Text style={styles.senderText}>{data.message}</Text>
                    <Text style={styles.senderName}>~ {data.displayName}</Text>
                  </View>
                )
              )}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                value={input}
                onChangeText={(text) => setInput(text)}
                style={styles.textInput}
                placeholder="Type Message..."
              />
              <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                <Ionicons name="send" size={24} color={primary_color} />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: "white",
    flex: 1,
  },
  container: {
    flex: 1,
  },
  reciever: {
    padding: 15,
    backgroundColor: "#ececec",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  sender: {
    padding: 15,
    backgroundColor: primary_color,
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 15,
    maxWidth: "80%",
    position: "relative",
  },
  senderText: {
    color: "#fff",
    fontWeight: "500",
    marginLeft: 10,
    marginBottom: 15,
  },
  recieverText: {
    color: "#000",
    fontWeight: "500",
    marginLeft: 10,
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: "#fff",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    backgroundColor: "#ececec",
    padding: 10,
    color: "grey",
    borderRadius: 30,
  },
});
