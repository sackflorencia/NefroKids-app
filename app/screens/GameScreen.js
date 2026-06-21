import React from "react";
import { WebView } from "react-native-webview";

export default function GameScreen() {
  return (
    <WebView
      source={{
        uri: "http://192.168.0.104:8081",
      }}
      style={{ flex: 1 }}
    />
  );
}