import React from "react";
import { WebView } from "react-native-webview";

export default function GameScreen() {
  return (
    <WebView
      source={{
        uri: "https://nefrokids-web-1d52f.web.app/",
      }}
      style={{ flex: 1 }}
    />
  );
}