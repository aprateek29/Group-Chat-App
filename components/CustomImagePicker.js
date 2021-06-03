import React, { useEffect } from "react";
import {
  StyleSheet,
  Image,
  View,
  Platform,
  Text,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";

export default function CustomImagePicker({ image, setImage }) {
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.3,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View
      style={{
        width: 150,
        height: 150,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
      )}
      <TouchableOpacity
        onPress={pickImage}
        style={{
          marginTop: image ? 10 : 0,
          height: 50,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FontAwesome name="camera" size={16} color="#333" />
        <Text style={{ marginLeft: 10 }}>Uplaod Profile Image</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
