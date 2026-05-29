import React from "react";
import {
  View,
  Text,
  StyleSheet
} from "react-native";

export default function ReviewResultCard({
  score,
  total
}) {

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        ¡Review completado!
      </Text>

      <Text style={styles.score}>
        {score} / {total}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20
  },

  title: {
    fontSize: 30,
    fontWeight: "bold"
  },

  score: {
    fontSize: 24
  }
});