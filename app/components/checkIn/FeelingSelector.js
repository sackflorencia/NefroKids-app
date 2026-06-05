import React from "react";
import { View, StyleSheet } from "react-native";
import { MOODS } from "../../helpers/CheckInHelper";
import Button from "../Button";
import colors from "../../styles/colors";


export default function FeelingSelector({ selected, onSelect }) {
  return (
    <View style={styles.container}>
      {MOODS.map(mood => (
        <Button
          key={mood.value}
          title={mood.label}
          selected={selected === mood.value}
          onPress={() => onSelect(mood.value)}
          textColor={colors.textDark}
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