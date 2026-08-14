import React, { useEffect, useRef } from "react";
import {
  View,
  Button
} from "react-native";
import { WebView } from "react-native-webview";
import * as ScreenOrientation from "expo-screen-orientation";
import {
  useNavigation
} from "@react-navigation/native";
import { useSQLiteContext } from "expo-sqlite";

import ProgressController from "../../back/controllers/progressController";
import { useUser } from "../context/UserContext";

const DEV_COMPLETE_LEVEL = true;

export default function GameScreen({ route }) {

  const { level, section } = route.params;

  const navigation = useNavigation();
  const webviewRef = useRef(null);

  const db = useSQLiteContext();
  const { user } = useUser();

  const progressController =
    new ProgressController(db);

  useEffect(() => {

    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    );

    return () => {
      ScreenOrientation.unlockAsync();
    };

  }, []);

  const sendStartLevel = () => {

    if (!webviewRef.current) {
      return;
    }

    setTimeout(() => {
      const message = {
        type: "START_LEVEL",
        level: level.numero,
      };

      webviewRef.current.injectJavaScript(`
        window.receiveFromReact(
          ${JSON.stringify(JSON.stringify(message))}
        );
        true;
      `);

    }, 300);

  };

  async function completeCurrentSection() {

    console.log("=== COMPLETAR NIVEL ===");
    console.log("childId:", user?.childId);
    console.log("levelId:", level?.id);
    console.log("sectionId:", section?.id);

    try {

      console.log("ANTES DE completeSection");

      const result = await progressController.completeSection(
        user.childId,
        level.id,
        section.id
      );

      console.log("RESULTADO completeSection:", result);
      console.log("DESPUÉS DE completeSection");

      navigation.navigate("Levels");

    } catch (error) {

      console.error(
        "ERROR EN completeSection:",
        error
      );

    }
  }

  const handleMessage = async (event) => {

    const data = JSON.parse(
      event.nativeEvent.data
    );

    switch (data.type) {

      case "READY":
        console.log("Unity listo");
        sendStartLevel();
        break;

      case "LEVEL_COMPLETED":
        console.log("Nivel completado");
        await completeCurrentSection();
        break;

      case "EXIT_GAME":
        navigation.goBack();
        break;

      case "DEBUG":
        console.log("[UNITY]", data.message);
        break;

      default:
        console.log(data);

    }

  };

  return (
    <View style={{ flex: 1 }}>

      <WebView
        ref={webviewRef}
        source={{
          uri: "https://nefrokids-web-1d52f.web.app/",
        }}
        cacheEnabled={false}
        cacheMode="LOAD_NO_CACHE"
        incognito
        javaScriptEnabled
        style={{ flex: 1 }}
        onMessage={handleMessage}
      />

      {DEV_COMPLETE_LEVEL && (
        <View
          style={{
            position: "absolute",
            top: 40,
            right: 20,
          }}
        >
          <Button
            title="Completar nivel (DEV)"
            onPress={completeCurrentSection}
          />
        </View>
      )}

    </View>
  );

}