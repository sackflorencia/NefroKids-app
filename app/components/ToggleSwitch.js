import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import colors from "../styles/colors";
import typography from "../styles/typography";


export default function ToggleSwitch({
  value,
  onValueChange,
  leftLabel = "Sí",
  rightLabel = "No",
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.buttonWrapper,
        ]}
        onPress={() => onValueChange(true)}
      >
        <View style={[styles.shadow, { backgroundColor: value ? colors.primaryShadow : "#D6D6D6" }]} />
        <View
          style={[
            styles.button,
            value && styles.buttonActive,
          ]}
        >
          <Text
            style={[
              styles.text,
              value && styles.textActive,
            ]}
          >
            {leftLabel}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.buttonWrapper,
        ]}
        onPress={() => onValueChange(false)}
      >
        <View style={[styles.shadow, { backgroundColor: !value ? colors.primaryShadow : "#D6D6D6" }]} />
        <View
          style={[
            styles.button,
            !value && styles.buttonActive,
          ]}
        >
          <Text
            style={[
              styles.text,
              !value && styles.textActive,
            ]}
          >
            {rightLabel}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
  },
  buttonWrapper: {
    flex: 1,
  },
  shadow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 20,
    top: 4,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FAFAFA",
  },
  buttonActive: {
    backgroundColor: colors.primary,
  },
  text: {
    ...typography.button,
    color: "#999",
  },
  textActive: {
    color: colors.textDark,
  },
});
