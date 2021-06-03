import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
  View,
} from "react-native";
import { Button, Input, Image } from "react-native-elements";
import { primary_color, secondary_color } from "../constants";
import firebase from "firebase/app";
import "firebase/auth";
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Home");
      }
    });
    return () => unsubscribe();
  }, []);

  const signIn = () => {
    setLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        setLoading(false);
        return alert(error);
      });
  };

  return (
    <KeyboardAvoidingView enabled behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <View
        style={{
          width: 210,
          height: 210,
          marginBottom: 10,
          backgroundColor: "green",
          borderRadius: 105,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          elevation: 10,
          borderColor: "#ddd",
          borderWidth: 1,
        }}
      >
        <View
          style={{
            width: 200,
            height: 200,
            borderRadius: 100,
            // elevation: 10,
          }}
        >
          <Image
            source={require("../assets/logo.jpg")}
            style={{
              width: 200,
              height: 200,
              borderRadius: 100,
            }}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Input
          inputStyle={{}}
          placeholder="Email"
          autoFocus
          type="email"
          value={email}
          onChangeText={(val) => setEmail(val)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          type="password"
          value={password}
          onChangeText={(val) => setPassword(val)}
        />
      </View>
      <Button
        raised
        buttonStyle={{ backgroundColor: primary_color }}
        onPress={signIn}
        containerStyle={styles.button}
        title="Login"
      />
      <Button
        raised
        titleStyle={{ color: "#000" }}
        buttonStyle={{ borderColor: secondary_color }}
        onPress={() => navigation.navigate("Register")}
        containerStyle={styles.button}
        type="outline"
        title="Register"
      />
      {loading && (
        <View style={{ marginTop: 50 }}>
          <ActivityIndicator size="small" color={primary_color} />
        </View>
      )}

      <View style={{ height: 50 }} />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
