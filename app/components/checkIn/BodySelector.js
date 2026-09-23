import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { PAIN_LOCATIONS } from "../../helpers/CheckInHelper";
import Button from "../Button";

export default function BodySelector({ selected, onSelect }) {
  // selected puede ser: array, JSON string, o valor único
  let selectedArray = [];
  
  if (Array.isArray(selected)) {
    selectedArray = selected;
  } else if (typeof selected === 'string') {
    try {
      const parsed = JSON.parse(selected);
      selectedArray = Array.isArray(parsed) ? parsed : [selected];
    } catch (e) {
      // Si no es JSON válido, tratar como valor simple
      selectedArray = selected ? [selected] : [];
    }
  } else if (selected) {
    selectedArray = [selected];
  }

  function handlePress(pain) {
    const isNone = pain === "none";

    if (isNone) {
      onSelect(["none"]);
      return;
    }

    if (selectedArray.includes("none")) {
      onSelect([pain]);
      return;
    }

    if (selectedArray.includes(pain)) {
      const updated = selectedArray.filter(p => p !== pain);
      onSelect(updated.length ? updated : []);
      return;
    }

    onSelect([...selectedArray, pain]);
  }

  return (
    <View style={styles.container}>
      {PAIN_LOCATIONS.map(pain => (
        <Button
          key={pain.value}
          title={pain.label}
          selected={selectedArray.includes(pain.value)}
          onPress={() => handlePress(pain.value)}
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