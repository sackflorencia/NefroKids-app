import React from "react";
import { WebView } from "react-native-webview";

export default function GameScreen() {
  return (
    <WebView
      source={{
        uri: process.env.EXPO_PUBLIC_UNITY_URL,
        //el servidor se crea con el path: NefroKids-app\unity\builds\webgl> npx http-server .
        //agregar EXPO_PUBLIC_UNITY_URL al .env
      }}
      style={{ flex: 1 }}
    />
  );
}