import React, { useEffect, useRef } from "react";
import { WebView } from "react-native-webview";
import * as ScreenOrientation from "expo-screen-orientation";

export default function GameScreen({ route }) {
  const { level } = route.params;
  const webviewRef = useRef(null);

  useEffect(() => {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    );

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  const sendStartLevel = () => {
    const message = {
      type: "START_LEVEL",
      level: level,
    };

    webviewRef.current?.injectJavaScript(`
      receiveFromReact(${JSON.stringify(message)});
      true;
    `);
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
        break;

      case "EXIT_GAME":
        console.log("Salir del juego");
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
      style={{ flex: 1 }}
      onMessage={handleMessage}
    />
  );
}