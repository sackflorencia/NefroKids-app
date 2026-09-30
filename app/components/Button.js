import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import colors from "../styles/colors";
import typography from "../styles/typography";

const Button = ({
  title,
  onPress,
  variant = "primary",
  style,
  selected,
  accentColor,
  colorVariant,
  direction = "left",
  disabled = false,
}) => {
  const isPrimary = variant === "primary";
  const isSecondary = variant === "secondary";
  const isOption = variant === "option";
  const isBack = variant === "back";

  // Para el botón back se puede elegir qué variante de color usar.
  // Para el resto, se usa directamente variant.
  const resolvedColorVariant = isBack
    ? colorVariant || "primary"
    : variant;

  const bgColor = disabled
    ? "#D6D6D6"
    : resolvedColorVariant === "primary"
      ? colors.primary
      : resolvedColorVariant === "secondary"
        ? colors.secondary
        : selected
          ? "#EDFDF5"
          : "#FAFAFA";

  const shadowColor = disabled
    ? "#BDBDBD"
    : resolvedColorVariant === "primary"
      ? colors.primaryShadow
      : resolvedColorVariant === "secondary"
        ? colors.secondaryShadow
        : selected
          ? "#A4F1CC"
          : "#D6D6D6";

  const textColor = disabled
    ? "#999"
    : isPrimary
      ? colors.textDark
      : isSecondary
        ? colors.textLight
        : selected
          ? colors.textDark
          : "#666";

  // Botón de volver / avanzar
  if (isBack) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={[styles.backTouchable, style]}
        disabled={disabled}
      >
        <View
          style={[
            styles.shadow,
            {
              backgroundColor: shadowColor,
              borderRadius: 24,
              top: 4,
              left: 0,
              right: 0,
            },
          ]}
        />

        <View
          style={[
            styles.backButton,
            { backgroundColor: bgColor },
          ]}
        >
          <Ionicons
            name={direction === "right" ? "arrow-forward" : "arrow-back"}
            size={22}
            color={textColor}
          />
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={style}
      disabled={disabled}
    >
      <View
        style={[
          styles.shadow,
          { backgroundColor: shadowColor },
        ]}
      />

      <View
        style={[
          styles.button,
          { backgroundColor: bgColor },
          isOption && styles.optionBorder,
          isOption && {
            borderColor: selected
              ? colors.primaryShadow
              : "#D6D6D6",
          },
        ]}
      >
        {accentColor && (
          <View
            style={[
              styles.colorDot,
              { backgroundColor: accentColor },
            ]}
          />
        )}

        <Text
          style={[
            styles.text,
            { color: textColor },
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
    paddingVertical: 16,
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
    fontSize: 20,
    fontWeight: "600",
  },

  shadow: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 6,
    height: "100%",
    borderRadius: 20,
    zIndex: -1,
    opacity: 0.95,
  },

  backTouchable: {
    alignSelf: "flex-start",
    marginBottom: 16,
  },

  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 3,
  },
});