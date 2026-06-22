import React from "react";
import { WebView } from "react-native-webview";
import { useEffect } from "react";
import * as ScreenOrientation from "expo-screen-orientation";


export default function GameScreen() {
  useEffect(() => {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    );

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);
  return (
    <WebView
      source={{
        uri: "https://nefrokids-web-1d52f.web.app/",
      }}
      style={{ flex: 1 }}
    />
  );
}