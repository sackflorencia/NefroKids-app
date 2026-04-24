import React from "react";
import { View, Image, StyleSheet } from "react-native";

import globalStyles from "../styles/globalStyles";
import Button from "../components/Button";
import SpeechBubble from "../components/SpeechBubble";

import images from "../../assets/images";

const Home = () => {
  return (
    <View style={globalStyles.container}>

      <SpeechBubble text="¿Qué querés hacer hoy?" />

      <View style={styles.buttons}>
        <Button title="Contarte como estoy" variant="secondary" style={styles.small} />

        <Button title="Informarme" variant="secondary" style={styles.small} />
        <Button title="Repasar" variant="secondary" style={styles.small} />
        <Button title="Jugar" variant="secondary" style={styles.small} />
      </View>

      <Image
        source={images.confusedRiku}
        style={styles.pet}
      />

    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  buttons: {
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 12,
  },

  small: {
    width: "60%",
  },

  pet: {
    position: "absolute",
    right: -20,
    bottom: 80,
    width: 220,
    height: 220,
  },
});