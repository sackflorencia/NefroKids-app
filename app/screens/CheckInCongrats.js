import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SpeechBubble from "../components/speechBubble.js/SpeechBubble";
import colors from "../styles/colors";

export default function CheckInCongrats({ navigation }) {

  useEffect(() => {
    const t = setTimeout(() => {
      navigation.navigate("Home");
    }, 4000);

    return () => clearTimeout(t);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>

        {/* Riku positioned bottom-left */}
        <Image
          source={require("../../assets/images/pet/happy_riku.png")}
          style={styles.riku}
          resizeMode="contain"
        />

        {/* Burbuja grande arriba a la derecha */}
        <View style={styles.bubbleLarge} pointerEvents="none">
          <SpeechBubble
            message={"¡Buen trabajo! Completaste tu registro diario."}
            direction="left"
            backgroundColor="#FFFFFF"
            textColor="#03403F"
            maxWidth={275}
            style={{ borderWidth: 0 }}
            textStyle={{ fontWeight: "700", fontSize: 22 }}
          />
        </View>

      </View>
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  riku: {
    position: "absolute",
    right: -50,
    bottom: -120,
    width: 700,
    height: 700,
  },
  bubbleLarge: {
    position: "absolute",
    right: 28,
    top: 100,
  },
  bubbleSmall: {
    position: "absolute",
    left: 60,
    top: 210,
  },
});
