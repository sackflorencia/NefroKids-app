import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import colors from "../../styles/colors";
import typography from "../../styles/typography";

const ReviewButton = ({ title, onPress, variant = "primary", style, activeOpacity = 0.85 }) => {
  const isPrimary = variant === "primary";

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={activeOpacity} style={style}>
      <View style={[styles.button, isPrimary ? styles.primary : styles.secondary]}>
        <Text style={[typography.button, isPrimary ? styles.primaryText : styles.secondaryText]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ReviewButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  primary: {
    backgroundColor: colors.secondary,
  },
  secondary: {
    backgroundColor: colors.primary,
  },
  primaryText: {
    color: colors.textDark,
  },
  secondaryText: {
    color: colors.textLight,
  },
});
