import React from "react";
import { View, StyleSheet } from "react-native";
import { URINE_COLORS } from "../../helpers/CheckInHelper";
import Button from "../Button";

export default function ColorOptions({ selected, onSelect }) {
  return (
    <View style={styles.container}>
      {URINE_COLORS.map(item => (
        <Button
          key={item.value}
          title={item.label}
          variant="option"
          selected={selected === item.value}
          accentColor={item.color}
          onPress={() => onSelect(item.value)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 12 },
});