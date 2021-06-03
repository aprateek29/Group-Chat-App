import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { primary_color } from "../constants";
import firebase from "firebase/app";
import "firebase/firestore";

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = React.useState([]);
  React.useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("chats")
      .doc(id)
      .collection("message")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setChatMessages(snapshot.docs.map((doc) => doc.data()))
      );
    return () => unsubscribe();
  }, []);

  return (
    <ListItem onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
      <Avatar
        rounded
        source={{
          uri: chatMessages?.[0]?.photoURL || "https://picsum.photos/200/200",
        }}
      />
      <ListItem.Content>
        <ListItem.Title
          style={{ fontWeight: "bold", fontSize: 18 }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chatMessages?.[0]?.displayName}
          {chatMessages?.[0] && ":"} {chatMessages?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
