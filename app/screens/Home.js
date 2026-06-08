import React, { use } from "react";
import { View, Image, StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import globalStyles from "../styles/globalStyles";
import Button from "../components/Button";
import SpeechBubble from "../components/home/SpeechBubble";

import images from "../../assets/images";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={globalStyles.container}>

      <SpeechBubble text="¿Qué querés hacer hoy?" />

      <View style={styles.buttons}>
        <Button title="Contarte como estoy" variant="secondary" style={styles.small} onPress={() => navigation.navigate("CheckIn")}/>

        <Button title="Informarme" variant="secondary" style={styles.small} />
        <Button title="Repasar" variant="secondary" style={styles.small} onPress={() => navigation.navigate("Review")}/>
        <Button
          title="Jugar"
          variant="secondary"
          style={styles.small}
          onPress={() => navigation.navigate("Levels")}
        />
        <Button
          title="Test Firebase"
          variant="secondary"
          style={styles.small}
          onPress={() => navigation.navigate("FirebaseTest")}
        />
      </View>

      <Image
        source={images.confusedRiku}
        style={styles.pet}
      />

    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  buttons: {
    paddingHorizontal: 20,
    marginTop: 10,
    gap: 15,
  },

  small: {
    width: "60%",
  },

  pet: {
    position: "absolute",
    right: -10,
    bottom: 130,
    width: 260,
    height: 340,
  }
});