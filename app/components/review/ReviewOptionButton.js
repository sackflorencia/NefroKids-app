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
    backgroundColor: "#5DADE2",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center"
  },

  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "600"
  }
});