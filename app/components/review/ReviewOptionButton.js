import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet
} from "react-native";

export default function ReviewOptionButton({
  text,
  onPress
}) {

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.text}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  button: {
  backgroundColor: "#F5F5F5",

  borderWidth: 4,
  borderColor: "#B8F0DF",

  borderRadius: 25,

  paddingVertical: 20,

  alignItems: "center"
},

text: {
  color: "#111",
  fontSize: 20,
  fontWeight: "500"
}
});