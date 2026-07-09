import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../../styles/colors";

export default function LevelNode({ number, state, onPress }) {
  const blocked = state === "bloqueado"
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} disabled={blocked}>
      <View style={styles.wrapper, blocked && styles.blocked}>
        <View
          style={[
            styles.node,
            {
              backgroundColor: blocked
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
              backgroundColor: blocked
                ? colors.primaryShadow
                : colors.secondaryShadow,
            },
          ]}
        />
      </View>
    </TouchableOpacity>
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
  blocked: {
    opacity: 0.4,
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