import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../styles/colors";

const SpeechBubble = ({ text }) => {
  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        <Text style={styles.text}>{text}</Text>
      </View>
      <View style={styles.tailBorder} />
      <View style={styles.tail} />
    </View>
  );
};

export default SpeechBubble;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
  },

  bubble: {
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderWidth: 2,
    borderColor: colors.primaryShadow,
  },

  text: {
    fontSize: 18,
    color: colors.textDark,
  },

  tailBorder: {
    width: 0,
    height: 0,
    borderLeftWidth: 17,
    borderRightWidth: 17,
    borderTopWidth: 22,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: colors.primaryShadow, // 👈 borde

    position: "absolute",
    bottom: -12,
    right: 118,
  },

  tail: {
    width: 0,
    height: 0,
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderTopWidth: 20,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#FFFFFF",

    position: "absolute",
    bottom: -10,
    right: 120,
  },
});