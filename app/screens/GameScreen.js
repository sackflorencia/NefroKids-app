import React, { useRef, useEffect } from "react";
import { View } from "react-native";
import UnityView from "@azesmway/react-native-unity";

const GameScreen = ({ level }) => {
  const unityRef = useRef<any>(null);

  useEffect(() => {
    if (!unityRef.current || !level) return;

    const payload = {
      levelId: level.id,
      playerName: "Flor",
    };

    unityRef.current.postMessage(
      "ReactToUnity",
      "OnMessage",
      JSON.stringify(payload)
    );
  }, [level]);

  return (
    <View style={{ flex: 1 }}>
      <UnityView
        ref={unityRef}
        style={{ flex: 1 }}
        onUnityMessage={(result) => {
          console.log("Unity → RN:", result.nativeEvent.message);
        }}
      />
    </View>
  );
};

export default GameScreen;