import React from "react";
import { View,  Text,StyleSheet } from "react-native";

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
    height: 18,
    backgroundColor: "#C8F2E3",
    borderRadius: 999,
    overflow: "hidden",
    marginBottom: 20   // <- antes era 50
},
  // container: {
  //   height: 18,
  //   backgroundColor: "#C8F2E3",
  //   borderRadius: 999,
  //   overflow: "hidden",
  //   marginBottom: 50
  // },

  progress: {
    backgroundColor: "#35C59B"
  }
});