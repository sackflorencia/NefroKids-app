import React from "react";
import AppNavigator from "./app/navigation/AppNavigator";
import InitDB from "./back/database";
import "react-native-get-random-values";
import FirebaseService from "./back/services/FirebaseService";
import { UserProvider } from "./app/context/UserContext";

FirebaseService.initialize();

export default function App() {

  return (
    <>
      <UserProvider>
        <InitDB>
          <AppNavigator />
        </InitDB>
      </UserProvider>
    </>
  );
}