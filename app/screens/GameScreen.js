import React from "react";
import { WebView } from "react-native-webview";
import Orientation from "react-native-orientation-locker";

export default function GameScreen() {
  useEffect(() => {
    Orientation.lockToLandscape();
    return () => {
      Orientation.unlockAllOrientations();
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