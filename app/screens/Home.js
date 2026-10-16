import React, { useEffect } from "react";
import { View, Image, StyleSheet, StatusBar } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import globalStyles from "../styles/globalStyles";
import Button from "../components/Button";
import SpeechBubble from "../components/speechBubble.js/SpeechBubble";
import colors from "../styles/colors";
import Header from "../components/header/Header";
import { useUser } from "../context/UserContext";
import * as ScreenOrientation from "expo-screen-orientation";

import images from "../../assets/images";
import { useNavigation } from "@react-navigation/native"

// images.confusedRiku({
//   width: 300,
//   height: 400,
//   cropping: true,
// })

const Home = () => {
  useEffect(() => {
  
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
  
    }, []);
  const navigation = useNavigation();
  const { mode, enterChildMode, logout } = useUser();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" translucent={false} />
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
        <SpeechBubble message="¿Que quieres hacer hoy?" direction="top" />

        {/* Buttons */}
        <View style={styles.buttons}>
          {mode === "parent" ? (
            <>
              <Button
                title="¿Cómo está el chico?"
                variant="secondary"
                style={styles.button}
                onPress={() => navigation.navigate("CheckIn", { viewOnly: true })}
              />

              <Button
                title="Informarme"
                variant="secondary"
                style={styles.button}
              />

              <Button
                title="Modo hijo"
                variant="primary"
                style={styles.button}
                onPress={() => enterChildMode()}
              />
            </>
          ) : (
            <>
              <Button
                title="Jugar"
                variant="secondary"
                style={styles.button}
                onPress={() => navigation.navigate("Levels")}
              />

              <Button
                title="Contarte como estoy"
                variant="secondary"
                style={styles.button}
                onPress={() => navigation.navigate("CheckIn")}
              />
              
            </>
          )}
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
    width: 300,
    height: 380,
    marginBottom: 40,
  },

  petContainer: {
    height: 170,
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