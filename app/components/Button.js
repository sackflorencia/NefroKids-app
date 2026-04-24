import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import colors from "../styles/colors";
import typography from "../styles/typography";

const Button = ({ title, onPress, variant = "primary", style }) => {
  const isPrimary = variant === "primary";

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={style}>
    
      <View
        style={[
          styles.shadow,
          {
            backgroundColor: isPrimary
              ? colors.primaryShadow
              : colors.secondaryShadow,
          },
        ]}
      />
      <View
        style={[
          styles.button,
          {
            backgroundColor: isPrimary
              ? colors.primary
              : colors.secondary,
          },
        ]}
      >
        <Text
          style={[
            styles.text,
            {
              color: isPrimary
                ? colors.textDark
                : colors.textLight,
            },
          ]}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: "center",
  },

  text: {
    ...typography.button,
  },

  shadow: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 20,
    top: 4,
  },
});