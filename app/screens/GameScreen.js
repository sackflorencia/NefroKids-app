// import React, { useRef, useEffect } from "react";
// import { View } from "react-native";
// import UnityView from "@azesmway/react-native-unity";

// const GameScreen = ({ level }) => {
//   const unityRef = useRef<any>(null);

//   useEffect(() => {
//     if (!unityRef.current || !level) return;

//     const payload = {
//       levelId: level.id,
//       playerName: "Flor",
//     };

//     unityRef.current.postMessage(
//       "ReactToUnity",
//       "OnMessage",
//       JSON.stringify(payload)
//     );
//   }, [level]);

//   return (
//     <View style={{ flex: 1 }}>
//       <UnityView
//         ref={unityRef}
//         style={{ flex: 1 }}
//         onUnityMessage={(result) => {
//           console.log("Unity → RN:", result.nativeEvent.message);
//         }}
//       />
//     </View>
//   );
// };

// export default GameScreen;
import React, { useRef, useEffect } from "react";
import { View } from "react-native";
import UnityView from "@azesmway/react-native-unity";

export default function GameScreen({ route }) {
  const { level } = route.params;

  const unityRef = useRef(null);

  useEffect(() => {
    if (!unityRef.current || !level) return;

    const payload = {
      levelId: level.numero,
      levelDbId: level.id,
      levelName: level.nombre,
    };

    console.log("Enviando nivel a Unity:");
    console.log(payload);

    unityRef.current.postMessage(
      "ReactToUnity",
      "OnMessage",
      JSON.stringify(payload)
    );
  }, [level]);

  const handleUnityMessage = (event) => {
    const message = event.nativeEvent.message;

    console.log("Mensaje desde Unity:");
    console.log(message);

    try {
      const result = JSON.parse(message);

      console.log("Resultado parseado:");
      console.log(result);

      /*
      Ejemplo esperado:

      {
        levelId: 1,
        completed: true,
        phase1Time: 10,
        phase2Time: 12,
        averageTime: 11,
        phase1Stars: 3,
        phase2Stars: 2
      }
      */

    } catch (error) {
      console.error("Error parseando mensaje Unity", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <UnityView
        ref={unityRef}
        style={{ flex: 1 }}
        onUnityMessage={handleUnityMessage}
      />
    </View>
  );
}