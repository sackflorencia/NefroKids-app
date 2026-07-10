import React, { useEffect, useRef } from "react";
import { WebView } from "react-native-webview";
import * as ScreenOrientation from "expo-screen-orientation";
import { useNavigation } from "@react-navigation/native";

import SectionProgressController from "../../back/controllers/sectionProgressController";
import { useSQLiteContext } from "expo-sqlite";
import { useUser } from "../context/UserContext";

export default function GameScreen({ route }) {
  const { level, section } = route.params;
  const webviewRef = useRef(null);
  const navigation = useNavigation();

  const db = useSQLiteContext();
  const { user } = useUser();
  const sectionProgressController = new SectionProgressController(db);

  useEffect(() => {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    );

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  const sendStartLevel = () => {
    if (!webviewRef.current) return;

    setTimeout(() => {
      const message = {
        type: "START_LEVEL",
        level: level.numero,
      };
      console.log(level.numero)

      console.log("Enviando", message);
      webviewRef.current.injectJavaScript(`
      console.log("Entró al JS");
      window.receiveFromReact(${JSON.stringify(JSON.stringify(message))});
      true;
    `);
    }, 300);
  };

  const handleMessage = (event) => {
    const data = JSON.parse(event.nativeEvent.data);
    switch (data.type) {
      case "READY":
        console.log("Unity listo");
        sendStartLevel();
        break;
      case "LEVEL_COMPLETED":
        const levelProgress =
          await progressController.startLevel(
            user.childId,
            level.id
          );
        await sectionProgressController.completeSection(
          levelProgress.id,
          section.id
        );
        navigation.navigate("Levels");
        break;
      case "EXIT_GAME":
        console.log("Salir del juego");
        break;
      case "DEBUG":
        console.log("[UNITY]", data.message);
        break;
      default:
        console.log("Mensaje recibido:", data);
    }
  };
  return (
    <WebView
      ref={webviewRef}
      source={{
        uri: "https://nefrokids-web-1d52f.web.app/",
      }}
      cacheEnabled={false}
      cacheMode="LOAD_NO_CACHE"
      incognito={true}
      style={{ flex: 1 }}
      javaScriptEnabled={true}
      onMessage={handleMessage}
    />
  );
}