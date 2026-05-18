import React, { useEffect } from "react";
import AppNavigator from "./app/navigation/AppNavigator";
import { initDB } from "./back/database/database";

export default function App() {

  useEffect(() => {
    initDB();
  }, []);

  return <AppNavigator />;
}