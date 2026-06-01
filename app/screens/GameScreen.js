import React, { useRef, useEffect } from "react";
import { View, Button } from "react-native";
import UnityView from "@azesmway/react-native-unity";

export default function GameScreen() {
  const unityRef = useRef(null);

  const startLevel = () => {
    const payload = {
      levelId: 1,
      playerName: "Flor"
    };

    unityRef.current?.postMessage(
      "ReactToUnity",
      "OnMessage",
      JSON.stringify(payload)
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <UnityView ref={unityRef} style={{ flex: 1 }} />

      <Button title="Start Level" onPress={startLevel} />
    </View>
  );
}