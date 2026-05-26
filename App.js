import React from "react";
import AppNavigator from "./app/navigation/AppNavigator";
import InitDB from "./back/database";

export default function App() {

  return (
    <InitDB>
      <AppNavigator />
    </InitDB>
  );
}