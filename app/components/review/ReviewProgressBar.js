import React from "react";
import { View, StyleSheet } from "react-native";

export default function ReviewProgressBar({
  current,
  total
}) {

  const progress = (current / total) * 100;

  return (
    <View style={styles.container}>

      <View
        style={[
          styles.progress,
          {
            width: `${progress}%`
          }
        ]}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    height: 12,
    backgroundColor: "#D6EAF8",
    borderRadius: 999,
    overflow: "hidden",
    marginBottom: 30
  },

  progress: {
    flex: 1,
    backgroundColor: "#3498DB"
  }
});