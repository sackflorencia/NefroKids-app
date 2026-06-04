import React from "react";
import { View, StyleSheet } from "react-native";
import { PAIN_LOCATIONS } from "../../helpers/CheckInHelper";
import CheckInOptionButton from "./CheckInOptionButton";

export default function BodySelector({ selected, onSelect }) {
  return (
    <View style={styles.container}>
      {PAIN_LOCATIONS.map(pain => (
        <CheckInOptionButton
          key={pain.value}
          text={pain.label}
          selected={selected === pain.value}
          onPress={() => onSelect(pain.value)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
});