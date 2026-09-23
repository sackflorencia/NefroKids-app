import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function BackButton({
  onPress,
  style,
  iconColor = "#13553D",
  iconSize = 28,
  hitSlop = 12,
}) {
  const navigation = useNavigation();

  const handlePress = onPress || (() => navigation.goBack());

  return (
    <TouchableOpacity
      onPress={handlePress}
      hitSlop={{ top: hitSlop, bottom: hitSlop, left: hitSlop, right: hitSlop }}
      style={[styles.button, style]}
      activeOpacity={0.8}
    >
      <View style={styles.circle}>
        <Ionicons name="arrow-back" size={iconSize} color={iconColor} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: "flex-start",
  },
  circle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(255,255,255,0.9)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
});
