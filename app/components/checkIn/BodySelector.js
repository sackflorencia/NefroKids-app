import React from "react";
import { View, StyleSheet } from "react-native";
import { PAIN_LOCATIONS } from "../../helpers/CheckInHelper";
import Button from "../Button";

export default function BodySelector({ selected, onSelect }) {
  return (
    <View style={styles.container}>
      {PAIN_LOCATIONS.map(pain => (
        <Button
          key={pain.value}
          title={pain.label}
          selected={selected === pain.value}
          onPress={() => onSelect(pain.value)}
          variant="option"
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