import React, { useEffect, useRef } from "react";
import { WebView } from "react-native-webview";
import * as ScreenOrientation from "expo-screen-orientation";
import { useNavigation } from "@react-navigation/native";

export default function GameScreen({ route }) {
  const { level } = route.params;
  const webviewRef = useRef(null);
  const navigation = useNavigation();

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
        console.log(data);

        // TODO:
        // Guardar progreso en SQLite
        // Navegar a pantalla de resultados
        navigation.navigate("Levels")
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