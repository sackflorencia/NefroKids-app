import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";

import AuthService from "../../back/services/AuthService";

export default function AppNavigator() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const authService = new AuthService();

    const unsubscribe =
      authService.subscribeToAuthChanges(
        (user) => {

          setUser(user);
          setLoading(false);

        }
      );

    return unsubscribe;

  }, []);

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>
      {user
        ? <MainNavigator />
        : <AuthNavigator />
      }
    </NavigationContainer>
  );
}