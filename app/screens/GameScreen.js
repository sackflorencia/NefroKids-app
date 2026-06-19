// import React, { useRef, useEffect } from "react";
// import { View, Button } from "react-native";
// import UnityView from "@azesmway/react-native-unity";

// export default function GameScreen() {
//   const unityRef = useRef(null);

//   const startLevel = () => {
//     const payload = {
//       levelId: 1,
//       playerName: "Flor"
//     };

//     unityRef.current?.postMessage(
//       "ReactToUnity",
//       "OnMessage",
//       JSON.stringify(payload)
//     );
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <UnityView ref={unityRef} style={{ flex: 1 }} />

//       <Button title="Start Level" onPress={startLevel} />
//     </View>
//   );
// }

import React, { useRef, useEffect } from 'react';

import UnityView from '@azesmway/react-native-unity';
import { View } from 'react-native';


const Unity = () => {
  const unityRef = useRef(null);

  useEffect(() => {
    if (unityRef?.current) {
      const message = {
        gameObject: 'gameObject',
        methodName: 'methodName',
        message: 'message',
      };
      unityRef.current.postMessage(
        message.gameObject,
        message.methodName,
        message.message
      );
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <UnityView
        ref={unityRef}
        style={{ flex: 1 }}
        onUnityMessage={(result) => {
          console.log('onUnityMessage', result.nativeEvent.message);
        }}
      />
    </View>
  );
};

export default Unity;