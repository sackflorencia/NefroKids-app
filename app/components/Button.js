import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import colors from "../styles/colors";
import typography from "../styles/typography";

const Button = ({ title, onPress, variant = "primary", style, selected, accentColor }) => {
  const isPrimary   = variant === "primary";
  const isSecondary = variant === "secondary";
  const isOption    = variant === "option";

  const bgColor     = isPrimary   ? colors.primary
                    : isSecondary ? colors.secondary
                    : selected    ? "#EDFDF5"
                    : "#FAFAFA";

  const shadowColor = isPrimary   ? colors.primaryShadow
                    : isSecondary ? colors.secondaryShadow
                    : selected    ? "#A4F1CC"
                    : "#D6D6D6";

  const textColor   = isPrimary   ? colors.textDark
                    : isSecondary ? colors.textLight
                    : selected    ? colors.textDark
                    : "#999";

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={style}>

      <View style={[styles.shadow, { backgroundColor: shadowColor }]} />

      <View style={[
        styles.button,
        { backgroundColor: bgColor },
        isOption && styles.optionBorder,
        isOption && { borderColor: selected ? colors.primaryShadow : "#D6D6D6" },
      ]}>
        {accentColor && (
          <View style={[styles.colorDot, { backgroundColor: accentColor }]} />
        )}
        <Text style={[styles.text, { color: textColor }]}>
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
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  optionBorder: {
    borderWidth: 2,
  },
  colorDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
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