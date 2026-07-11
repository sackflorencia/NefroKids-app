import React from "react";
import { View, Text, StyleSheet } from "react-native";

// Componente Arrow separado
function Arrow({ direction, color }) {
  const getArrowSize = () => {
    const size = 18;
    
    switch (direction) {
      case "top":
        return {
          width: size * 2,
          height: size,
          backgroundColor: "transparent",
          borderLeftWidth: size,
          borderRightWidth: size,
          borderBottomWidth: size,
          borderLeftColor: "transparent",
          borderRightColor: "transparent",
          borderBottomColor: color,
          marginBottom: -size + 10,
        };
      case "bottom":
        return {
          width: size * 2,
          height: size,
          backgroundColor: "transparent",
          borderLeftWidth: size,
          borderRightWidth: size,
          borderTopWidth: size,
          borderLeftColor: "transparent",
          borderRightColor: "transparent",
          borderTopColor: color,
          marginTop: -size + 10,
        };
      case "left":
        return {
          width: size,
          height: size * 2,
          backgroundColor: "transparent",
          borderTopWidth: size,
          borderBottomWidth: size,
          borderRightWidth: size,
          borderTopColor: "transparent",
          borderBottomColor: "transparent",
          borderRightColor: color,
          marginRight: -size + 10,
        };
      case "right":
        return {
          width: size,
          height: size * 2,
          backgroundColor: "transparent",
          borderTopWidth: size,
          borderBottomWidth: size,
          borderLeftWidth: size,
          borderTopColor: "transparent",
          borderBottomColor: "transparent",
          borderLeftColor: color,
          marginLeft: -size + 10,
        };
      default:
        return {};
    }
  };

  return <View style={getArrowSize()} />;
}

export default function SpeechBubble({
  message,
  direction = "bottom",
  backgroundColor = "#fff",
  textColor = "#666",
  maxWidth = "80%",
  style,
  textStyle,
}) {
  // Determinar la dirección del layout según la dirección de la flecha
  const getContainerStyle = () => {
    switch (direction) {
      case "top":
        return { flexDirection: "column-reverse" };
      case "bottom":
        return { flexDirection: "column" };
      case "left":
        return { flexDirection: "row-reverse" };
      case "right":
        return { flexDirection: "row" };
      default:
        return { flexDirection: "column" };
    }
  };

  return (
    <View
      style={[
        styles.wrapper,
        getContainerStyle(),
        style,
      ]}
    >
      <View
        style={[
          styles.bubble,
          {
            backgroundColor,
            maxWidth,
          },
        ]}
      >
        <Text
          style={[
            styles.text,
            { color: textColor },
            textStyle,
          ]}
        >
          {message}
        </Text>
      </View>

      <Arrow direction={direction} color={backgroundColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
  },

  bubble: {
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#f2f2f2",
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 6,
  },

  text: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
    lineHeight: 22,
    color: "#666",
  },
});