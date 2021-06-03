import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { primary_color } from "../constants";
import firebase from "firebase/app";
import "firebase/firestore";

const AddChatScreen = ({ navigation }) => {
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "New Group",
      headerStyle: { backgroundColor: primary_color },
      headerTitleStyle: { color: "#fff" },
      headerTintColor: "#fff",
    });
  }, [navigation]);

  const createChat = async () => {
    setLoading(true);
    setDisabled(true);
    await firebase
      .firestore()
      .collection("chats")
      .add({
        chatName: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        navigation.goBack();
      })
      .catch((err) => {
        setLoading(false);
        return alert(err.message);
      });
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter a group name"
        value={input}
        onChangeText={(val) => setInput(val)}
        leftIcon={
          <Icon name="wechat" type="antdesign" size={24} color="black" />
        }
      />
      <Button
        buttonStyle={{ backgroundColor: primary_color }}
        disabled={!input || disabled}
        onPress={createChat}
        title="Create new group"
      />
      {loading && (
        <View style={{ marginTop: 50 }}>
          <ActivityIndicator size="small" color={primary_color} />
        </View>
      )}
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 30,
    height: "100%",
  },
});
