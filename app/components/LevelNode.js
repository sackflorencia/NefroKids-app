import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../styles/colors";

export default function LevelNode({ number, unlocked = true }) {
  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.node,
          {
            backgroundColor: unlocked
              ? colors.primary
              : colors.secondary,
          },
        ]}
      >
        <Text style={styles.text}>{number}</Text>
      </View>

      <View
        style={[
          styles.shadow,
          {
            backgroundColor: unlocked
              ? colors.primaryShadow
              : colors.secondaryShadow,
          },
        ]}
      />
    </View>
  );
}

const SIZE = 90;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
  },
  node: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  shadow: {
    position: "absolute",
    top: 10,
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    zIndex: 1,
  },
  text: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
  },
});