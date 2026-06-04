import React from "react";
import { View, StyleSheet } from "react-native";
import { MOODS } from "../../helpers/CheckInHelper";
import CheckInOptionButton from "./CheckInOptionButton";

export default function FeelingSelector({ selected, onSelect }) {
  return (
    <View style={styles.container}>
      {MOODS.map(mood => (
        <CheckInOptionButton
          key={mood.value}
          text={mood.label}
          selected={selected === mood.value}
          onPress={() => onSelect(mood.value)}
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