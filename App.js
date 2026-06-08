import React from "react";
import AppNavigator from "./app/navigation/AppNavigator";
import InitDB from "./back/database";
import "react-native-get-random-values";
import FirebaseService from "./back/services/FirebaseService";

FirebaseService.initialize();

export default function App() {

  return (
    <InitDB>
      <AppNavigator />
    </InitDB>
  );
}