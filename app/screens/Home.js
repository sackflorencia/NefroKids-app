import React, { use } from "react";
import { View, Image, StyleSheet} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import globalStyles from "../styles/globalStyles";
import Button from "../components/Button";
import SpeechBubble from "../components/home/SpeechBubble";
import colors from "../styles/colors";
import Header from "../components/header/Header";

import images from "../../assets/images";
import { useNavigation } from "@react-navigation/native";

// images.confusedRiku({
//   width: 300,
//   height: 400,
//   cropping: true,
// })

const Home = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header/>

      {/* Main content */}
      <View style={styles.content}>
        {/* Pet */}
        <View style={styles.petContainer}>
          <Image
            source={images.confusedRiku}
            style={styles.pet}
          />
        </View>

        {/* Speech Bubble */}
        <SpeechBubble text="¿Que quieres hacer hoy?" />

        {/* Buttons */}
        <View style={styles.buttons}>
          <Button 
            title="Contarte como estoy" 
            variant="secondary" 
            style={styles.button}
            onPress={() => navigation.navigate("CheckIn")}
          />
          <Button 
            title="Jugar" 
            variant="secondary" 
            style={styles.button}
            onPress={() => navigation.navigate("Levels")}
          />
          <Button 
            title="Informarme" 
            variant="secondary" 
            style={styles.button}
          />
          <Button 
            title="Repasar" 
            variant="secondary" 
            style={styles.button}
            onPress={() => navigation.navigate("Review")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyles.container.backgroundColor,
  },

  header: {
    backgroundColor: colors.primary,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  headerText: {
    fontSize: 36,
    fontWeight: "bold",
    color: colors.textDark,
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  pet: {
    width: 220,
    height: 280,
    marginBottom: 40,
  },

  petContainer: {
    height: 140,
    overflow: "hidden",
    marginBottom: 40,
  },

  buttons: {
    width: "100%",
    marginTop: 30,
    gap: 15,
    alignItems: "center",
  },

  button: {
    width: "85%",
  },
});