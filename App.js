import React from "react";
import { StatusBar } from "react-native";
import AppNavigator from "./app/navigation/AppNavigator";
import InitDB from "./back/database";
import "react-native-get-random-values";
import FirebaseService from "./back/services/FirebaseService";
import colors from "./app/styles/colors";

FirebaseService.initialize();

export default function App() {

  return (
    <>
      <StatusBar
        backgroundColor={colors.primary}
        barStyle="dark-content"
        translucent={false}
      />
      <InitDB>
        <AppNavigator />
      </InitDB>
    </>
  );
}

// si ponemos en statusBar, style="auto"?